import './App.css'
import { Box } from '@mui/material';
import { Nav } from './components';
import Landing from './pages/Landing';
import { MovieContextProvider } from './utils/MovieContext';


function App() {
  return (
    <Box>
      <Nav />
      <MovieContextProvider>
        <Landing />
      </MovieContextProvider>
    </Box>
  );
}

export default App;
