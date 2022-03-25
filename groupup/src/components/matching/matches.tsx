import React, { useContext, useState } from 'react'
import { Typography, Stack, Chip, Button, Modal } from '@mui/material'
import Group from '../../models/group'
import LoginContext from '../../context/loginContext'
import GroupIcon from '@mui/icons-material/Group'
import EventCard from '../event/eventCard'
import CenteredModalCard from '../layout/centeredModal'
import GroupDetails from '../groups/groupDetails'

const Matches = () => {
  const { currentGroup } = useContext(LoginContext)
  const [openGroup, setOpenGroup] = useState<Group | null>(null)

  if (!currentGroup) {
    return (
      <Typography data-testid="loading-text">
        Du er nødt til å velge en gruppe...
      </Typography>
    )
  }

  return (
    <>
      <Modal open={!!openGroup} onClose={() => setOpenGroup(null)}>
        <CenteredModalCard width={800}>
          {openGroup && <GroupDetails group={openGroup} />}
          <Button />
        </CenteredModalCard>
      </Modal>
      {currentGroup?.events?.map((event) => (
        <Stack sx={{ m: 1.5 }} key={event.id}>
          <EventCard data={event} options={{ hideImage: true }}>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {event.groupsMatched?.map((matchedGroup) => (
                <Chip
                  icon={<GroupIcon />}
                  key={matchedGroup.id}
                  label={matchedGroup.name}
                  color="primary"
                  onClick={() => {
                    setOpenGroup(matchedGroup)
                  }}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Stack>
          </EventCard>
        </Stack>
      ))}
    </>
  )
}

export default Matches
