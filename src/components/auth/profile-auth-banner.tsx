'use client'

import { useAuth } from '@/lib/auth-context'

export function ProfileAuthBanner() {
  const { isAuthenticated, user } = useAuth()
  if (!isAuthenticated || !user) return null
  return (
    <div
      role="status"
      className="mb-6 rounded-2xl border border-[#e67e00]/40 bg-[#ff8c00] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm"
    >
      Welcome back{user.name ? `, ${user.name}` : ''}. You are signed in—your session is saved on this device.
    </div>
  )
}
