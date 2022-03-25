import { Button, CardContent, Grid, Modal, Stack, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import LoginContext from '../../context/loginContext'
import CenteredModalCard from '../layout/centeredModal'
import API, { APIError } from '../../API'
import ErrorCard from '../layout/errorCard'
import GroupDetails from './groupDetails'
import UserDetails from './userDetails'

const MyGroup = () => {
  const { authSession, currentGroup } = useContext(LoginContext)
  const { setCurrentGroup } = useContext(LoginContext)
  const [open, setOpen] = useState(false)
  const [error, setError] = React.useState<string | null>()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  if (!currentGroup) {
    return (
      <Typography data-testid="loading-text">Choose your current group...</Typography>
    )
  }

  const buyGold = async (groupId: number) => {
    try {
      const group = await API.getGroup(groupId)
      const updated = { ...group, gold: true }
      await API.updateGroup(updated)
      handleClose()
    } catch (err: unknown) {
      const apiErr = err as APIError
      setError(`${apiErr.message}, ${apiErr.status}`)
    }
  }

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <CenteredModalCard>
          <CardContent>
            <Stack spacing={3}>
              <Typography variant="h5" align="center">
                Du er i ferd med å kjøpe <br /> GroupUp GULL.
              </Typography>
              <Typography variant="body2" align="center">
                Dersom du godkjenner nå, vil du motta en mail med betalingsinformasjon, og
                få tilgang til eksklusive GULL-fordeler <br />
              </Typography>
              <Button
                sx={{ background: '#DAA520', color: '#000000', fontStyle: 'bold' }}
                size="large"
                onClick={async () => {
                  await buyGold(currentGroup.id ?? 0)
                  setCurrentGroup(await API.getGroup(currentGroup.id ?? 0))
                }}
              >
                Godkjenn GULL-medlemskap!
              </Button>
              {error && <ErrorCard message={error + ''} />}
            </Stack>
          </CardContent>
        </CenteredModalCard>
      </Modal>
      <Stack spacing={1}>
        {!currentGroup.gold && (
          <Button
            sx={{ background: !currentGroup?.gold ? '#DAA520' : undefined }}
            size="large"
            variant="contained"
            onClick={handleOpen}
          >
            Kjøp GroupUp GULL!
          </Button>
        )}
        <GroupDetails group={currentGroup} />
        <Grid container spacing={2} justifyContent="center">
          {currentGroup?.usersRequestingMembership?.map((user) => (
            <UserDetails
              user={user}
              key={user.id}
              authSession={authSession}
              myGroup={currentGroup}
              onChange={async () =>
                setCurrentGroup(
                  await API.getAllGroups().then(
                    (groups) =>
                      groups.find((group) => group?.id === currentGroup?.id) ?? null
                  )
                )
              }
            />
          ))}
        </Grid>
      </Stack>
    </div>
  )
}

export default MyGroup
