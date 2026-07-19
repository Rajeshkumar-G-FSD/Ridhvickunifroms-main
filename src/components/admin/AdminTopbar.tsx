import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, LayoutDashboard, Package, Settings } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { useAdminUi } from '../../contexts/AdminUiContext';
import { getDisplayNameFromEmail, getInitial, getTimeGreeting } from '../../lib/adminUi';

const MOBILE_NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package, end: false },
  { to: '/admin/settings', label: 'Settings', icon: Settings, end: false },
];

export default function AdminTopbar() {
  const { user } = useAdminAuth();
  const { searchQuery, setSearchQuery, searchPlaceholder } = useAdminUi();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const displayName = getDisplayNameFromEmail(user?.email);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-brand-border/15">
      <div className="h-16 px-4 sm:px-6 flex items-center gap-4">
        <div className="flex-1 min-w-0 max-w-md flex items-center gap-2 border border-brand-border/25 rounded-lg h-10 px-3 bg-brand-light/40">
          <Search className="w-4 h-4 text-brand-muted shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full h-full outline-none text-sm font-sans text-brand-blue bg-transparent placeholder:text-brand-muted"
          />
        </div>

        <div className="flex-1" />

        <div className="hidden sm:flex flex-col items-end leading-tight">
          <span className="text-sm font-headline font-bold text-brand-blue">
            {getTimeGreeting(now)}, {displayName}
          </span>
          <span className="text-[11px] text-brand-muted font-sans">{user?.email}</span>
        </div>

        <div className="w-9 h-9 rounded-full bg-brand-blue text-white flex items-center justify-center font-headline font-bold text-sm shrink-0">
          {getInitial(user?.email)}
        </div>
      </div>

      {/* Mobile nav (sidebar is desktop-only) */}
      <nav className="lg:hidden flex items-center gap-1 px-3 pb-2 overflow-x-auto">
        {MOBILE_NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 h-9 rounded-lg text-xs font-headline font-semibold whitespace-nowrap transition-colors ${
                isActive ? 'bg-brand-blue text-white' : 'text-brand-muted hover:bg-brand-light'
              }`
            }
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
