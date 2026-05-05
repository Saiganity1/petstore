import React from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

export default function PetCard({ pet }) {
  return (
    <Card>
      {pet.imageUrl && <CardMedia component="img" height="160" image={pet.imageUrl} alt={pet.name} />}
      <CardContent>
        <Typography variant="h6">{pet.name}</Typography>
        <Typography variant="subtitle2" color="text.secondary">{pet.species} — {pet.age} years</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>{pet.description}</Typography>
      </CardContent>
    </Card>
  )
}
