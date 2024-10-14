'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(typeof window !== 'undefined')
  }, [])

  useEffect(() => {
    if (mounted) {
      router.push('/form')
    }
  }, [mounted, router])

  return null
}

export default Page
