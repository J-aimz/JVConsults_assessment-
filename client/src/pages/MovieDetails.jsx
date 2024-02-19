import { Box, Button, CardMedia, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import url from "../utils/baseUrl.json";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function MovieDetails() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getMovieDetails(id) {
      try {
        const res = await fetch(`${process.env.REACT_APP_base_url}movie/${id}`);
        const data = await res.json();
        setData(data.result);
      } catch (err) {
        console.log("logging error: ", err);
      }
    }

    if (id) {
      getMovieDetails(id);
    }
  }, []);

  console.log(data);

  return (
    <Box>
      <Box mb={4}>
        <Button
          variant="outlined"
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Box flex={1}>
          <CardMedia
            component="img"
            sx={{ height: { xs: "400px", sm: "350px", md: "470px" } }}
            image={data?.Poster}
            alt="movie poster"
          />
        </Box>

        <Box p={2}>
          <box>
            <Typography variant="h3" component={"h1"} gutterBottom>
              {data?.Title}
            </Typography>
            <Typography variant="subtitle1" component={"h1"} gutterBottom>
              {data?.Plot}
            </Typography>

            <Typography variant="subtitle1" component={"h1"} gutterBottom>
              Rating: {data?.Ratings[0].Value}
            </Typography>
            <Typography variant="subtitle2" component={"p"} gutterBottom>
              Casts: {data?.Actors}
            </Typography>
            <Typography variant="subtitle2">Rated: {data?.Rated}</Typography>
            <Typography variant="subtitle2"> Type: {data?.Type}</Typography>
            <Typography variant="subtitle2">Year: {data?.Year}</Typography>
            {
              data?.totalSeasons &&
              <Typography variant="subtitle2">
                Seasons: {data?.totalSeasons}
              </Typography>
            }
          </box>
        </Box>
      </Stack>
    </Box>
  );
}
