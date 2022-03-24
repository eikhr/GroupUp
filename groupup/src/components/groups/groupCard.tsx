import {
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  SxProps,
  Typography,
} from '@mui/material'
import React, { ReactChild } from 'react'
import IGroup from '../../models/group'
import InterestsIcon from '@mui/icons-material/Interests'

interface IProps {
  data: IGroup
  sx?: SxProps
  showContact?: boolean
  extraActions?: [ReactChild]
}

const GroupInfo = (props: IProps) => {
  return (
    <>
      <Typography data-testid="title" gutterBottom variant="h5" component="div">
        {props.data.name}
      </Typography>
      <Typography
        variant="body2"
        data-testid="time"
        sx={{ fontSize: 12 }}
        color="text.secondary"
        gutterBottom
      >
        Aldersspenn: {props.data.minAge} - {props.data.maxAge}
      </Typography>
      <Typography data-testid="description" variant="body2" color="text.secondary">
        {props.data.description}
      </Typography>
      {props.showContact && (
        <Typography data-testid="mail" variant="body2" color="text.secondary">
          {props.data.contactEmail}
        </Typography>
      )}
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        {props.data.interests.map((interest) => (
          <Chip icon={<InterestsIcon />} key={interest} label={interest} />
        ))}
      </Stack>
    </>
  )
}

const GroupCard = (props: IProps) => {
  return (
    <Card data-testid={'group-' + props.data.id} sx={{ width: 345, ...props.sx }}>
      <CardContent>
        <GroupInfo {...props} />
      </CardContent>
      <CardActions>{props.extraActions}</CardActions>
    </Card>
  )
}

export default GroupCard
export { GroupInfo }
