import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogCategoryPage from './pages/CatalogCategoryPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog/:slug" element={<CatalogCategoryPage />} />
    </Routes>
  );
}
