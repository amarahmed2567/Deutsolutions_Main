import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function useScrollReveal({ selector = '[data-reveal]', start = 'top 80%', once = true } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const ctx = gsap.context(() => {
      const items = Array.from(ref.current.querySelectorAll(selector))
      if (!items.length) return

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start,
            once,
          },
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [once, selector, start])

  return ref
}

export default useScrollReveal
