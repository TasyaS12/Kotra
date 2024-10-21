'use client'

// Component Imports
import { useEffect, useState } from 'react'

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

  const [isLoginData, setIsLogin] = useState<any>('loading')

  const router = useRouter()

  useEffect(() => {
    const isLogins = async () => {
      try {
        const dataLogin = await isLogin()

        setIsLogin(dataLogin)

        return dataLogin
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLogin(false)

        return false
      }
    };

    isLogins()
  }, [])

  if(isLoginData === "loading"){
    return <div>Loading...</div>
  }

  if(isLoginData) {
    console.log(isLoginData)
    router.push('/home')

    return <div>Loading...</div>
  }else{
    console.log(isLoginData)

    return <Login mode={mode} />
  }
}

export default LoginPage
