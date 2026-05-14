import React, { useEffect, useState } from 'react'
import { Container, Grid, TextField, MenuItem, Select, InputLabel, FormControl, Button, Box, Paper, Typography, Chip, Alert } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import AddIcon from '@mui/icons-material/Add'
import PetCard from './components/PetCard'
import AddPetForm from './components/AddPetForm'
import EditPetForm from './components/EditPetForm'
import { API_BASE_URL, deletePet, getPets } from './clients/api'
import useDebounce from './hooks/useDebounce'
import SkeletonCard from './components/SkeletonCard'

export default function App() {
  const [pets, setPets] = useState([])
  const [q, setQ] = useState('')
  const [species, setSpecies] = useState('')
  const [page, setPage] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedPet, setSelectedPet] = useState(null)
  const [loadError, setLoadError] = useState('')

  const hasFilters = Boolean(q || species)
  const sortedPets = [...pets].sort((a, b) => {
    const speciesCompare = (a.species || '').localeCompare(b.species || '')
    if (speciesCompare !== 0) return speciesCompare
    return (a.name || '').localeCompare(b.name || '')
  })

  const debouncedQ = useDebounce(q, 400)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const fetchPets = async () => {
    setIsFetching(true)
    try {
      setLoadError('')
      const data = await getPets({ q: debouncedQ, species, page, limit: 9 })
      setPets(Array.isArray(data) ? data : [])
    } catch (err) {
      setPets([])
      setLoadError(err.message || `Failed to load pets from ${API_BASE_URL}`)
    } finally {
      setIsFetching(false)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetchPets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ, species, page])

  const handleEditPet = (pet) => {
    setSelectedPet(pet)
    setEditDialogOpen(true)
  }

  const handleDeletePet = async (petId) => {
    try {
      await deletePet(petId)
      await fetchPets()
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
        <Paper elevation={3} sx={{ p: 3, mb: 4, backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.95)', borderRadius: 3 }}>
          {loadError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loadError}
            </Alert>
          )}
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
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip label={`📊 ${pets.length} pets available`} color="primary" variant="outlined" />
            {species && <Chip label={`Filter: ${species}`} onDelete={() => setSpecies('')} color="secondary" />}
            {q && <Chip label={`Search: "${q}"`} onDelete={() => setQ('')} color="secondary" />}
            {hasFilters && (
              <Button size="small" onClick={() => { setQ(''); setSpecies('') }}>
                Clear filters
              </Button>
            )}
          </Box>
        </Paper>

        {/* Pet Gallery */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
            Available Pets
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <SkeletonCard />
              </Grid>
            ))
          ) : (
            sortedPets.length > 0 ? (
              sortedPets.map(p => (
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
            )
          )}
        </Grid>

        {/* Pagination / load more */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button disabled={isLoading || isFetching} onClick={() => setPage(p => p + 1)}>
            Load more
          </Button>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 6, textAlign: 'center', color: 'white', opacity: 0.8 }}>
          <Typography variant="body2">© 2026 Petstore. All rights reserved. 🐾</Typography>
        </Box>
      </Container>

        <AddPetForm open={dialogOpen} onClose={() => setDialogOpen(false)} onPetAdded={async () => { setDialogOpen(false); await fetchPets(); setPage(0); }} />
      <EditPetForm open={editDialogOpen} pet={selectedPet} onClose={() => setEditDialogOpen(false)} onPetUpdated={async () => { setEditDialogOpen(false); await fetchPets(); setPage(0); }} />
    </Box>
  )
}
