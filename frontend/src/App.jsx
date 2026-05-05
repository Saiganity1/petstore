import React, { useEffect, useState } from 'react'
import { Container, Grid, TextField, MenuItem, Select, InputLabel, FormControl, Button, Box, Paper, Typography, Chip } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import AddIcon from '@mui/icons-material/Add'
import PetCard from './components/PetCard'
import AddPetForm from './components/AddPetForm'
import EditPetForm from './components/EditPetForm'

export default function App() {
  const [pets, setPets] = useState([])
  const [q, setQ] = useState('')
  const [species, setSpecies] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedPet, setSelectedPet] = useState(null)

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

  const handleEditPet = (pet) => {
    setSelectedPet(pet)
    setEditDialogOpen(true)
  }

  const handleDeletePet = async (petId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pets/${petId}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      fetchPets()
    } catch (err) {
      alert(`Failed to delete pet: ${err.message}`)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <PetsIcon sx={{ fontSize: 40 }} />
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Petstore</Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 3 }}>Your trusted pet marketplace</Typography>
        </Box>

        {/* Controls Card */}
        <Paper elevation={3} sx={{ p: 3, mb: 4, backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.95)' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField 
                fullWidth 
                label="🔍 Search by name" 
                value={q} 
                onChange={e => setQ(e.target.value)}
                variant="outlined"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Species</InputLabel>
                <Select value={species} label="Species" onChange={e => setSpecies(e.target.value)}
                  sx={{ borderRadius: 2 }}>
                  <MenuItem value="">All Species</MenuItem>
                  <MenuItem value="Dog">🐕 Dog</MenuItem>
                  <MenuItem value="Cat">🐈 Cat</MenuItem>
                  <MenuItem value="Bird">🐦 Bird</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button 
                fullWidth 
                variant="contained" 
                onClick={() => setDialogOpen(true)}
                sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 'bold'
                }}
                startIcon={<AddIcon />}
              >
                Add Pet
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label={`📊 ${pets.length} pets available`} color="primary" variant="outlined" />
            {species && <Chip label={`Filter: ${species}`} onDelete={() => setSpecies('')} color="secondary" />}
            {q && <Chip label={`Search: "${q}"`} onDelete={() => setQ('')} color="secondary" />}
          </Box>
        </Paper>

        {/* Pet Gallery */}
        <Grid container spacing={3}>
          {pets.length > 0 ? (
            pets.map(p => (
              <Grid item key={p.id} xs={12} sm={6} md={4}>
                <PetCard pet={p} onEdit={handleEditPet} onDelete={handleDeletePet} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, textAlign: 'center', background: 'rgba(255,255,255,0.95)' }}>
                <Typography variant="h6" color="textSecondary">No pets found. Try adjusting your filters or add a new pet!</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>

        {/* Footer */}
        <Box sx={{ mt: 6, textAlign: 'center', color: 'white', opacity: 0.8 }}>
          <Typography variant="body2">© 2026 Petstore. All rights reserved. 🐾</Typography>
        </Box>
      </Container>

      <AddPetForm open={dialogOpen} onClose={() => setDialogOpen(false)} onPetAdded={() => { setDialogOpen(false); fetchPets() }} />
      <EditPetForm open={editDialogOpen} pet={selectedPet} onClose={() => setEditDialogOpen(false)} onPetUpdated={() => { setEditDialogOpen(false); fetchPets() }} />
    </Box>
  )
}
