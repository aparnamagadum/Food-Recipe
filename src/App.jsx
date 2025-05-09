import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Item from './components/Items/Item';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<SearchPage />} />
    <Route path="/item/:id" element={<Item/>}/>


    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
