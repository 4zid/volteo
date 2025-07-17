"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2 } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price?: number
}

interface CartSidebarProps {
  cartItems: CartItem[]
  onRemoveFromCart: (id: string) => void
  whatsappNumber: string
}

export function CartSidebar({ cartItems, onRemoveFromCart, whatsappNumber }: CartSidebarProps) {
  const generateWhatsAppLink = () => {
    if (cartItems.length === 0) {
      return "#"
    }

    const itemsList = cartItems
      .map((item) => `- ${item.name}${item.price !== undefined ? ` ($${item.price.toFixed(2)})` : ""}`)
      .join("\n")
    const message = encodeURIComponent(`Hola, quiero pedir:\n${itemsList}`)
    return `https://wa.me/${whatsappNumber}?text=${message}`
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 right-4 z-50 rounded-full p-4 shadow-lg bg-transparent">
          🛒 ({cartItems.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Tu Carrito</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 py-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground">El carrito está vacío.</p>
          ) : (
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between rounded-md bg-muted p-2">
                  <span>
                    {item.name}
                    {item.price !== undefined && (
                      <span className="text-sm text-muted-foreground"> (${item.price.toFixed(2)})</span>
                    )}
                  </span>
                  <Button variant="ghost" size="icon" onClick={() => onRemoveFromCart(item.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Eliminar {item.name}</span>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
        <SheetFooter className="mt-auto border-t pt-4">
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button asChild className="w-full" disabled={cartItems.length === 0}>
            <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              Enviar por WhatsApp
            </a>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
