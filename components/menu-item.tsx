"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  id: string
  name: string
  description: string
  type: string
  price: number
  image: string
  stock: number
}

interface MenuItemProps {
  item: Product
  onAddToCart: (item: Product) => void
}

export function MenuItem({ item, onAddToCart }: MenuItemProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <div className="text-sm text-gray-500 mt-1">{item.type}</div>
      </CardHeader>
      <CardContent>
        <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded mb-2" />
        <p className="text-gray-700 text-sm mb-2 line-clamp-2">{item.description}</p>
        <p className="text-lg font-semibold mb-1">${item.price.toFixed(2)}</p>
        <p className={`text-xs ${item.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>{item.stock > 0 ? `Stock: ${item.stock}` : 'Sin stock'}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onAddToCart(item)} className="w-full" disabled={item.stock === 0}>
          {item.stock === 0 ? 'Sin stock' : 'Agregar'}
        </Button>
      </CardFooter>
    </Card>
  )
}
