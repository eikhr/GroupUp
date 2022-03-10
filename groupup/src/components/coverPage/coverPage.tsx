import React from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material'

const CoverPage = () => {
  return (
    <Grid container sx={{ maxWidth: 1200, margin: 'auto' }}>
      <Grid item xs={12} md={5} alignItems="center">
        <Stack height={1} justifyContent="center" alignItems="center">
          <Typography data-testid="title" variant="h1">
            GroupUp
          </Typography>
          <Typography gutterBottom variant="h5">
            Utvid vennekretsen!
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button component="a" href="/chooseGroup" variant="outlined">
              Choose group
            </Button>
            <Button component="a" href="/createGroup" variant="outlined">
              Create group
            </Button>
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
