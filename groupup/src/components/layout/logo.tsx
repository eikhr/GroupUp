import React from 'react'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import { Stack, SxProps, Typography } from '@mui/material'

interface IProps {
  sx?: SxProps
  gold?: boolean
}

const Logo = (props: IProps) => {
  return (
    <Stack direction="row" alignItems="center" sx={props.sx}>
      <GroupsRoundedIcon sx={{ p: 1, height: 1 }} />
      <Typography variant="h5">{props.gold ? 'GroupUp Gull' : 'GroupUp'}</Typography>
    </Stack>
  )
}

export default Logo
