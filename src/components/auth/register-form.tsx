'use client'

import { type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const inputClass =
  'h-12 rounded-xl border-border bg-input text-foreground focus-visible:border-ring focus-visible:ring-[#ff8c00]/30'

export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Enter your name, email, and password.',
      })
      return
    }
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Passwords do not match',
        description: 'Re-enter the same password in both fields.',
      })
      return
    }
    await signup(name.trim(), email.trim(), password)
    toast({
      title: 'Account created',
      description: 'You are signed in on this device.',
      className: 'border-[#ff8c00] bg-[#ff8c00] text-white',
    })
    router.push('/profile')
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="register-name" className="text-primary">
          Full name
        </Label>
        <Input
          id="register-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder="Jane Doe"
          className={inputClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-email" className="text-primary">
          Work email
        </Label>
        <Input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="you@company.com"
          className={inputClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-password" className="text-primary">
          Password
        </Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="••••••••"
          className={inputClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-confirm" className="text-primary">
          Confirm password
        </Label>
        <Input
          id="register-confirm"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          placeholder="••••••••"
          className={inputClass}
        />
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 rounded-full bg-[#ff8c00] text-base font-bold uppercase tracking-wide text-white hover:bg-[#e67e00]"
      >
        {isLoading ? 'Creating account…' : 'Create account'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
