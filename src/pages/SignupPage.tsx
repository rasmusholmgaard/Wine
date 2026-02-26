import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import TextInput from '../components/primitives/TextInput'

export default function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <AppShell>
      <div className="flex flex-col min-h-screen px-5 pt-16 pb-8">
        <div className="mb-10">
          <h1 className="font-display text-vino-3xl text-wine-red font-semibold">Vino</h1>
          <p className="text-vino-base text-charcoal-mid font-body mt-2">Opret din konto</p>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div>
            <label className="block text-vino-sm font-body font-medium text-charcoal-mid mb-2">
              Navn
            </label>
            <TextInput value={name} onChange={setName} placeholder="Dit navn" />
          </div>

          <div>
            <label className="block text-vino-sm font-body font-medium text-charcoal-mid mb-2">
              Email
            </label>
            <TextInput value={email} onChange={setEmail} placeholder="din@email.dk" />
          </div>

          <div>
            <label className="block text-vino-sm font-body font-medium text-charcoal-mid mb-2">
              Adgangskode
            </label>
            <TextInput value={password} onChange={setPassword} placeholder="••••••••" />
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 py-4 rounded-card bg-sage text-white font-body font-semibold text-vino-base hover:bg-sage-dark active:scale-[0.98] transition-[transform,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
            style={{ boxShadow: 'var(--shadow-vino-lg)' }}
          >
            Opret konto
          </button>

          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/auth/login')}
              className="text-vino-sm text-sage font-body hover:text-sage-dark transition-[color] duration-200"
            >
              Har du allerede en konto? Log ind her
            </button>
          </div>
        </div>

        <p className="text-vino-xs text-charcoal-soft font-body text-center mt-auto pt-4">
          Auth er en stub i prototypen
        </p>
      </div>
    </AppShell>
  )
}
