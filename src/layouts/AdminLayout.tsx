import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopbar from '../components/admin/AdminTopbar';
import { AdminUiProvider } from '../contexts/AdminUiContext';

export default function AdminLayout() {
  return (
    <AdminUiProvider>
      <div className="min-h-screen flex bg-[#f8f9fa]">
        <AdminSidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <AdminTopbar />
          <main className="flex-1 px-4 sm:px-6 py-6 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminUiProvider>
  );
}
