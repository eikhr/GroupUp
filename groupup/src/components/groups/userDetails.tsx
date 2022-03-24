import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import React, { useContext } from 'react'
import EventIcon from '@mui/icons-material/Event'
import InterestsIcon from '@mui/icons-material/Interests'
import LoginContext from '../../context/loginContext'
import User from '../../models/user'
import Group from '../../models/group'
import authSession from '../../models/authSession'
import API from '../../API'
import AuthSession from '../../models/authSession'
interface IProps {
  authSession: AuthSession | null
  user: User
  myGroup: Group
  onChange: () => void
}

/*const handleAccept = ({ authSession, user, myGroup, onChange }: IProps) => {
  authSession && API.acceptMembership(authSession, user, myGroup.id?.toString() || "");
  onChange()
}*/

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
        {authSession && (
          <Button
            variant="outlined"
            onClick={() => {
              API.acceptMembership(authSession, user, myGroup.id?.toString() || '')
              onChange()
            }}
          >
            Aksepter medlemsforespørsel
          </Button>
        )}
      </Stack>
    </CardContent>
  </Card>
)
export default UserDetails
