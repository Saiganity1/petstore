import React, { useState } from 'react'
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'

export default function AddPetForm({ open, onClose, onPetAdded }) {
  const [form, setForm] = useState({ name: '', species: '', age: '', description: '', imageUrl: '', price: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      if (!form.name || !form.species) {
        setError('Name and species are required')
        return
      }
      const res = await fetch('http://localhost:8080/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          species: form.species,
          age: parseInt(form.age) || 0,
          description: form.description,
          imageUrl: form.imageUrl,
          price: form.price ? parseFloat(form.price) : null
        })
      })
      if (!res.ok) throw new Error('Failed to add pet')
      onPetAdded()
      setForm({ name: '', species: '', age: '', description: '', imageUrl: '', price: '' })
      setError('')
      onClose()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Pet</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
        <FormControl fullWidth>
          <InputLabel>Species</InputLabel>
          <Select name="species" value={form.species} label="Species" onChange={handleChange}>
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Cat">Cat</MenuItem>
            <MenuItem value="Bird">Bird</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Age" name="age" type="number" value={form.age} onChange={handleChange} fullWidth />
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth multiline rows={3} />
        <TextField label="Image URL" name="imageUrl" value={form.imageUrl} onChange={handleChange} fullWidth />
        <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Add Pet</Button>
      </DialogActions>
    </Dialog>
  )
}
