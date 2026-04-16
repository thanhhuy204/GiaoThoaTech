'use client'

import { useEffect } from 'react'

/**
 * Global scroll-reveal initialiser.
 * Observes all elements with class: reveal | reveal-left | reveal-right | reveal-scale | reveal-pop | reveal-stagger
 * Adds .in-view when they enter the viewport, triggering CSS transitions defined in globals.css.
 */
export default function ScrollRevealInit() {
  useEffect(() => {
    const SELECTORS = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-pop, .reveal-stagger'

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            // unobserve after reveal so it stays visible on scroll up
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -56px 0px',
      }
    )

    const observe = () => {
      document.querySelectorAll<Element>(SELECTORS).forEach((el) => observer.observe(el))
    }

    observe()

    // Re-observe after route changes (Next.js app router)
    const mutationObserver = new MutationObserver(observe)
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}
