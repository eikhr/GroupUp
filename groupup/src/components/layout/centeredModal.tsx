import { Card } from '@mui/material'
import React, { PropsWithChildren } from 'react'

interface IProps {
  width?: number
}

const CenteredModalCard = ({ width, children }: PropsWithChildren<IProps>) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width ?? 400,
  }

  return <Card sx={style}>{children}</Card>
}

export default CenteredModalCard
