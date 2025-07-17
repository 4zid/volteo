import { PrismaClient } from '@prisma/client'

async function getSummary() {
  const prisma = new PrismaClient()
  const total = await prisma.product.count()
  const stock = await prisma.product.aggregate({ _sum: { stock: true } })
  const outOfStock = await prisma.product.count({ where: { stock: 0 } })
  const mostExpensive = await prisma.product.findFirst({ orderBy: { price: 'desc' } })
  const cheapest = await prisma.product.findFirst({ orderBy: { price: 'asc' } })
  return { total, stock: stock._sum.stock || 0, outOfStock, mostExpensive, cheapest }
}

export default async function AdminDashboard() {
  const summary = await getSummary()
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Panel de control</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-6">
          <div className="text-2xl font-bold">{summary.total}</div>
          <div className="text-gray-600">Productos totales</div>
        </div>
        <div className="bg-white rounded shadow p-6">
          <div className="text-2xl font-bold">{summary.stock}</div>
          <div className="text-gray-600">Stock total</div>
        </div>
        <div className="bg-white rounded shadow p-6">
          <div className="text-2xl font-bold">{summary.outOfStock}</div>
          <div className="text-gray-600">Sin stock</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-6">
          <div className="text-gray-600 mb-2">Producto más caro</div>
          {summary.mostExpensive && (
            <div>
              <div className="font-bold">{summary.mostExpensive.name}</div>
              <div>${summary.mostExpensive.price.toFixed(2)}</div>
            </div>
          )}
        </div>
        <div className="bg-white rounded shadow p-6">
          <div className="text-gray-600 mb-2">Producto más barato</div>
          {summary.cheapest && (
            <div>
              <div className="font-bold">{summary.cheapest.name}</div>
              <div>${summary.cheapest.price.toFixed(2)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 