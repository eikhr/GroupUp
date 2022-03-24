import { Card, SxProps, Typography } from '@mui/material'
import React from 'react'

interface IProps {
  message: string
  sx?: SxProps
}

const ErrorCard = (props: IProps) => {
  return (
    <Card
      sx={{ backgroundColor: 'error.main', color: 'error.contrastText', ...props.sx }}
    >
      <Typography variant="h5" textAlign="center">
        😱 Det har skjedd en feil! 😱
      </Typography>
      <Typography variant="body1" textAlign="center">
        {props.message}
      </Typography>
    </Card>
  )
}

export default ErrorCard
