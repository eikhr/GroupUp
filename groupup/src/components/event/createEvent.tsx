import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import IEvent from "../../models/event";
import API from "../../API";
import { useNavigate } from 'react-router-dom'

const defaultValues = {
  name: '',
  description: '',
}

const Form = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(defaultValues)
  const [dateValue, setValue] = React.useState<Date | null>(new Date())
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const event: IEvent = {
      title: formValues.name,
      description: formValues.description,
      time: dateValue?.toJSON()
    }
    try {
      await API.addEvent(event)
      navigate("/events")
    } catch (err) {
      console.log(err)
      //TODO: better error-handling
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="center">
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
              label="Choose your event date"
              value={dateValue}
              onChange={setValue}
              onError={console.log}
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
