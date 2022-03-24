import { Button, Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import User from '../../models/user'
import Group from '../../models/group'
import API from '../../API'
import AuthSession from '../../models/authSession'
interface IProps {
  authSession: AuthSession | null
  user: User
  myGroup: Group
  onChange: () => void
}

const UserDetails = ({ authSession, user, myGroup, onChange }: IProps) => (
  <Card sx={{ m: 1.5 }}>
    <CardContent>
      <Typography data-testid="title" gutterBottom variant="h5" component="div">
        {user.firstName} {user.lastName} ({user.username})
      </Typography>
      <Typography
        data-testid="description"
        gutterBottom
        variant="body2"
        color="text.secondary"
      >
        {user.username}
      </Typography>
      <Typography
        data-testid="groupsEmail"
        variant="body2"
        color="text.secondary"
        gutterBottom
      >
        {user.email}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}></Stack>
      <Stack data-testid="description" spacing={1} direction={'row'} sx={{ mt: 2 }}>
        <Typography variant="body2" color="text">
          Alder: {user.age}
        </Typography>
      </Stack>
      {authSession && (
        <Stack data-testid="description" spacing={1} direction={'row'} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            onClick={async () => {
              await API.acceptMembership(authSession, user, myGroup.id?.toString() || '')
              onChange()
            }}
          >
            Aksepter medlemsforespørsel
          </Button>
        </Stack>
      )}
    </CardContent>
  </Card>
)
export default UserDetails
