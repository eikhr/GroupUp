import Typography from '@mui/material/Typography'
import React from 'react'
import './App.css'
import EventList from './components/eventList'

const events = [
  { title: 'Test event', id: 1, description: 'Description' },
  { title: 'Another test event', id: 2, description: 'Whatever' },
  {
    title: 'This is a test',
    id: 3,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec est nec libero sagittis tincidunt in id ante. Quisque vel tincidunt mi. Pellentesque purus nisl, lacinia ac semper vitae, maximus eu libero. Sed odio ex, ultrices vel lobortis non, faucibus id turpis. Pellentesque eu ligula risus. Aliquam bibendum nibh at felis pellentesque porta sed sed velit. Integer a tortor laoreet, tristique justo ac, egestas sapien. Suspendisse consequat venenatis venenatis. Pellentesque a aliquet orci, in volutpat tellus. Ut efficitur ligula non lacus vulputate viverra. Mauris sollicitudin rutrum orci, eu lacinia turpis luctus eu. Cras at tristique arcu. Etiam a ornare tellus. Cras et aliquam ligula, sed egestas enim. Proin congue ex sagittis augue rutrum, eu pulvinar nisi placerat. Maecenas condimentum nulla eu semper facilisis.  ',
  },
  { title: 'Testing testing 123', id: 4, description: 'Whatever' },
]

const App = () => {
  return (
    <div className="App">
      <Typography variant="h3">Create GroupUp App</Typography>
      <EventList events={events} />
    </div>
  )
}

export default App
