import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

const defaultValues = {
  name: '',
  description: '',
}

const Form = () => {
  const [formValues, setFormValues] = useState(defaultValues)
  const [clearedDate, setClearedDate] = React.useState<Date | null>(null)
  const [dateValue, setValue] = React.useState<Date | null>(new Date())
  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(formValues)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="center" direction="column">
        <Stack spacing={3}>
          <Typography variant="h2"> Create your event </Typography>
            <TextField
              id="name-input"
              name="name"
              label="Event name"
              type="text"
              value={formValues.name}
              onChange={handleInputChange}
            />
            <TextField
              multiline
              rows={4}
              id="description-input"
              name="description"
              label="Describe your event"
              type="text"
              value={formValues.description}
              onChange={handleInputChange}
            />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              disablePast
              //id="eventDate-input"
              //name="date"
              label="Choose your event date"
              value={dateValue}
              onChange={setValue}
              onError={console.log}
              minDate={new Date('2018-01-01T00:00')}
              inputFormat="yyyy/MM/dd hh:mm a"
              mask="___/__/__ __:__ _M"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </Grid>
    </form>
  )
}
export default Form
