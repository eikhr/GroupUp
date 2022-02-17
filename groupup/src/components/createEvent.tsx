import {
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

const defaultValues = {
  name: '',
  description: '',
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
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  )
}
export default Form
