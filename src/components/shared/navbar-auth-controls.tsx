'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={logout}
      className="h-10 shrink-0 gap-2 rounded-full border border-current/25 bg-current/5 px-2.5 pl-1.5 pr-3 text-inherit hover:bg-current/10"
      aria-label={`Sign out ${user?.name || ''}`.trim()}
    >
      <Avatar className="h-8 w-8 border border-current/20">
        <AvatarImage src={user?.avatar} alt="" />
        <AvatarFallback className="bg-[#ff8c00] text-sm font-bold text-white">{user?.name?.charAt(0) ?? '?'}</AvatarFallback>
      </Avatar>
      <LogOut className="h-4 w-4 shrink-0 text-current" aria-hidden />
      <span className="text-xs font-semibold sm:text-sm">Sign out</span>
    </Button>
  )
}
