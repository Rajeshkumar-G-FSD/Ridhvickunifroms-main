import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Layers, Plus, ImageOff } from 'lucide-react';
import { CatalogItem } from '../../types';
import { subscribeToCatalogItems } from '../../lib/catalogService';
import { CATEGORY_PAGES, getCategoryPage } from '../../data/categoryPages';
import { formatRelativeTime } from '../../lib/adminUi';

export default function AdminOverviewPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToCatalogItems(
      (next) => {
        setItems(next);
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );
    return unsubscribe;
  }, []);

  const categoryCounts = CATEGORY_PAGES.map((c) => ({
    ...c,
    count: items.filter((item) => item.category === c.slug).length,
  }));
  const categoriesCovered = categoryCounts.filter((c) => c.count > 0).length;
  const recentItems = items.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-headline font-black text-brand-blue">Dashboard</h1>
          <p className="text-xs text-brand-muted font-sans mt-1">Live overview of your catalog.</p>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 h-10 px-4 bg-brand-blue hover:bg-brand-blue-light text-white font-headline font-bold rounded-lg transition-colors text-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-brand-border/20 p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-brand-blue" />
          </div>
          <div>
            <p className="text-2xl font-headline font-black text-brand-blue">
              {isLoading ? '—' : items.length}
            </p>
            <p className="text-xs text-brand-muted font-sans">Total Catalog Items</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-brand-border/20 p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-brand-yellow/20 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5 text-brand-blue" />
          </div>
          <div>
            <p className="text-2xl font-headline font-black text-brand-blue">
              {isLoading ? '—' : `${categoriesCovered} / ${CATEGORY_PAGES.length}`}
            </p>
            <p className="text-xs text-brand-muted font-sans">Categories With Items</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Items per category */}
        <div className="bg-white rounded-xl border border-brand-border/20 p-5">
          <h2 className="text-sm font-headline font-black text-brand-blue mb-4">Items by Category</h2>
          <div className="flex flex-col gap-3">
            {categoryCounts.map((c) => {
              const max = Math.max(...categoryCounts.map((x) => x.count), 1);
              return (
                <div key={c.slug} className="flex items-center gap-3">
                  <span className="text-xs font-sans text-brand-muted w-36 shrink-0 truncate">{c.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-brand-light overflow-hidden">
                    <div
                      className="h-full bg-brand-blue rounded-full transition-all"
                      style={{ width: `${(c.count / max) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-headline font-bold text-brand-blue w-5 text-right shrink-0">
                    {c.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recently added */}
        <div className="bg-white rounded-xl border border-brand-border/20 p-5">
          <h2 className="text-sm font-headline font-black text-brand-blue mb-4">Recently Added</h2>
          {isLoading ? (
            <p className="text-xs text-brand-muted font-sans">Loading…</p>
          ) : recentItems.length === 0 ? (
            <p className="text-xs text-brand-muted font-sans">No catalog items yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recentItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/admin/products/${item.id}/edit`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-light overflow-hidden shrink-0 flex items-center justify-center">
                    {item.images[0] ? (
                      <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ImageOff className="w-4 h-4 text-brand-muted" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-headline font-bold text-brand-blue truncate group-hover:text-brand-blue-light">
                      {item.title || item.name}
                    </p>
                    <p className="text-[11px] text-brand-muted font-sans truncate">
                      {getCategoryPage(item.category)?.label ?? item.category}
                    </p>
                  </div>
                  <span className="text-[11px] text-brand-muted font-sans shrink-0">
                    {formatRelativeTime(item.createdAt)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
