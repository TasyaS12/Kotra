'use client'

// Component Imports
import { useRouter } from 'next/navigation'

import Login from '@views/Login'

// Server Action Imports
import { getMode } from '@core/utils/serverHelpers'
import { isLogin } from '@/utils/login'


const LoginPage = () => {

  // Vars
  let mode = getMode()

  if (mode === 'system') {
    mode = 'light'
  }

  const router = useRouter()

  if(isLogin()) {
    router.push('/home')
  }

  return <Login mode={mode} />
}

export default LoginPage
