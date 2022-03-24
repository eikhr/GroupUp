import React, { useContext, useState } from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material'
import LoginContext from '../../context/loginContext'
import User from '../../models/user'
import API from '../../API'
import LoginRequest from '../../models/loginRequest'
import LoginModal from '../login/loginModal'
import RegisterModal from '../login/register'
import { Link } from 'react-router-dom'

const CoverPage = () => {
  const { authSession, setAuthSession, setCurrentGroup } = useContext(LoginContext)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [modalError, setModalError] = useState<string | undefined>(undefined)

  const onCloseModal = () => {
    setModalError(undefined)
    if (showLogin) {
      setShowLogin(false)
    }
    if (showRegister) {
      setShowRegister(false)
    }
  }
  const onRegister = async (user: User) => {
    if (!user.username) {
      setModalError('Du har glemt å skrive inn brukernavn! 🤔')
      return
    }
    if (!user.firstName) {
      setModalError('Hva heter du??? 🤨')
      return
    }
    if (!user.lastName) {
      setModalError('Ikke glem etternavnet ditt! 🤪')
      return
    }
    if (!user.password) {
      setModalError('Du må jo skrive inn passordet! 😠')
      return
    }

    try {
      const authSession = await API.register(user)
      setCurrentGroup(null)
      setAuthSession(authSession)
      onCloseModal()
    } catch (e: unknown) {
      setModalError('' + e)
    }
  }

  const onLogin = async (loginRequest: LoginRequest) => {
    if (!loginRequest.username) {
      setModalError('Du har glemt å skrive inn brukernavn! 🤔')
      return
    }
    if (!loginRequest.password) {
      setModalError('Du må jo skrive inn passordet! 😠')
      return
    }

    try {
      const authSession = await API.login(loginRequest)
      setCurrentGroup(null)
      setAuthSession(authSession)
      onCloseModal()
    } catch (e: unknown) {
      setModalError('' + e)
    }
  }

  return (
    <Grid container sx={{ maxWidth: 1200, margin: 'auto' }}>
      <LoginModal
        show={showLogin}
        onClose={onCloseModal}
        onLogin={onLogin}
        error={modalError}
      />
      <RegisterModal
        show={showRegister}
        onClose={onCloseModal}
        onRegister={onRegister}
        error={modalError}
      />
      <Grid item xs={12} md={5} alignItems="center">
        <Stack height={1} justifyContent="center" alignItems="center">
          <Typography data-testid="title" variant="h1">
            GroupUp
          </Typography>
          <Typography gutterBottom variant="h5">
            Utvid vennekretsen!
          </Typography>
          <Stack direction="row" spacing={1}>
            {authSession ? (
              <>
                <Link to="/chooseGroup">
                  <Button variant="outlined">Velg gruppe</Button>
                </Link>
                <Link to="/createGroup">
                  <Button variant="outlined">Lag grupppe</Button>
                </Link>
              </>
            ) : (
              <>
                <Button onClick={() => setShowLogin(true)} variant="outlined">
                  Logg inn
                </Button>
                <Button onClick={() => setShowRegister(true)} variant="outlined">
                  Registrer deg
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={7}>
        <Stack>
          <img src={'/group.png'} alt="group of friends" />
          <Typography variant="caption" sx={{ fontSize: 8 }}>
            {
              'Sara 506, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons. Changed white background to transparent.'
            }
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default CoverPage
