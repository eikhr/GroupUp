import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API, { APIError } from '../../API'
import Group from '../../models/group'
import ErrorCard from '../layout/errorCard'
import { Favorite, FavoriteBorder } from '@mui/icons-material'

const defaultValues = {
  name: '',
  description: '',
  interests: [''],
}
const interestList = ['hiking', 'parties', 'horses', 'pokemon go']

const Form = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(defaultValues)
  const [interests, setInterest] = React.useState<string[]>([])
  const [error, setError] = React.useState<string | null>()
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSelectChange = (e: SelectChangeEvent<typeof interests>) => {
    const { value } = e.target
    setInterest([...value])
    console.log(value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const group: Group = {
      name: formValues.name,
      description: formValues.description,
    }
    try {
      await API.addGroup(group)
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
          <Typography variant="h2"> Create your group </Typography>
          {error && <ErrorCard message={error + ''} />}
          <TextField
            id="name-input"
            name="name"
            label="Group name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <TextField
            multiline
            rows={4}
            id="description-input"
            name="description"
            label="Describe your group"
            type="text"
            value={formValues.description}
            onChange={handleInputChange}
          />
          <FormControl>
            <InputLabel id="interest-label">Interests</InputLabel>
            <Select
              labelId="interest-label"
              label="Pick interests"
              name="interests"
              multiple
              displayEmpty
              value={interests}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Interests" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {interestList.map((interest) => (
                <MenuItem key={interest} value={interest}>
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={interests.indexOf(interest) > -1}
                  />
                  <ListItemText primary={interest} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Stack>
      </Grid>
    </form>
  )
}
export default Form
