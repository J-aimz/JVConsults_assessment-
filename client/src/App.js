import './App.css'
import { Box } from '@mui/material';
import { Home, MoviePreview } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Nav } from './components';

function App() {
  return (
    <Box>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<MoviePreview />} />
        </Routes>
      </BrowserRouter>
     
    </Box>
  );
}

export default App;
