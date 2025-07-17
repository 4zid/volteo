"use client"

import { useEffect, useMemo, useState } from "react"
import { MenuItem } from "@/components/menu-item"
import { CartSidebar } from "@/components/cart-sidebar"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface Product {
  id: string
  name: string
  description: string
  type: string
  price: number
  image: string
  stock: number
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  const types = useMemo(() => Array.from(new Set(products.map(p => p.type))), [products])

  const filtered = products.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase())) &&
    (typeFilter ? p.type === typeFilter : true)
  )

  const [cartItems, setCartItems] = useLocalStorage<Product[]>("cart", [])

  const addToCart = (item: Product) => {
    setCartItems(prev => [...prev, { ...item, id: `${item.id}-${Date.now()}` }])
  }

  const removeFromCart = (idToRemove: string) => {
    setCartItems(prev => prev.filter(item => item.id !== idToRemove))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-400 text-white py-16 mb-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow">Volteo</h1>
          <p className="text-xl mb-6">La mejor tienda de cables y conectividad</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 rounded text-black w-full sm:w-80"
            />
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="px-4 py-2 rounded text-black w-full sm:w-60"
            >
              <option value="">Todos los tipos</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <main className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
        {loading ? (
          <div className="col-span-full text-center text-lg">Cargando productos...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center text-lg">No se encontraron productos</div>
        ) : (
          filtered.map(item => (
            <MenuItem key={item.id} item={item} onAddToCart={addToCart} />
          ))
        )}
      </main>

      <CartSidebar cartItems={cartItems} onRemoveFromCart={removeFromCart} whatsappNumber="542964561030" />
    </div>
  )
}
