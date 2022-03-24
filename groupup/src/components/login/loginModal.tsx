import React, { useState } from 'react'
import LoginRequest from '../../models/loginRequest'
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
import CancelOutlinedIcon from '@mui/icons-material/Cancel'
import ErrorCard from '../layout/errorCard'

interface IProps {
  show: boolean
  error?: string
  onClose: () => void
  onLogin: (loginRequest: LoginRequest) => void
}

const LoginModal = (props: IProps) => {
  const [loginDetails, setLoginDetails] = useState<LoginRequest>({
    username: '',
    password: '',
  })

  const close = () => {
    setLoginDetails({ username: '', password: '' })
    props.onClose()
  }

  return (
    <Dialog open={props.show} onClose={close} fullWidth>
      <DialogTitle id="id">
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Logg inn</Box>
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
              value={loginDetails.username}
              onChange={(evt) =>
                setLoginDetails({ ...loginDetails, username: evt.target.value })
              }
              fullWidth
            />
            <TextField
              id="password-input"
              name="password"
              label="Passord"
              type="password"
              required
              value={loginDetails.password}
              onChange={(evt) =>
                setLoginDetails({ ...loginDetails, password: evt.target.value })
              }
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
            props.onLogin(loginDetails)
          }}
        >
          <LoginIcon /> Logg inn
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default LoginModal
