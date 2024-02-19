import React, { useContext, useState } from "react";
import { MovieCard } from "./index";
import {
  Button,
  TextField,
  Box,
  Divider,
  Grid,
  Typography,
  Paper,
  FormControl,
  MenuItem,
} from "@mui/material";
import { MovieContext } from "../utils/MovieContext";
import SearchIcon from "@mui/icons-material/Search";

export default function HomeBody() {
  const { state, dispatch } = useContext(MovieContext);
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setCurrentSearch(value);
  }

  async function getMoiveTitle(title, page = 1) {
    try {
      if (!searchHistory.includes(title)) {
        setSearchHistory((prev) => {
          if (prev.length >= 5) {
            return [...prev.slice(1), title];
          } else {
            return [...prev, title];
          }
        });
      }

      const res = await fetch(
        `${process.env.REACT_APP_base_url}movie/search/?title=${title}&page=${page}`
      );
      const data = await res.json();

      return data.result;
    } catch (err) {
      console.log("logging error: ", err);
    }
  }

  async function getPage(type) {
    const result = await getMoiveTitle(currentSearch, state.page + 1);
    dispatch({ type: type, payload: result });
  }

  async function handleKeyPress(e) {
    if (e.key === "Enter" && currentSearch.trim() !== "") {
      const result = await getMoiveTitle(currentSearch, 1);
      dispatch({ type: "movies", payload: result });
    }
  }

  async function handleSearchOptionsClick(value) {
    setCurrentSearch(value);
    const result = await getMoiveTitle(value, 1);
    dispatch({ type: "movies", payload: result });
  }

  async function handleSearchBtnClick() {
    const result = await getMoiveTitle(currentSearch, 1);
    dispatch({ type: "movies", payload: result });
  }

  return (
    <Box>
      <Box
        mt={{ xs: 3, sm: 6 }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        position={"relative"}
      >
        <Box display={"flex"} justifyContent={"center"}>
          <TextField
            sx={{ width: { xs: 300, md: 400 } }}
            id="outlined-basic"
            label="Search movie tilte"
            variant="outlined"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            onFocus={() => setInputIsFocused(true)}
            onBlur={() => setTimeout(() => setInputIsFocused(false), 500)}
          />
          <Button onClick={handleSearchBtnClick} variant="outlined">
            <SearchIcon />
          </Button>
        </Box>

        {searchHistory.length > 0 && inputIsFocused && (
          <Box
            sx={{ width: { xs: 340, md: 460 } }}
            margin={"auto"}
            height={"fit-content"}
            border={"1px solid #f5f5f5"}
            component={Paper}
            elevation={1}
            position={"absolute"}
            zIndex={2}
            top={"calc(100% + 5px)"}
            left={0}
            right={0}
          >
            <FormControl fullWidth>
              {searchHistory?.slice(-5).map((el, ind) => (
                <MenuItem
                  onClick={() => handleSearchOptionsClick(el)}
                  key={ind}
                  value={el}
                >
                  {el}
                </MenuItem>
              ))}
            </FormControl>
          </Box>
        )}
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={{ xs: "flex-start", sm: "flex-end" }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <Typography mt={2} component={"h1"} variant={{ xs: "h5", sm: "h4" }}>
          Search results:
        </Typography>

        <Box
          display={{ xs: "flex" }}
          justifyContent={{ xs: "space-between" }}
          alignContent={{ xs: "center" }}
          width={{ xs: "100%", sm: "auto" }}
        >
          {state.page > 1 && (
            <Button
              onClick={() => {
                getPage("prev");
              }}
              variant="text"
            >
              previous
            </Button>
          )}

          {state.allMovies.length > 0 && (
            <Button
              onClick={() => {
                getPage("next");
              }}
              variant="text"
            >
              See more
            </Button>
          )}
        </Box>
      </Box>
      <Box pt={2}>
        <Grid
          container
          rowSpacing={{ xs: 3, sm: 6 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {state.allMovies?.map((movie) => (
            <Grid key={movie.imdbID} item xs={6} sm={4} md={3}>
              <MovieCard movieData={movie} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider mt={4} />
      <Box></Box>
    </Box>
  );
}
