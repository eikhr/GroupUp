import React from 'react'
import Group from '../../models/group'
import { Box, Stack, Typography } from '@mui/material'
import EventCard from '../event/eventCard'
import GroupCard from '../groups/groupCard'

interface IProps {
  group: Group
}

const MatchRequests = ({ group }: IProps) => {
  return (
    <>
      <Typography variant="h5">Aktiviteter</Typography>
      <Stack spacing={2}>
        {group.events?.map((event) => (
          <Stack direction="row" key={event.id}>
            <EventCard data={event} options={{ hideImage: true }} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6">Match-forespørsler:</Typography>
              <Stack direction="row" spacing={2}>
                {event.superlikeGroupsRequests?.map((superlikeGroup) => (
                  <GroupCard
                    data={superlikeGroup}
                    key={superlikeGroup.id}
                    showContact
                    sx={{ background: '#ffd467' }}
                  />
                ))}
                {event.pendingGroupsRequests?.map((pendingGroup) => (
                  <GroupCard data={pendingGroup} key={pendingGroup.id} showContact />
                ))}
              </Stack>
            </Box>
          </Stack>
        ))}
      </Stack>
    </>
  )
}

export default MatchRequests
