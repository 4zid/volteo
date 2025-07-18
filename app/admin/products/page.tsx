import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { redirect } from 'next/navigation'
import AdminProductsTable from '@/components/admin-products-table'
import Link from 'next/link'
import { headers } from 'next/headers'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'volteo_super_secreto_2024')

async function getProducts() {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/products`, {
    cache: 'no-store',
    headers: {
      cookie: headersList.get('cookie') || '',
    },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    redirect('/admin/login')
  }

  try {
    await jwtVerify(token, JWT_SECRET)
  } catch {
    redirect('/admin/login')
  }

  const products = await getProducts()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link href="/admin/products/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Nuevo producto</Link>
      </div>
      <AdminProductsTable products={products} />
    </div>
  )
} 