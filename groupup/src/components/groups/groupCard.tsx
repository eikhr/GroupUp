import {Card, CardContent, Chip, Stack, Typography} from '@mui/material'
import React from 'react'
import IGroup from '../../models/group'

interface IProps {
  data: IGroup
}
const GroupCard = (props: IProps) => {
  return (
    <Card data-testid={'group-' + props.data.id} sx={{ width: 345 }}>
      <CardContent>
        <Typography data-testid="title" gutterBottom variant="h5" component="div">
          {props.data.name}
        </Typography>
        <Typography data-testid="description" variant="body2" color="text.secondary">
          {props.data.description}
        </Typography>
        <Typography data-testid="mail" variant="body2" color="text.secondary">
          {props.data.email}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {props.data.interests.map((interest) => (
            <Chip key={interest} label={interest} />
          ))}
        </Stack>

      </CardContent>
    </Card>
  )
}

export default GroupCard
