import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import IEvent from '../../models/event'
import API from '../../API'
import { useNavigate } from 'react-router-dom'
import ErrorCard from '../layout/errorCard'
import LoginContext from '../../context/loginContext'

const defaultValues = {
  name: '',
  description: '',
}

const Form = () => {
  const { currentGroup, setCurrentGroup, authSession } = useContext(LoginContext)
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(defaultValues)
  const [dateValue, setValue] = useState<Date | null>(new Date())
  const [error, setError] = useState<string | null>()
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
      date: dateValue?.toJSON(),
      groupsMatched: [],
    }

    if (currentGroup) {
      await postEvent(event)
    } else {
      setError('You must choose a group to create event!')
    }
  }

  const postEvent = async (event: IEvent) => {
    if (!currentGroup || !authSession) return
    try {
      await API.addEvent(event, currentGroup, authSession)
      setCurrentGroup(await API.getGroup(currentGroup.id ?? 0))
      navigate('/events')
    } catch (err: unknown) {
      setError('' + err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="center">
        <Stack spacing={3}>
          <Typography variant="h2"> Opprett aktivitet </Typography>
          {error && <ErrorCard message={error} />}
          <TextField
            id="name-input"
            name="name"
            label="Navn på aktivitet"
            type="text"
            required
            value={formValues.name}
            onChange={handleInputChange}
          />
          <TextField
            multiline
            rows={4}
            id="description-input"
            name="description"
            label="Beskriv aktiviteten"
            type="text"
            required
            value={formValues.description}
            onChange={handleInputChange}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              disablePast
              label="Velg dato for aktiviteten"
              value={dateValue}
              onChange={(newDate) => setValue(newDate)}
              onError={console.log}
              inputFormat="yyyy/MM/dd HH:mm"
              ampm={false}
              mask="___/__/__ __:__"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            id="arranging-group"
            name="group"
            label="Arrangerende gruppe"
            type="text"
            required
            disabled
            value={currentGroup?.name}
          />
          <Button
            variant="contained"
            color={currentGroup?.gold ? 'inherit' : 'primary'}
            type="submit"
          >
            Opprett aktivitet
          </Button>
        </Stack>
      </Grid>
    </form>
  )
}
export default Form
