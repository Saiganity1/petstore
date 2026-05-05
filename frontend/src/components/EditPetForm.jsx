import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Button, Alert } from '@mui/material'

export default function EditPetForm({ open, pet, onClose, onPetUpdated }) {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [age, setAge] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (pet) {
      setName(pet.name || '')
      setSpecies(pet.species || '')
      setAge(pet.age || '')
      setDescription(pet.description || '')
      setImageUrl(pet.imageUrl || '')
      setPrice(pet.price || '')
      setError('')
    }
  }, [pet, open])

  const handleSubmit = async () => {
    if (!name || !species) {
      setError('Name and species are required')
      return
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pets/${pet.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          species,
          age: parseInt(age) || 0,
          description,
          imageUrl,
          price: parseFloat(price) || null
        })
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      onPetUpdated()
      onClose()
    } catch (err) {
      setError(err.message || 'Failed to update pet')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Pet</DialogTitle>
      <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Name" fullWidth value={name} onChange={e => setName(e.target.value)} />
        <FormControl fullWidth>
          <InputLabel>Species</InputLabel>
          <Select value={species} label="Species" onChange={e => setSpecies(e.target.value)}>
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Bird">Bird</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Age" type="number" fullWidth value={age} onChange={e => setAge(e.target.value)} />
        <TextField label="Description" multiline rows={3} fullWidth value={description} onChange={e => setDescription(e.target.value)} />
        <TextField label="Image URL" fullWidth value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <TextField label="Price" type="number" fullWidth value={price} onChange={e => setPrice(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save Changes</Button>
      </DialogActions>
    </Dialog>
  )
}
