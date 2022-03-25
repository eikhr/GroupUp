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
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API, { APIError } from '../../API'
import Group from '../../models/group'
import ErrorCard from '../layout/errorCard'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import LoginContext from '../../context/loginContext'

const defaultValues = {
  name: '',
  description: '',
  minAge: 18,
  maxAge: 99,
  interests: [''],
  email: '',
}
export const interestList = [
  'tur',
  'fest',
  'hest',
  'pokemon go',
  'buldring',
  'matlaging',
  'strikking',
]

const Form = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(defaultValues)
  const [interests, setInterest] = React.useState<string[]>([])
  const [error, setError] = React.useState<string | null>()
  const { authSession, setCurrentGroup } = useContext(LoginContext)

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
      minAge: 18,
      maxAge: 99,
      interests: interests,
      contactEmail: formValues.email,
    }
    try {
      if (authSession) {
        group.id = await API.addGroup(authSession, group)
        setCurrentGroup(group)
        navigate('/events')
      }
    } catch (err: unknown) {
      const apiErr = err as APIError
      setError(`${apiErr.message}, ${apiErr.status}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="center">
        <Stack spacing={3}>
          <Typography variant="h2"> Lag din gruppe </Typography>
          {error && <ErrorCard message={error + ''} />}
          <TextField
            id="name-input"
            name="name"
            label="Gruppenavn"
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
            label="Beskriv gruppen din"
            type="text"
            required
            value={formValues.description}
            onChange={handleInputChange}
          />
          <TextField
            id="email-input"
            name="email"
            label="E-post"
            type="text"
            required
            value={formValues.email}
            onChange={handleInputChange}
          />
          <FormControl>
            <InputLabel id="interest-label">Interesser</InputLabel>
            <Select
              required
              labelId="interest-label"
              label="Velg interesser"
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
            Lag gruppe
          </Button>
        </Stack>
      </Grid>
    </form>
  )
}
export default Form
