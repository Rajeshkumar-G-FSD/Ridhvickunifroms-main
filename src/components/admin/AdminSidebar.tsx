import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, ExternalLink, LogOut } from 'lucide-react';
import { logoutAdmin } from '../../lib/adminAuth';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package, end: false },
  { to: '/admin/settings', label: 'Settings', icon: Settings, end: false },
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 h-screen sticky top-0 bg-white border-r border-brand-border/15">
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-brand-border/15">
        <img
          src="/images/ridhvick_logo.jpeg"
          alt="Ridhvick Uniforms"
          className="w-8 h-8 rounded-full object-cover border-2 border-brand-yellow shrink-0"
        />
        <span className="text-sm font-headline font-black text-brand-blue leading-tight">
          Ridhvick
          <span className="block text-[10px] font-bold text-brand-muted tracking-widest uppercase">Admin</span>
        </span>
      </div>

      <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 h-11 rounded-lg text-sm font-headline font-semibold transition-colors ${
                isActive
                  ? 'bg-brand-blue text-white shadow-sm'
                  : 'text-brand-muted hover:bg-brand-light hover:text-brand-blue'
              }`
            }
          >
            <Icon className="w-[18px] h-[18px] shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-5 flex flex-col gap-1 border-t border-brand-border/15 pt-4">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3.5 h-11 rounded-lg text-sm font-headline font-semibold text-brand-muted hover:bg-brand-light hover:text-brand-blue transition-colors"
        >
          <ExternalLink className="w-[18px] h-[18px] shrink-0" />
          Visit Site
        </a>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3.5 h-11 rounded-lg text-sm font-headline font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer text-left"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
