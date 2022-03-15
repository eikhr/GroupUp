import { Card, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material'
import moment from 'moment'
import 'moment/locale/nb'
import React from 'react'
import IEvent from '../../models/event'
import InterestsIcon from '@mui/icons-material/Interests'

interface IProps {
  data: IEvent
}
const EventCard = (props: IProps) => {
  moment.locale('nb')

  const groups = props.data.groupsMatched
  const arrangingGroup = groups ? groups[0] : undefined

  return (
    <Card data-testid={'event-' + props.data.id} sx={{ width: 345 }}>
      <CardMedia component="img" height="140" src={props.data.image} alt="Event image" />
      <CardContent>
        {props.data.date && (
          <Typography
            data-testid="time"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {moment(props.data.date).calendar({ sameElse: 'dddd Do MMMM [kl.] HH:mm' })}
          </Typography>
        )}
        <Typography data-testid="title" gutterBottom variant="h5" component="div">
          {props.data.title}
        </Typography>
        <Typography data-testid="description" variant="body2" color="text.secondary">
          {props.data.description}
        </Typography>
        <Typography data-testid="groups" variant="body2" color="text.secondary">
          {arrangingGroup?.name}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          Gruppen liker: <br />
          {arrangingGroup?.interests?.map((interest) => (
            <Chip icon={<InterestsIcon />} key={interest} label={interest} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default EventCard
