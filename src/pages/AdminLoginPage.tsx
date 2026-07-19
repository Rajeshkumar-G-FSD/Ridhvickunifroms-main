import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import AdminLoginModal from '../components/AdminLoginModal';

export default function AdminLoginPage() {
  const { user, isLoading } = useAdminAuth();
  const navigate = useNavigate();

  if (!isLoading && user) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      <AdminLoginModal
        isOpen
        onClose={() => navigate('/')}
        onSuccess={() => navigate('/admin', { replace: true })}
      />
    </div>
  );
}
