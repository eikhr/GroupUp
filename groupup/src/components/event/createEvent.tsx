import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import IEvent from '../../models/event'
import API, { APIError } from '../../API'
import { useNavigate } from 'react-router-dom'
import ErrorCard from '../layout/errorCard'

const defaultValues = {
  name: '',
  description: '',
}

const Form = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(defaultValues)
  const [dateValue, setValue] = React.useState<Date | null>(new Date())
  const [error, setError] = React.useState<string | null>()
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
      time: dateValue?.toJSON(),
    }
    try {
      await API.addEvent(event)
      navigate('/events')
    } catch (err: unknown) {
      const apiErr = err as APIError
      setError(`${apiErr.message}, ${apiErr.status}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="center">
        <Stack spacing={3}>
          <Typography variant="h2"> Create your event </Typography>
          {error && <ErrorCard message={error + ''} />}
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
