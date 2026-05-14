import React from 'react'
import { Card, CardContent, Box, Skeleton } from '@mui/material'

export default function SkeletonCard() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <Box sx={{ pt: '62.5%', bgcolor: '#f5f7fb' }}>
        <Skeleton variant="rectangular" animation="wave" sx={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%' }} />
      </Box>
      <CardContent>
        <Skeleton width="60%" />
        <Skeleton width="40%" />
        <Skeleton width="80%" />
      </CardContent>
    </Card>
  )
}
