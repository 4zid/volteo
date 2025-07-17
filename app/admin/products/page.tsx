"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  type: string
  price: number
  stock: number
  image: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Link href="/admin/products/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Nuevo producto</Link>
      </div>
      <input
        type="text"
        placeholder="Buscar por nombre o tipo..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border px-3 py-2 rounded w-full md:w-1/3"
      />
      {loading ? (
        <div>Cargando productos...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Imagen</th>
                <th className="py-2 px-4 text-left">Nombre</th>
                <th className="py-2 px-4 text-left">Tipo</th>
                <th className="py-2 px-4 text-left">Precio</th>
                <th className="py-2 px-4 text-left">Stock</th>
                <th className="py-2 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-6">No hay productos</td></tr>
              ) : (
                filtered.map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    </td>
                    <td className="py-2 px-4 font-semibold">{product.name}</td>
                    <td className="py-2 px-4">{product.type}</td>
                    <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                    <td className="py-2 px-4">{product.stock}</td>
                    <td className="py-2 px-4">
                      <Link href={`/admin/products/${product.id}/edit`} className="text-blue-600 hover:underline mr-2">Editar</Link>
                      <button className="text-red-600 hover:underline">Eliminar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
} 