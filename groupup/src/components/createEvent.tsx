import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'

const defaultValues = {
  name: '',
  description: '',
  date: null
}
const Form = () => {
  const [formValues, setFormValues] = useState(defaultValues)
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
        <Typography variant="h2"> Create your event </Typography>
        <Grid item>
          <TextField
            id="name-input"
            name="name"
            label="Event name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="description-input"
            name="description"
            label="Describe your event"
            type="text"
            value={formValues.description}
            onChange={handleInputChange}
          />
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                disablePast
               //id="eventDate-input"
                //name="date"
                label="Choose your event date"
                value={formValues.date}
                onChange={handleInputChange}
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
      </Grid>
    </form>
  )
}
export default Form 



