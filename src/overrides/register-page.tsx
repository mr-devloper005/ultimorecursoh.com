import Image from 'next/image'
import { Sparkles, ShieldCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { RegisterForm } from '@/components/auth/register-form'
import { SITE_CONFIG } from '@/lib/site-config'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

const gridPattern =
  'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'

export function RegisterPageOverride() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#004040] text-white">
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: gridPattern, backgroundSize: '32px 32px' }} />
      <div className="relative">
        <NavbarShell />
        <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
            <div className="flex flex-col justify-center rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:p-10">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white p-2 shadow-lg">
                  <Image
                    src="/favicon.png"
                    alt=""
                    width={72}
                    height={72}
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff8c00]">Onboarding</p>
                  <p className="text-sm text-teal-200/90">Create your {SITE_CONFIG.name} profile</p>
                </div>
              </div>
              <h1 className="mt-6 text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl">Open an account in a few minutes</h1>
              <p className="mt-4 text-sm leading-relaxed text-teal-100/90">
                We only ask for basics so you can explore the PDF and profile experience. You can expand details any time as your needs grow.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-teal-50/95">
                {[
                  'Checklist-driven flows that mirror the homepage look and feel',
                  'Name and email are enough to generate your first local workspace',
                  'Upgrade paths later when you are ready to formalize a project',
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8c00]" />
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-8 flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-teal-100/85">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8c00]" />
                This is a client-side demo: nothing here replaces enterprise SSO or your own compliance review for production use.
              </p>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-8 text-card-foreground shadow-xl lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#ff8c00]">Get started</p>
              <p className="mt-2 text-lg font-semibold text-primary">Sign up with email</p>
              <div className="mt-8">
                <RegisterForm />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
