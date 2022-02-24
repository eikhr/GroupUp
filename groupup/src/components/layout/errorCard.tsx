import { Card, Typography } from '@mui/material'
import React from 'react'

interface IProps {
  message: string
}

const ErrorCard = (props: IProps) => {
  return (
    <Card sx={{ backgroundColor: 'error.main', color: 'error.contrastText' }}>
      <Typography variant="h5">😱 Det har skjedd en feil! 😱</Typography>
      <Typography variant="body1">{props.message}</Typography>
    </Card>
  )
}

export default ErrorCard
