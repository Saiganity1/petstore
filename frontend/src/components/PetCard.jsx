import React from 'react'
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function PetCard({ pet, onEdit, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm(`Delete ${pet.name}?`)) {
      onDelete(pet.id)
    }
  }

  return (
    <Card sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 28px rgba(102, 126, 234, 0.4)',
        borderTop: '4px solid #667eea'
      },
      borderRadius: 3,
      overflow: 'hidden'
    }}>
      {pet.imageUrl ? (
        <CardMedia 
          component="img" 
          height="200" 
          image={pet.imageUrl} 
          alt={pet.name}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        <Box sx={{ height: 200, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: 60 }}>🐾</Typography>
        </Box>
      )}
      
      <CardContent sx={{ flexGrow: 1, background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,245,1) 100%)' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5, color: '#333', minHeight: 40 }}>
          {pet.name}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Typography variant="body2" sx={{ background: '#667eea', color: 'white', px: 1.5, py: 0.5, borderRadius: 2, fontWeight: 'bold', fontSize: '0.75rem' }}>
            {pet.species}
          </Typography>
          <Typography variant="body2" sx={{ background: '#764ba2', color: 'white', px: 1.5, py: 0.5, borderRadius: 2, fontWeight: 'bold', fontSize: '0.75rem' }}>
            {pet.age ?? '-'} yrs
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            mt: 1.5,
            mb: 1.5,
            color: '#666',
            lineHeight: 1.5,
            minHeight: 66,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {pet.description || 'No description provided.'}
        </Typography>

        {pet.price != null && (
          <Box sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            p: 1.5,
            borderRadius: 2,
            textAlign: 'center',
            mb: 1.5
          }}>
            <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.8rem' }}>Price</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>₱{Number(pet.price).toFixed(2)}</Typography>
          </Box>
        )}
      </CardContent>

      <Box sx={{ p: 1.5, display: 'flex', gap: 1 }}>
        <Button 
          size="small" 
          variant="outlined" 
          startIcon={<EditIcon />} 
          onClick={() => onEdit(pet)} 
          fullWidth
          sx={{
            color: '#667eea',
            borderColor: '#667eea',
            fontWeight: 'bold',
            '&:hover': {
              background: '#667eea',
              color: 'white',
              borderColor: '#667eea'
            }
          }}
        >
          Edit
        </Button>
        <Button 
          size="small" 
          variant="outlined" 
          color="error" 
          startIcon={<DeleteIcon />} 
          onClick={handleDelete} 
          fullWidth
          sx={{ fontWeight: 'bold' }}
        >
          Delete
        </Button>
      </Box>
    </Card>
  )
}
