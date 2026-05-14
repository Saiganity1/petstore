import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Button, Alert, InputAdornment, CircularProgress } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { updatePet } from '../clients/api'

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
      setIsSubmitting(true)
      await updatePet(pet.id, {
        name,
        species,
        age: parseInt(age, 10) || 0,
        description,
        imageUrl,
        price: parseFloat(price) || null
      })
      setIsSubmitting(false)
      onPetUpdated()
      onClose()
    } catch (err) {
      setError(err.message || 'Failed to update pet')
    }
  }
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', fontWeight: 'bold', fontSize: '1.3rem' }}>
        ✏️ Edit Pet
      </DialogTitle>
      <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}
        
        <TextField 
          label="Pet Name" 
          fullWidth 
          value={name} 
          onChange={e => setName(e.target.value)}
          variant="outlined"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        
        <FormControl fullWidth>
          <InputLabel>Species</InputLabel>
          <Select 
            value={species} 
            label="Species" 
            onChange={e => setSpecies(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="Dog">🐕 Dog</MenuItem>
            <MenuItem value="Cat">🐈 Cat</MenuItem>
            <MenuItem value="Bird">🐦 Bird</MenuItem>
          </Select>
        </FormControl>
        
        <TextField 
          label="Age (years)" 
          type="number" 
          fullWidth 
          value={age} 
          onChange={e => setAge(e.target.value)}
          variant="outlined"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        
        <TextField 
          label="Description" 
          multiline 
          rows={3} 
          fullWidth 
          value={description} 
          onChange={e => setDescription(e.target.value)}
          variant="outlined"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        
        <TextField 
          label="Image URL" 
          fullWidth 
          value={imageUrl} 
          onChange={e => setImageUrl(e.target.value)}
          variant="outlined"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        
        <TextField 
          label="Price" 
          type="number" 
          fullWidth 
          value={price} 
          onChange={e => setPrice(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">₱</InputAdornment>,
          }}
          variant="outlined"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          startIcon={<SaveIcon />}
          sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2,
            fontWeight: 'bold'
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
