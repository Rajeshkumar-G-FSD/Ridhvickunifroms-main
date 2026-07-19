import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

interface AdminUiState {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchPlaceholder: string;
  setSearchPlaceholder: (value: string) => void;
}

const AdminUiContext = createContext<AdminUiState | null>(null);

export function AdminUiProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search catalog items');

  const value = useMemo(
    () => ({ searchQuery, setSearchQuery, searchPlaceholder, setSearchPlaceholder }),
    [searchQuery, searchPlaceholder]
  );

  return <AdminUiContext.Provider value={value}>{children}</AdminUiContext.Provider>;
}

export function useAdminUi() {
  const ctx = useContext(AdminUiContext);
  if (!ctx) throw new Error('useAdminUi must be used within AdminUiProvider');
  return ctx;
}

// Pages call this on mount to set the topbar search box's placeholder and
// clear any stale query left over from a previous page.
export function useAdminSearch(placeholder: string) {
  const { searchQuery, setSearchQuery, setSearchPlaceholder } = useAdminUi();

  useEffect(() => {
    setSearchPlaceholder(placeholder);
    setSearchQuery('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeholder]);

  return { searchQuery, setSearchQuery };
}
