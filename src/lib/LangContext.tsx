'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Lang } from './content'

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  toggleLang: () => void
  isRTL: boolean
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  isRTL: false,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('lang', newLang)
    document.documentElement.setAttribute('lang', newLang)
    document.documentElement.setAttribute('dir', newLang === 'fa' ? 'rtl' : 'ltr')
    if (newLang === 'fa') {
      document.body.classList.add('fa')
    } else {
      document.body.classList.remove('fa')
    }
  }

  const toggleLang = () => setLang(lang === 'en' ? 'fa' : 'en')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved) setLang(saved)
  }, [])

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, isRTL: lang === 'fa' }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
