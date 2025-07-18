import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { redirect } from 'next/navigation'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'volteo_super_secreto_2024')

export default async function NewProductPage() {
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

  // ...el resto del formulario de creación...
} 