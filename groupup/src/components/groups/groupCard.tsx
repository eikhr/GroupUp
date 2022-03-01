import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import IGroup from '../../models/group'

interface IProps {
  data: IGroup
}
const GroupCard = (props: IProps) => {
  return (
    <Card data-testid={'group-'} sx={{ width: 345 }}>
      <CardContent>
        <Typography data-testid="title" gutterBottom variant="h5" component="div">
          {props.data.name}
        </Typography>
        <Typography data-testid="description" variant="body2" color="text.secondary">
          {props.data.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default GroupCard
