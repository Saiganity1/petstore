import React, { useEffect, useState } from 'react'
import { Container, Grid, TextField, MenuItem, Select, InputLabel, FormControl, Button, Box } from '@mui/material'
import PetCard from './components/PetCard'
import AddPetForm from './components/AddPetForm'

export default function App() {
  const [pets, setPets] = useState([])
  const [q, setQ] = useState('')
  const [species, setSpecies] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  const fetchPets = () => {
    let url = `${import.meta.env.VITE_API_URL}/api/pets`
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (species) params.set('species', species)
    if ([...params].length) url += '?' + params.toString()
    fetch(url).then(r => r.json()).then(setPets).catch(console.error)
  }

  useEffect(() => {
    fetchPets()
  }, [q, species])

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Petstore Catalog</h1>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Pet</Button>
      </Box>
      <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Search by name" value={q} onChange={e => setQ(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Species</InputLabel>
            <Select value={species} label="Species" onChange={e => setSpecies(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Dog">Dog</MenuItem>
              <MenuItem value="Cat">Cat</MenuItem>
              <MenuItem value="Bird">Bird</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {pets.map(p => (
          <Grid item key={p.id} xs={12} sm={6} md={4}>
            <PetCard pet={p} />
          </Grid>
        ))}
      </Grid>

      <AddPetForm open={dialogOpen} onClose={() => setDialogOpen(false)} onPetAdded={() => { setDialogOpen(false); fetchPets() }} />
    </Container>
  )
}
