import React from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material'

const CoverPage = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={4} alignItems="center">
        <Stack height={1} justifyContent="center">
          <Typography data-testid="title" variant="h1">
            GroupUp
          </Typography>
          <Typography variant="h5">Utvid vennekretsen!</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack>
          <img src={'/group.png'} alt="group of friends" />
          <Typography variant="caption">
            {
              'Sara 506, CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0>, via Wikimedia Commons. Changed white background to transparent.'
            }
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Button component="a" href="/events" variant="outlined">
          Enter
        </Button>
      </Grid>
    </Grid>
  )
}

export default CoverPage
