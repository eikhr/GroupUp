import React, { useState } from 'react'
import Group from '../../models/group'
import IEvent from '../../models/event'
import { Chip, Stack, Modal, Button } from '@mui/material'
import EventCard from '../event/eventCard'
import GroupIcon from '@mui/icons-material/Group'
import CenteredModalCard from '../layout/centeredModal'
import GroupDetails from '../groups/groupDetails'
import API from '../../API'

interface IProps {
  group: Group
}

const MatchRequests = ({ group }: IProps) => {
  const [openGroup, setOpenGroup] = useState<Group | null>(null)
  const [openEvent, setOpenEvent] = useState<IEvent | null>(null)

  return (
    <>
      <Modal open={!!openGroup} onClose={() => setOpenGroup(null)}>
        <CenteredModalCard width={800}>
          <>
            {openGroup && openEvent && (
              <GroupDetails
                group={openGroup}
                onApprove={async () => {
                  try {
                    await (openEvent.id &&
                      API.acceptMatch(openEvent.id, openGroup?.id ?? -1))
                  } catch (e) {
                    console.error(e)
                  }
                }}
                onDecline={async () => {
                  try {
                    await (openEvent.id &&
                      API.declineMatch(openEvent.id, openGroup?.id ?? -1))
                  } catch (e) {
                    console.error(e)
                  }
                }}
              />
            )}
          </>
          <Button />
        </CenteredModalCard>
      </Modal>

      <Stack direction="row" spacing={2}>
        {group.events?.map((event) => (
          <Stack direction="row" key={event.id}>
            <EventCard data={event} options={{ hideImage: true }}>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                Super-Likes:
                {event.superlikeGroupsRequests?.map((superlikeGroup) => (
                  <Chip
                    icon={<GroupIcon />}
                    key={superlikeGroup.id}
                    label={superlikeGroup.name}
                    color="primary"
                    style={{ backgroundColor: '#DAA520' }}
                    onClick={() => {
                      setOpenGroup(superlikeGroup)
                      setOpenEvent(event)
                    }}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Stack>

              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                Match-forespørsler:
                {event.pendingGroupsRequests?.map((pendingGroup) => (
                  <Chip
                    icon={<GroupIcon />}
                    key={pendingGroup.id}
                    label={pendingGroup.name}
                    color="primary"
                    variant="filled"
                    onClick={() => {
                      setOpenGroup(pendingGroup)
                      setOpenEvent(event)
                    }}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Stack>
            </EventCard>
          </Stack>
        ))}
      </Stack>
    </>
  )
}

export default MatchRequests
