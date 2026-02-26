import { type ReactNode, useRef, useEffect } from 'react'

interface StepTransitionProps {
  stepKey: string
  direction: 'forward' | 'back'
  children: ReactNode
}

export default function StepTransition({ stepKey, direction, children }: StepTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cls = direction === 'back' ? 'slide-in-left' : 'slide-in-right'
    el.classList.add(cls)
    const timer = setTimeout(() => el.classList.remove(cls), 350)
    return () => clearTimeout(timer)
  }, [stepKey, direction])

  return (
    <div ref={ref} key={stepKey} className="flex-1 flex flex-col">
      {children}
    </div>
  )
}
