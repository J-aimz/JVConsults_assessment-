import React, {useState} from 'react'
import { Nav, HomeBody, Hero } from "../components";
import { Autocomplete, Box, TextField } from '@mui/material'

export default function Home() {
  const [searchHistory, setSearchHistory] = useState([])
  const [currentSearch, setCurrentSearch] = useState(null)

  function handleChange() {
    
  }

  return (
    <Box>
      <Box mt={6} display={"flex"} justifyContent={"center"}>
        <Autocomplete
          value={currentSearch}
          onChange={handleChange}
          disablePortal
          id="combo-box-demo"
          options={searchHistory}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </Box>
      <HomeBody />
    </Box>
  );
}
