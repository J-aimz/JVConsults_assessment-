import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function MovieCard({ movieData }) {
  const navigate = useNavigate();

  function handleRouting(id) {
    navigate(`/movie/${id}`);
  }

  return (
    <Box onClick={() => handleRouting(movieData.imdbID)}>
      <Card width={{ xs: "50%", sm: "345" }} maxWidth={345}>
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ height: { xs: "300px", sm: "350px", md: "470px" } }}
            image={movieData?.Poster}
            alt={`${movieData.Title} movie poster`}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant={{ xs: "h6", sm: "h5" }}
              component="div"
            >
              {movieData?.Title}
            </Typography>
            <Box>
              <Typography variant="body2" color="text.secondary">
                year: {movieData?.Year}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
