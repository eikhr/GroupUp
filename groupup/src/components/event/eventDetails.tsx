import IEvent from '../../models/event'
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import StarsIcon from '@mui/icons-material/Stars'
import moment from 'moment'
import React, { useContext, useState } from 'react'
import CenteredModalCard from '../layout/centeredModal'
import API from '../../API'
import CurrentGroupContext from '../../context/CurrentGroupContext'

interface IProps {
  event: IEvent
}

const EventDetails = ({ event }: IProps) => {
  const { currentGroup } = useContext(CurrentGroupContext)
  const [superlikeLoading, setSuperlikeLoading] = useState(false)
  const arrangingGroup = event.groupsMatched && event.groupsMatched[0]

  const superlike = async () => {
    setSuperlikeLoading(true)
    try {
      await (event.id && API.requestMatch(event.id, true))
    } catch (e) {
      console.error(e)
    }
    setSuperlikeLoading(false)
  }

  return (
    <CenteredModalCard width={800}>
      <CardMedia component="img" height="200" src={event.image} alt="Event image" />
      <CardContent>
        {event.date && (
          <Typography
            data-testid="time"
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {moment(event.date).calendar({ sameElse: 'dddd Do MMMM [kl.] HH:mm' })}
          </Typography>
        )}
        <Typography data-testid="title" gutterBottom variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography
          data-testid="description"
          gutterBottom
          variant="body2"
          color="text.secondary"
        >
          {event.description}
        </Typography>
        <Typography data-testid="description" variant="body2" color="text">
          Med: <b>{arrangingGroup?.name}</b>
          {console.log(event)}
        </Typography>
        <Typography data-testid="groupsEmail" variant="body2" color="text.secondary">
          {arrangingGroup?.contactEmail}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {arrangingGroup?.interests?.map((interest) => (
            <Chip key={interest} label={interest} />
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        {currentGroup?.gold && (
          <Button
            variant="contained"
            color="warning"
            sx={{ background: '#DAA520' }}
            onClick={() => superlike()}
          >
            {superlikeLoading ? (
              'Liking...'
            ) : (
              <>
                <StarsIcon sx={{ mr: 1 }} /> Superlike
              </>
            )}
          </Button>
        )}
      </CardActions>
    </CenteredModalCard>
  )
}

export default EventDetails
