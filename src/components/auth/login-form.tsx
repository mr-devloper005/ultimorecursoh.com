'use client'

import { type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Enter both email and password.',
      })
      return
    }
    await login(email.trim(), password)
    toast({
      title: 'Signed in successfully',
      description: 'Your session is saved on this device.',
      className: 'border-[#ff8c00] bg-[#ff8c00] text-white',
    })
    router.push('/profile')
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="login-email" className="text-primary">
          Email
        </Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="you@company.com"
          className="h-12 rounded-xl border-border bg-input text-foreground focus-visible:border-ring focus-visible:ring-[#ff8c00]/30"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="login-password" className="text-primary">
          Password
        </Label>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="••••••••"
          className="h-12 rounded-xl border-border bg-input text-foreground focus-visible:border-ring focus-visible:ring-[#ff8c00]/30"
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 rounded-full bg-[#ff8c00] text-base font-bold uppercase tracking-wide text-white hover:bg-[#e67e00]"
      >
        {isLoading ? 'Signing in…' : 'Sign in'}
      </Button>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <Link href="/forgot-password" className="font-medium hover:text-foreground hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Create account
        </Link>
      </div>
    </form>
  )
}
