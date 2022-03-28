import { Box, Grid, Modal, Typography } from '@mui/material'
import Group from '../../models/group'
import React, { useEffect, useState } from 'react'
import GroupCard from './groupCard'
import API from '../../API'
import GroupDetails from './groupDetails'
import CenteredModalCard from '../layout/centeredModal'
import ErrorCard from '../layout/errorCard'

const GroupList = () => {
  const [groups, setGroups] = useState<Group[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [openGroup, setOpenGroup] = useState<Group | null>(null)

  useEffect(() => {
    API.getAllGroups()
      .then((groups) => setGroups(groups))
      .catch((error: string) => setError(error))
  }, [])

  if (error) {
    return <ErrorCard message={error} />
  }

  if (!groups) {
    return <Typography data-testid="loading-text">Laster inn...</Typography>
  }

  return (
    <>
      <Modal open={!!openGroup} onClose={() => setOpenGroup(null)}>
        <CenteredModalCard width={800}>
          <>{openGroup && <GroupDetails group={openGroup} />}</>
        </CenteredModalCard>
      </Modal>
      <Grid container spacing={2} justifyContent="center">
        {groups.map((group) => (
          <Grid item key={group.id}>
            <Box onClick={() => setOpenGroup(group)} sx={{ cursor: 'pointer' }}>
              <GroupCard data={group} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default GroupList
