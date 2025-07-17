"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewProductPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [stock, setStock] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!name || !type || !price || !stock || !image) {
      setError("Completa todos los campos obligatorios")
      return
    }
    setLoading(true)
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        type,
        price: parseFloat(price),
        image,
        stock: parseInt(stock, 10),
      }),
    })
    setLoading(false)
    if (res.ok) {
      router.push("/admin/products")
    } else {
      setError("Error al crear el producto")
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Nuevo producto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre*"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Tipo* (ej: HDMI, USB, etc.)"
          value={type}
          onChange={e => setType(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Precio*"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="border rounded px-3 py-2"
          min="0"
          step="0.01"
        />
        <input
          type="text"
          placeholder="URL de imagen*"
          value={image}
          onChange={e => setImage(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Stock*"
          value={stock}
          onChange={e => setStock(e.target.value)}
          className="border rounded px-3 py-2"
          min="0"
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Crear producto"}
        </button>
      </form>
    </div>
  )
} 