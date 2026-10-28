import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogCategoryPage from './pages/CatalogCategoryPage';
import ShowcasePage from './pages/ShowcasePage';
import ShowcaseCategoryPage from './pages/ShowcaseCategoryPage';
import InfoPage from './pages/InfoPage';
import { HOME_SECTION_PATHS } from './data/homeSections';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminLayout from './layouts/AdminLayout';
import AdminOverviewPage from './pages/admin/AdminOverviewPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminProductFormPage from './pages/admin/AdminProductFormPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import { AdminAuthProvider } from './contexts/AdminAuthContext';

export default function App() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {HOME_SECTION_PATHS.map((path) => (
          <Fragment key={path}>
            <Route path={`/${path}`} element={<HomePage />} />
          </Fragment>
        ))}
        <Route path="/catalog/:slug" element={<CatalogCategoryPage />} />
        <Route path="/showcase" element={<ShowcasePage />} />
        <Route path="/showcase/:category" element={<ShowcaseCategoryPage />} />
        <Route path="/branded-uniform-fabrics" element={<InfoPage />} />
        <Route path="/corporate-industrial-uniforms" element={<InfoPage />} />
        <Route path="/dealers-retailers" element={<InfoPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminOverviewPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/new" element={<AdminProductFormPage />} />
          <Route path="products/:id/edit" element={<AdminProductFormPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}
