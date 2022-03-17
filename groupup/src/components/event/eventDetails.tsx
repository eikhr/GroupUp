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
import moment from 'moment'
import React, { useContext, useState } from 'react'
import CenteredModalCard from '../layout/centeredModal'
import API from '../../API'
import CurrentGroupContext from '../../context/CurrentGroupContext'
import { GroupInfo } from '../groups/groupCard'

interface IProps {
  event: IEvent
}

const EventDetails = ({ event }: IProps) => {
  const { currentGroup } = useContext(CurrentGroupContext)
  const [superlikeLoading, setSuperlikeLoading] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)
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

  const like = async () => {
    setLikeLoading(true)
    try {
      await (event.id && API.requestMatch(event.id, false))
    } catch (e) {
      console.error(e)
    }
    setLikeLoading(false)
  }

  return (
    <CenteredModalCard width={800}>
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
                <StarsIcon sx={{ mr: 1 }} /> Superlik
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
              <Typography color="inherit">How does matching work?</Typography>
              <Typography color="inherit" variant="body1" fontSize={12}>
                When you like (or superlike) another group, they will be notified and get
                the option to like you back. <br />
                If they like you back you get a <i>match</i> and you will get their
                contact info, so you can plan a meeting with your new friends!
              </Typography>
            </React.Fragment>
          }
        >
          <HelpOutlineIcon sx={{ ml: 1 }} />
        </Tooltip>
      </CardActions>
    </CenteredModalCard>
  )
}

export default EventDetails
