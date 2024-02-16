import React from "react";
import { MovieCard } from "./index";
import { Box, Button, Grid, Link, Typography } from "@mui/material";

export default function HomeBody() {
  return (
    <Box sx={{ width: "100%" }} px={20} mt={4}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <Typography variant="h4">Featured Films</Typography>

        <Box>
          <Button variant="text">previous</Button>
          <Button variant="text">See more</Button>
        </Box>
      </Box>
      <Box pt={2}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid item xs={3}>
            <MovieCard />
          </Grid>
          <Grid item xs={3}>
            <MovieCard />
          </Grid>
          <Grid item xs={3}>
            <MovieCard />
          </Grid>
          <Grid item xs={3}>
            <MovieCard />
          </Grid>
          <Grid item xs={3}>
            <MovieCard />
          </Grid>
          <Grid item xs={3}>
            <MovieCard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
