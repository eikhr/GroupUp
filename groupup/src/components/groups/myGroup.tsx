import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Modal,
  Stack,
  Typography,
} from '@mui/material'
import React, { useContext, useState } from 'react'
import EventIcon from '@mui/icons-material/Event'
import InterestsIcon from '@mui/icons-material/Interests'
import CurrentGroupContext from '../../context/CurrentGroupContext'
import CenteredModalCard from '../layout/centeredModal'
import API, { APIError } from '../../API'
import ErrorCard from '../layout/errorCard'

const MyGroup = () => {
  const { currentGroup } = useContext(CurrentGroupContext)
  const { setCurrentGroup } = useContext(CurrentGroupContext)
  const [open, setOpen] = useState(false)
  const [error, setError] = React.useState<string | null>()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  if (!currentGroup) {
    return (
      <Typography data-testid="loading-text">Choose your current group...</Typography>
    )
  }

  const buyGold = async () => {
    try {
      console.log('The boolean was: ', currentGroup.gold)
      const updated = { ...currentGroup, gold: true }
      console.log('The boolean is now: ', updated.gold)
      await API.updateGroup(updated)
      setCurrentGroup(updated)
      handleClose()
    } catch (err: unknown) {
      const apiErr = err as APIError
      setError(`${apiErr.message}, ${apiErr.status}`)
    }
  }

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <CenteredModalCard>
          <CardContent>
            <Stack spacing={3}>
              <Typography variant="h5" align="center">
                Du er i ferd med å kjøpe <br /> GroupUp GULL.
              </Typography>
              <Typography variant="body2" align="center">
                Dersom du godkjenner nå, vil du motta en mail med betalingsinformasjon, og
                få tilgang til eksklusive GULL-fordeler <br />
              </Typography>
              <Button
                sx={{ background: '#DAA520', color: '#000000', fontStyle: 'bold' }}
                size="large"
                onClick={buyGold}
              >
                Godkjenn GULL-medlemskap!
              </Button>
              {error && <ErrorCard message={error + ''} />}
            </Stack>
          </CardContent>
        </CenteredModalCard>
      </Modal>
      <Stack spacing={1}>
        {!currentGroup.gold && (
          <Button
            sx={{ background: !currentGroup?.gold ? '#DAA520' : undefined }}
            size="large"
            variant="contained"
            onClick={handleOpen}
          >
            Kjøp GroupUp GULL!
          </Button>
        )}
        <Card>
          <CardMedia
            component="img"
            height="200"
            src={'/groupMy.jpg'}
            alt="Portrait of ASTP crews - restoration.jpg"
          />
          <CardContent>
            <Typography data-testid="title" gutterBottom variant="h5" component="div">
              {currentGroup.name}
            </Typography>
            <Typography
              data-testid="description"
              gutterBottom
              variant="body2"
              color="text.secondary"
            >
              {currentGroup.description}
            </Typography>

            <Typography
              data-testid="groupsEmail"
              variant="body2"
              color="text.secondary"
              gutterBottom
            >
              {currentGroup.contactEmail}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {currentGroup.interests?.map((interest) => (
                <Chip icon={<InterestsIcon />} key={interest} label={interest} />
              ))}
            </Stack>
            <Stack data-testid="description" spacing={1} direction={'row'} sx={{ mt: 2 }}>
              <Typography variant="body2" color="text">
                Aktiviteter:{' '}
              </Typography>
              {currentGroup.events?.map((event) => (
                <Chip icon={<EventIcon />} key={event.title} label={event.title} />
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </div>
  )
}

export default MyGroup
