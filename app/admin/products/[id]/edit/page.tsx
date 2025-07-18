import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { redirect } from 'next/navigation'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'volteo_super_secreto_2024')

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_token')?.value

  if (!token) {
    redirect('/admin/login')
  }

  try {
    await jwtVerify(token, JWT_SECRET)
  } catch {
    redirect('/admin/login')
  }

  const id = params?.id as string

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [stock, setStock] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setName(data.name || "")
        setDescription(data.description || "")
        setType(data.type || "")
        setPrice(data.price?.toString() || "")
        setImage(data.image || "")
        setStock(data.stock?.toString() || "")
        setLoadingData(false)
      })
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!name || !type || !price || !stock || !image) {
      setError("Completa todos los campos obligatorios")
      return
    }
    setLoading(true)
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
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
      setError("Error al actualizar el producto")
    }
  }

  if (loadingData) {
    return <div className="text-center py-12">Cargando datos del producto...</div>
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Editar producto</h1>
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
          {loading ? "Guardando..." : "Actualizar producto"}
        </button>
      </form>
    </div>
  )
} 