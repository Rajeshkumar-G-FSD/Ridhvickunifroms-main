import { FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, Link2, Loader2, Plus, Trash2 } from 'lucide-react';
import { CatalogItemInput } from '../../types';
import { createCatalogItem, getCatalogItem, updateCatalogItem } from '../../lib/catalogService';
import { CATEGORY_PAGES } from '../../data/categoryPages';

const looksLikeUrl = (value: string) => /^https?:\/\/.+/i.test(value.trim());

export default function AdminProductFormPage() {
  const { id } = useParams<{ id?: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [isLoadingItem, setIsLoadingItem] = useState(isEditMode);
  const [notFound, setNotFound] = useState(false);

  const [category, setCategory] = useState(CATEGORY_PAGES[0].slug);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlDraft, setImageUrlDraft] = useState('');
  const [imageUrlError, setImageUrlError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setIsLoadingItem(true);
    getCatalogItem(id).then((item) => {
      if (cancelled) return;
      if (!item) {
        setNotFound(true);
      } else {
        setCategory(item.category);
        setName(item.name);
        setTitle(item.title);
        setDescription(item.description);
        setImages(item.images);
      }
      setIsLoadingItem(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleAddImageUrl = () => {
    const url = imageUrlDraft.trim();
    if (!url) return;
    if (!looksLikeUrl(url)) {
      setImageUrlError('Enter a valid http(s) image URL.');
      return;
    }
    if (images.includes(url)) {
      setImageUrlError('That image URL is already added.');
      return;
    }
    setImages((prev) => [...prev, url]);
    setImageUrlDraft('');
    setImageUrlError('');
  };

  const handleImageUrlKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddImageUrl();
    }
  };

  const handleRemoveImage = (url: string) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim()) {
      setError('Name and title are required.');
      return;
    }
    setError('');
    setIsSaving(true);
    const input: CatalogItemInput = {
      category,
      name: name.trim(),
      title: title.trim(),
      description: description.trim(),
      images,
    };
    try {
      if (isEditMode && id) {
        await updateCatalogItem(id, input);
      } else {
        await createCatalogItem(input);
      }
      navigate('/admin/products');
    } catch (err) {
      console.error('Catalog item save failed:', err);
      setError('Could not save this item. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (notFound) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-brand-muted font-sans">That catalog item couldn't be found.</p>
        <Link to="/admin/products" className="text-sm text-brand-blue font-headline font-bold mt-2 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-headline font-black text-brand-blue">
            {isEditMode ? 'Edit Product' : 'Add Product'}
          </h1>
          <div className="flex items-center gap-1.5 text-[11px] font-sans text-brand-muted mt-1">
            <Link to="/admin" className="hover:text-brand-blue transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/admin/products" className="hover:text-brand-blue transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-blue">{isEditMode ? 'Edit Product' : 'Add Product'}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="h-10 px-4 border border-brand-border/30 text-brand-blue font-headline font-bold rounded-lg hover:bg-brand-light transition-colors text-xs"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={isSaving || isLoadingItem}
            className="h-10 px-5 flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-light disabled:opacity-60 text-white font-headline font-bold rounded-lg transition-colors text-xs"
          >
            {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {isEditMode ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>

      {isLoadingItem ? (
        <p className="text-sm text-brand-muted font-sans">Loading product…</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* Left column */}
          <div className="bg-white rounded-xl border border-brand-border/20 p-5 sm:p-6 flex flex-col gap-4">
            <h2 className="text-sm font-headline font-black text-brand-blue">General Information</h2>

            <div>
              <label className="text-xs font-headline font-bold text-brand-blue uppercase tracking-wider">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tailored Academy Blazer"
                className="mt-1.5 w-full h-11 px-3 border border-brand-border/30 rounded-lg outline-none text-sm font-sans text-brand-blue focus:border-brand-blue transition-colors"
                required
              />
            </div>

            <div>
              <label className="text-xs font-headline font-bold text-brand-blue uppercase tracking-wider">
                Display Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title shown to customers"
                className="mt-1.5 w-full h-11 px-3 border border-brand-border/30 rounded-lg outline-none text-sm font-sans text-brand-blue focus:border-brand-blue transition-colors"
                required
              />
            </div>

            <div>
              <label className="text-xs font-headline font-bold text-brand-blue uppercase tracking-wider">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description"
                rows={6}
                className="mt-1.5 w-full px-3 py-2.5 border border-brand-border/30 rounded-lg outline-none text-sm font-sans text-brand-blue focus:border-brand-blue transition-colors resize-none"
              />
            </div>

            {error && <p className="text-xs text-red-500 font-sans">{error}</p>}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-brand-border/20 p-5 sm:p-6 flex flex-col gap-3">
              <h2 className="text-sm font-headline font-black text-brand-blue">Product Media</h2>
              <p className="text-[11px] text-brand-muted font-sans">
                Upload the image anywhere (e.g. imgbb.com) and paste the direct link.
              </p>

              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 border border-brand-border/30 rounded-lg px-3 h-10 focus-within:border-brand-blue transition-colors">
                  <Link2 className="w-4 h-4 text-brand-muted shrink-0" />
                  <input
                    type="url"
                    value={imageUrlDraft}
                    onChange={(e) => {
                      setImageUrlDraft(e.target.value);
                      setImageUrlError('');
                    }}
                    onKeyDown={handleImageUrlKeyDown}
                    placeholder="https://example.com/image.jpg"
                    className="w-full h-full outline-none text-xs font-sans text-brand-blue bg-transparent"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="h-10 px-3 flex items-center gap-1 bg-brand-blue hover:bg-brand-blue-light text-white text-xs font-headline font-bold rounded-lg transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              {imageUrlError && <p className="text-[11px] text-red-500 font-sans">{imageUrlError}</p>}

              {images.length > 0 && (
                <div className="flex flex-wrap gap-2.5 mt-1">
                  {images.map((url) => (
                    <div key={url} className="relative w-16 h-16 rounded-lg overflow-hidden border border-brand-border/20 group bg-brand-light">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(url)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-brand-border/20 p-5 sm:p-6 flex flex-col gap-2">
              <h2 className="text-sm font-headline font-black text-brand-blue">Category</h2>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full h-11 px-3 border border-brand-border/30 rounded-lg outline-none text-sm font-sans text-brand-blue focus:border-brand-blue transition-colors bg-white"
                required
              >
                {CATEGORY_PAGES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-brand-muted font-sans">
                Also appears in the homepage's "Explore Sizing &amp; Fabrics" catalog under this category.
              </p>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
