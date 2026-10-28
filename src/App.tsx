import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogCategoryPage from './pages/CatalogCategoryPage';
import ShowcasePage from './pages/ShowcasePage';
import ShowcaseCategoryPage from './pages/ShowcaseCategoryPage';
import BrandedFabricsPage from './pages/BrandedFabricsPage';
import CorporateIndustrialPage from './pages/CorporateIndustrialPage';
import SportsWearPage from './pages/SportsWearPage';
import DealersPage from './pages/DealersPage';
import ContactPage from './pages/ContactPage';
import ManufacturingPage from './pages/ManufacturingPage';
import CatalogPage from './pages/CatalogPage';
import AboutPage from './pages/AboutPage';
import SchoolUniformsPage from './pages/SchoolUniformsPage';
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
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/about-us/:section" element={<AboutPage />} />
        <Route path="/school-uniforms" element={<SchoolUniformsPage />} />
        <Route path="/school-uniforms/:section" element={<SchoolUniformsPage />} />
        <Route path="/branded-uniform-fabrics" element={<BrandedFabricsPage />} />
        <Route path="/branded-uniform-fabrics/:section" element={<BrandedFabricsPage />} />
        <Route path="/corporate-industrial-uniforms" element={<CorporateIndustrialPage />} />
        <Route path="/corporate-industrial-uniforms/:section" element={<CorporateIndustrialPage />} />
        <Route path="/sports-wear-t-shirts" element={<SportsWearPage />} />
        <Route path="/sports-wear-t-shirts/:section" element={<SportsWearPage />} />
        <Route path="/dealers-retailers" element={<DealersPage />} />
        <Route path="/dealers-retailers/:section" element={<DealersPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/contact-us/:section" element={<ContactPage />} />
        <Route path="/manufacturing-process" element={<ManufacturingPage />} />
        <Route path="/manufacturing-process/:section" element={<ManufacturingPage />} />
        <Route path="/digital-catalog" element={<CatalogPage />} />
        <Route path="/digital-catalog/:section" element={<CatalogPage />} />
        <Route path="/catalog/:slug" element={<CatalogCategoryPage />} />
        <Route path="/showcase" element={<ShowcasePage />} />
        <Route path="/showcase/:category" element={<ShowcaseCategoryPage />} />
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
