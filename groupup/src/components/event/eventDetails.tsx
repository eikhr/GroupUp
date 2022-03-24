import IEvent from '../../models/event'
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import StarsIcon from '@mui/icons-material/Stars'
import RecommendIcon from '@mui/icons-material/Recommend'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import moment from 'moment'
import React, { useContext, useState } from 'react'
import CenteredModalCard from '../layout/centeredModal'
import API from '../../API'
import LoginContext from '../../context/loginContext'
import { GroupInfo } from '../groups/groupCard'

interface IProps {
  event: IEvent
  onNext: () => void
  onPrevious: () => void
}

const EventDetails = ({ event, onNext, onPrevious }: IProps) => {
  const { currentGroup } = useContext(LoginContext)
  const [superlikeLoading, setSuperlikeLoading] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)
  const arrangingGroup = event.groupsMatched && event.groupsMatched[0]

  const superlike = async () => {
    setSuperlikeLoading(true)
    try {
      await (event.id && API.requestMatch(event.id, currentGroup?.id ?? -1, true))
    } catch (e) {
      console.error(e)
    }
    setSuperlikeLoading(false)
  }

  const like = async () => {
    setLikeLoading(true)
    try {
      await (event.id && API.requestMatch(event.id, currentGroup?.id ?? -1, false))
    } catch (e) {
      console.error(e)
    }
    setLikeLoading(false)
  }

  return (
    <>
      <CenteredModalCard width={800}>
        <Button
          variant="contained"
          sx={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 30,
          }}
          onClick={() => onPrevious()}
        >
          <KeyboardArrowUpIcon
            sx={{
              fontSize: 30,
            }}
          />
        </Button>
        <Button
          variant="contained"
          sx={{
            position: 'absolute',
            bottom: '-80px',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 30,
          }}
          onClick={() => onNext()}
        >
          <KeyboardArrowDownIcon
            sx={{
              fontSize: 30,
            }}
          />
        </Button>
        <CardMedia component="img" height="200" src={event.image} alt="Event image" />
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Box sx={{ width: 1, flex: 1 }}>
              <Divider variant="middle">Aktiviteten</Divider>
              <Typography data-testid="title" gutterBottom variant="h5" component="div">
                {event.title}
              </Typography>
              {event.date && (
                <Typography
                  variant="body2"
                  data-testid="time"
                  sx={{ fontSize: 12 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {moment(event.date).calendar({ sameElse: 'dddd Do MMMM [kl.] HH:mm' })}
                </Typography>
              )}
              <Typography
                data-testid="description"
                gutterBottom
                variant="body2"
                color="text.secondary"
              >
                {event.description}
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ m: 2, mb: 0 }} />
            <Box sx={{ width: 1, flex: 1 }}>
              <Divider variant="middle">Gruppen</Divider>
              {arrangingGroup && <GroupInfo data={arrangingGroup} />}
            </Box>
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
                'Liker...'
              ) : (
                <>
                  <StarsIcon sx={{ mr: 1 }} /> Superlike
                </>
              )}
            </Button>
          )}
          <Button variant="contained" onClick={() => like()}>
            {likeLoading ? (
              'Liking...'
            ) : (
              <>
                <RecommendIcon sx={{ mr: 1 }} /> Like
              </>
            )}
          </Button>
          <Tooltip
            placement="top"
            arrow
            title={
              <React.Fragment>
                <Typography color="inherit">Hvordan fungerer matching?</Typography>
                <Typography color="inherit" variant="body1" fontSize={12}>
                  Når du liker (eller superliker) en annen gruppe blir de varslet og får
                  mulighet til å like dere tilbake. 😎 <br />
                  Hvis de liker dere tilbake blir det en <i>match</i> 🎉 og dere vil få
                  tilgang til kontaktinfo slik at dere kan planlegge det første møtet med
                  deres nye venner! 🥳
                </Typography>
              </React.Fragment>
            }
          >
            <HelpOutlineIcon sx={{ ml: 1 }} />
          </Tooltip>
        </CardActions>
      </CenteredModalCard>
    </>
  )
}

export default EventDetails
