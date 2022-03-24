import { Button, Card, Stack, Typography } from '@mui/material'
import Group from '../../models/group'
import React, { useContext, useEffect, useState } from 'react'
import API, { APIError } from '../../API'
import LoginContext from '../../context/loginContext'
import { Link, useNavigate } from 'react-router-dom'
import GroupCard from './groupCard'

const ChooseGroup = () => {
  const navigate = useNavigate()
  const [allGroups, setAllGroups] = useState<Group[] | null>(null)
  const [error, setError] = useState<APIError | null>(null)
  const { authSession, setCurrentGroup } = useContext(LoginContext)

  useEffect(() => {
    if (!authSession) {
      navigate('/')
    }
  }, [authSession])

  const myGroups = authSession?.user.groups ?? []

  const selectGroup = (group: Group) => {
    setCurrentGroup(group)
    navigate('/events')
  }

  const requestMembership = async (group: Group) => {
    if (authSession) {
      await API.requestMembership(authSession, '' + group.id)
      group.usersRequestingMembership = group.usersRequestingMembership ?? []
      group.usersRequestingMembership.push(authSession.user)
      setAllGroups(
        [...(allGroups?.filter((g) => g.id != group.id) ?? []), group].sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      )
    }
  }

  useEffect(() => {
    API.getAllGroups()
      .then((groups) => setAllGroups(groups))
      .catch((error: APIError) => setError(error))
  }, [])

  if (error) {
    return (
      <Card data-testid="error" sx={{ backgroundColor: 'error.light' }}>
        <Typography variant="h5">Error</Typography>
      </Card>
    )
  }

  if (!allGroups) {
    return <Typography data-testid="loading-text">Loading...</Typography>
  }

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: 'center' }} gutterBottom>
        Hvilken gruppe vil du logge inn som
      </Typography>
      <Stack spacing={2} alignItems="center">
        {myGroups && myGroups.length ? (
          myGroups.map((group: Group) => (
            <Button
              variant="contained"
              key={group.id}
              sx={{ fontSize: 20 }}
              onClick={() => selectGroup(group)}
            >
              {group.name}
            </Button>
          ))
        ) : (
          <>
            <Typography>Du er ikke medlem av noen grupper enda :(</Typography>
            <Link to="/createGroup">
              <Button variant="contained">Lag en ny gruppe</Button>
            </Link>
          </>
        )}
      </Stack>

      <Typography variant="h2" sx={{ textAlign: 'center' }} gutterBottom>
        Bli med i en eksisterende gruppe
      </Typography>
      <Stack spacing={2} alignItems="center">
        {allGroups
          .filter((allGroup) => !myGroups.includes(allGroup))
          .map((group: Group) => {
            const requested = !!(group?.usersRequestingMembership ?? []).find(
              (user) => user.id == authSession?.user.id
            )
            return (
              <GroupCard
                data={group}
                key={group.id}
                extraActions={[
                  <Button
                    variant="contained"
                    key={group.id}
                    disabled={requested}
                    onClick={() => requestMembership(group)}
                  >
                    {requested ? 'Forespørsel sendt' : 'Send medlemsforespørsel'}
                  </Button>,
                ]}
              />
            )
          })}
      </Stack>
    </>
  )
}

export default ChooseGroup
