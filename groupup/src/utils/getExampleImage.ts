const getExampleImage = () => {
  const images = [
    'group_example_hiking.jpeg',
    'group_example_horses.jpeg',
    'group_example_pokemon.jpeg',
    'group_example_party.jpeg',
  ]
  return '/groupPhotoExamples/' + images[Math.floor(Math.random() * images.length)]
}

export default getExampleImage
