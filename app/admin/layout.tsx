import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-8">Volteo Admin</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="hover:underline">Resumen</Link>
          <Link href="/admin/products" className="hover:underline">Productos</Link>
        </nav>
        <div className="mt-auto pt-8 border-t">
          <form action="/api/admin/logout" method="POST">
            <button className="w-full bg-red-100 text-red-700 py-2 rounded hover:bg-red-200">Cerrar sesión</button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
} 