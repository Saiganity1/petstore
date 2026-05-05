import React from 'react'
import { Card, CardContent, CardMedia, Typography, Box, Button, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function PetCard({ pet, onEdit, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm(`Delete ${pet.name}?`)) {
      onDelete(pet.id)
    }
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {pet.imageUrl && <CardMedia component="img" height="160" image={pet.imageUrl} alt={pet.name} />}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{pet.name}</Typography>
        <Typography variant="subtitle2" color="text.secondary">{pet.species} — {pet.age} years</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>{pet.description}</Typography>
        {pet.price && <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold', color: '#d32f2f' }}>${pet.price.toFixed(2)}</Typography>}
      </CardContent>
      <Box sx={{ p: 1, display: 'flex', gap: 1 }}>
        <Button size="small" variant="outlined" startIcon={<EditIcon />} onClick={() => onEdit(pet)} fullWidth>Edit</Button>
        <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete} fullWidth>Delete</Button>
      </Box>
    </Card>
  )
}
