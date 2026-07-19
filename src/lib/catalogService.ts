import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { CatalogItem, CatalogItemInput, Product } from '../types';
import { getCategoryPage } from '../data/categoryPages';

const CATALOG_COLLECTION = 'catalogItems';

// Admin-managed catalog items are simpler than the static Product catalog
// (no price/sizes/material), so they're given sensible defaults when merged
// into the homepage's "Explore Sizing & Fabrics" product grid.
export function catalogItemToProduct(item: CatalogItem): Product {
  return {
    id: item.id,
    name: item.name,
    category: item.category as Product['category'],
    categoryLabel: getCategoryPage(item.category)?.label ?? item.category,
    priceEstimate: 'Contact for Quote',
    image: item.images[0] ?? '/images/ridhvick_logo.jpeg',
    description: item.description,
    features: [],
    sizes: ['One Size'],
    material: 'Premium Fabric Blend',
  };
}

export function subscribeToCatalogItems(
  onChange: (items: CatalogItem[]) => void,
  onError?: (error: Error) => void
) {
  const q = query(collection(db, CATALOG_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          category: data.category ?? '',
          name: data.name ?? '',
          title: data.title ?? '',
          description: data.description ?? '',
          images: data.images ?? [],
          createdAt: data.createdAt?.toMillis?.() ?? 0,
          updatedAt: data.updatedAt?.toMillis?.() ?? 0,
        } satisfies CatalogItem;
      });
      onChange(items);
    },
    (error) => onError?.(error)
  );
}

export async function getCatalogItem(id: string): Promise<CatalogItem | null> {
  const snapshot = await getDoc(doc(db, CATALOG_COLLECTION, id));
  if (!snapshot.exists()) return null;
  const data = snapshot.data();
  return {
    id: snapshot.id,
    category: data.category ?? '',
    name: data.name ?? '',
    title: data.title ?? '',
    description: data.description ?? '',
    images: data.images ?? [],
    createdAt: data.createdAt?.toMillis?.() ?? 0,
    updatedAt: data.updatedAt?.toMillis?.() ?? 0,
  } satisfies CatalogItem;
}

export async function createCatalogItem(input: CatalogItemInput): Promise<string> {
  const docRef = await addDoc(collection(db, CATALOG_COLLECTION), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateCatalogItem(id: string, input: CatalogItemInput): Promise<void> {
  await updateDoc(doc(db, CATALOG_COLLECTION, id), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCatalogItem(item: CatalogItem): Promise<void> {
  await deleteDoc(doc(db, CATALOG_COLLECTION, item.id));
}
