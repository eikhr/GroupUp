import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import IEvent from '../../models/event'
import API, { APIError } from '../../API'
import { useNavigate } from 'react-router-dom'
import ErrorCard from '../layout/errorCard'
import Group from '../../models/group'

const defaultValues = {
  name: '',
  description: '',
}

const Form = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(defaultValues)
  const [dateValue, setValue] = useState<Date | null>(new Date())
  const [arrangingGroup, setArrangingGroup] = useState<Group | undefined>()
  const [allGroups, setAllGroups] = useState<Group[] | undefined>()
  const [error, setError] = useState<string | null>()
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const fetchGroups = async () => {
    const groups = await API.getAllGroups()
    setAllGroups(groups)
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const event: IEvent = {
      title: formValues.name,
      description: formValues.description,
      date: dateValue?.toJSON(),
      groups: [],
    }

    if (arrangingGroup) {
      await putGroupWithNewEvent(arrangingGroup, event)
    } else {
      await postEvent(event)
    }
  }

  const putGroupWithNewEvent = async (group: Group, event: IEvent) => {
    if (!group.events) {
      group.events = [event]
    } else {
      group.events.push(event)
    }

    try {
      await API.updateGroup(group)
      navigate('/events')
    } catch (err: unknown) {
      const apiErr = err as APIError
      setError(`${apiErr.message}, ${apiErr.status}`)
    }
  }

  const postEvent = async (event: IEvent) => {
    try {
      await API.addEvent(event)
      navigate('/events')
    } catch (err: unknown) {
      const apiErr = err as APIError
      setError(`${apiErr.message}, ${apiErr.status}`)
    }
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { value } = e.target
    setArrangingGroup(allGroups?.find((group) => '' + group.id === value))
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
              onChange={(newDate) => setValue(newDate)}
              onError={console.log}
              inputFormat="yyyy/MM/dd HH:mm"
              mask="___/__/__ __:__"
              renderInput={(params) => <TextField {...params} />}
            />
            <FormControl>
              <InputLabel id="group-label">Arrangerende gruppe</InputLabel>
              <Select
                labelId="group-label"
                label="Arrangerende gruppe"
                displayEmpty
                value={'' + arrangingGroup?.id}
                onChange={handleSelectChange}
              >
                {allGroups?.map((group) => (
                  <MenuItem key={group.id} value={'' + group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
