import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Stack,
  TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LoginIcon from '@mui/icons-material/Login'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import ErrorCard from '../layout/errorCard'
import User from '../../models/user'

interface IProps {
  show: boolean
  error?: string
  onClose: () => void
  onRegister: (user: User) => void
}

const RegisterModal = (props: IProps) => {
  const [user, setUser] = useState<User>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    age: '',
  })

  const close = () => {
    setUser({
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      age: '',
    })
    props.onClose()
  }

  return (
    <Dialog open={props.show} onClose={close} fullWidth>
      <DialogTitle id="id">
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Register deg! 😎🎉</Box>
          <Box>
            <IconButton onClick={close}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {props.error && <ErrorCard message={props.error} sx={{ mb: 2 }} />}
        <FormControl sx={{ mt: 1 }} fullWidth>
          <Stack spacing={2} sx={{ width: 1 }}>
            <TextField
              id="username-input"
              name="username"
              label="Brukernavn"
              type="text"
              required
              value={user.username}
              onChange={(evt) => setUser({ ...user, username: evt.target.value })}
              fullWidth
            />
            <TextField
              id="email-input"
              name="email"
              label="Epost"
              type="text"
              required
              value={user.email}
              onChange={(evt) => setUser({ ...user, email: evt.target.value })}
              fullWidth
            />
            <Stack direction="row">
              <TextField
                id="firstName-input"
                name="firstName"
                label="Fornavn"
                type="text"
                required
                value={user.firstName}
                onChange={(evt) => setUser({ ...user, firstName: evt.target.value })}
                fullWidth
              />
              <TextField
                id="lastName-input"
                name="lastName"
                label="Etternavn"
                type="text"
                required
                value={user.lastName}
                onChange={(evt) => setUser({ ...user, lastName: evt.target.value })}
                fullWidth
              />
              <TextField
                id="age-input"
                name="age"
                label="Alder"
                type="text"
                required
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                value={user.age}
                onChange={(evt) => setUser({ ...user, age: evt.target.value })}
              />
            </Stack>
            <TextField
              id="password-input"
              name="password"
              label="Passord"
              type="password"
              required
              value={user.password}
              onChange={(evt) => setUser({ ...user, password: evt.target.value })}
              fullWidth
            />
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>
          <CancelOutlinedIcon /> Avbryt
        </Button>
        <Button
          onClick={() => {
            props.onRegister({ ...user, age: Number(user.age) })
          }}
        >
          <LoginIcon /> Registerer deg
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default RegisterModal
