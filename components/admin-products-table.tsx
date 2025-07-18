"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminProductsTable({ products }: { products: any[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (confirm("¿Seguro que quieres eliminar este producto?")) {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      router.refresh();
    }
  }

  return (
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
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6">
                No hay productos
              </td>
            </tr>
          ) : (
            products.map((product: any) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 font-semibold">{product.name}</td>
                <td className="py-2 px-4">{product.type}</td>
                <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 