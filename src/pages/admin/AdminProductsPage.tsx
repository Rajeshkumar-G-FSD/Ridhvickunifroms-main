import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Plus, Trash2, X } from 'lucide-react';
import { CatalogItem } from '../../types';
import { deleteCatalogItem, subscribeToCatalogItems } from '../../lib/catalogService';
import { CATEGORY_PAGES, getCategoryPage } from '../../data/categoryPages';
import { useAdminSearch } from '../../contexts/AdminUiContext';

type SortOption = 'newest' | 'oldest' | 'name-asc';

const SORTERS: Record<SortOption, (a: CatalogItem, b: CatalogItem) => number> = {
  newest: (a, b) => b.createdAt - a.createdAt,
  oldest: (a, b) => a.createdAt - b.createdAt,
  'name-asc': (a, b) => a.name.localeCompare(b.name),
};

export default function AdminProductsPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showMissingImageOnly, setShowMissingImageOnly] = useState(false);
  const { searchQuery, setSearchQuery } = useAdminSearch('Search products by name, title, or category');

  useEffect(() => {
    const unsubscribe = subscribeToCatalogItems(
      (nextItems) => {
        setItems(nextItems);
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );
    return unsubscribe;
  }, []);

  const handleDelete = async (item: CatalogItem) => {
    if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    setDeletingId(item.id);
    try {
      await deleteCatalogItem(item);
    } finally {
      setDeletingId(null);
    }
  };

  const query = searchQuery.trim().toLowerCase();
  const visibleItems = items
    .filter((item) => selectedCategory === 'all' || item.category === selectedCategory)
    .filter((item) => !showMissingImageOnly || item.images.length === 0)
    .filter((item) =>
      !query ||
      [item.name, item.title, getCategoryPage(item.category)?.label ?? item.category]
        .join(' ')
        .toLowerCase()
        .includes(query)
    )
    .sort(SORTERS[sortBy]);

  const categoryCounts = CATEGORY_PAGES.map((c) => ({
    ...c,
    count: items.filter((item) => item.category === c.slug).length,
  }));

  const hasActiveFilters = selectedCategory !== 'all' || showMissingImageOnly || query.length > 0;

  const clearFilters = () => {
    setSelectedCategory('all');
    setShowMissingImageOnly(false);
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-headline font-black text-brand-blue">Products</h1>
          <p className="text-xs text-brand-muted font-sans mt-1">
            {isLoading ? 'Loading…' : `${visibleItems.length} of ${items.length} item${items.length === 1 ? '' : 's'}`}
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 h-10 px-4 bg-brand-blue hover:bg-brand-blue-light text-white font-headline font-bold rounded-lg transition-colors text-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-xl border border-brand-border/20 p-3 flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 h-8 rounded-full text-[11px] font-headline font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-brand-blue text-white'
                : 'bg-brand-light text-brand-muted hover:text-brand-blue'
            }`}
          >
            All ({items.length})
          </button>
          {categoryCounts.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSelectedCategory(c.slug)}
              className={`px-3 h-8 rounded-full text-[11px] font-headline font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === c.slug
                  ? 'bg-brand-blue text-white'
                  : 'bg-brand-light text-brand-muted hover:text-brand-blue'
              }`}
            >
              {c.label} ({c.count})
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-brand-border/10">
          <label className="flex items-center gap-2 text-xs font-sans text-brand-muted cursor-pointer">
            <input
              type="checkbox"
              checked={showMissingImageOnly}
              onChange={(e) => setShowMissingImageOnly(e.target.checked)}
              className="w-3.5 h-3.5 accent-brand-blue"
            />
            Missing image only
          </label>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs font-sans text-brand-muted">Sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-8 px-2.5 border border-brand-border/30 rounded-lg outline-none text-xs font-sans text-brand-blue bg-white"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name-asc">Name A–Z</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs font-headline font-bold text-brand-blue hover:text-brand-blue-light cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-brand-muted font-sans">Loading catalog…</p>
      ) : visibleItems.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-brand-border/30 rounded-xl bg-white">
          <p className="text-sm text-brand-muted font-sans">
            {items.length === 0 ? 'No catalog items yet. Add your first one.' : 'No items match your filters.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-brand-border/20 overflow-hidden shadow-sm flex flex-col"
            >
              <div className="h-40 bg-brand-light overflow-hidden">
                {item.images[0] ? (
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-muted text-xs font-sans">
                    No image
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col gap-1 flex-grow">
                <span className="text-[10px] font-headline font-bold text-brand-blue-light uppercase tracking-widest">
                  {getCategoryPage(item.category)?.label ?? item.category}
                </span>
                <h3 className="text-sm font-headline font-bold text-brand-blue">{item.title}</h3>
                <p className="text-xs text-brand-muted font-sans line-clamp-2 flex-grow">{item.description}</p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-brand-border/10">
                  <Link
                    to={`/admin/products/${item.id}/edit`}
                    className="flex-1 h-9 flex items-center justify-center gap-1.5 border border-brand-border/30 text-brand-blue text-xs font-headline font-bold rounded-lg hover:bg-brand-light transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={deletingId === item.id}
                    className="flex-1 h-9 flex items-center justify-center gap-1.5 border border-red-200 text-red-500 text-xs font-headline font-bold rounded-lg hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
