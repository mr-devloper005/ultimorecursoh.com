'use client'

import { type FormEvent, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SITE_CONFIG } from '@/lib/site-config'

const fieldClass =
  'h-12 rounded-xl border-border bg-input text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30'

export function ContactForm() {
  const { toast } = useToast()
  const { user, isAuthenticated } = useAuth()
  const [pending, setPending] = useState(false)
  const [resetTick, setResetTick] = useState(0)
  const autofillKey = isAuthenticated && user ? `signed-in-${user.id}` : 'guest'

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setPending(true)
    window.setTimeout(() => {
      setPending(false)
      toast({
        title: 'Message sent',
        description: `Thanks—we’ll reply within one business day. If you need anything sooner, you can also reach us at hello@${SITE_CONFIG.domain}.`,
        className: 'border-[#ff8c00] bg-[#ff8c00] text-white',
      })
      form.reset()
      setResetTick((n) => n + 1)
    }, 400)
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <div className="grid gap-2">
          <Label htmlFor="contact-name" className="text-primary">
            Full name
          </Label>
          <Input
            key={`${autofillKey}-${resetTick}-name`}
            id="contact-name"
            name="name"
            required
            defaultValue={isAuthenticated && user ? user.name : undefined}
            autoComplete="name"
            placeholder="Jane Doe"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-email" className="text-primary">
            Work email
          </Label>
          <Input
            key={`${autofillKey}-${resetTick}-email`}
            id="contact-email"
            name="email"
            type="email"
            required
            defaultValue={isAuthenticated && user ? user.email : undefined}
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClass}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-company" className="text-primary">
          Company <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Input id="contact-company" name="company" placeholder="Your organization" className={fieldClass} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-subject" className="text-primary">
          Topic
        </Label>
        <Input id="contact-subject" name="subject" required placeholder="PDF project, profile refresh, partnership…" className={fieldClass} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-message" className="text-primary">
          How can we help?
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          placeholder="Share timelines, file types, and what success looks like for you."
          className="min-h-[160px] rounded-2xl border-border bg-input py-3 text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
          rows={6}
        />
      </div>
      <Button
        type="submit"
        disabled={pending}
        className="h-12 rounded-full bg-[#ff8c00] text-base font-bold uppercase tracking-wide text-white hover:bg-[#e67e00] disabled:opacity-70"
      >
        {pending ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
