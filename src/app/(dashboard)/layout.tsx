'use client'

// MUI Imports
import { useEffect, useState } from 'react'

// import { useRouter } from 'next/navigation'

import Button from '@mui/material/Button'

// Type Imports
import type { ChildrenType } from '@core/types'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'
import HorizontalLayout from '@layouts/HorizontalLayout'

// Component Imports
import Providers from '@components/Providers'
import Navigation from '@components/layout/vertical/Navigation'
import Header from '@components/layout/horizontal/Header'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import HorizontalFooter from '@components/layout/horizontal/Footer'
import ScrollToTop from '@core/components/scroll-to-top'

// Util Imports
import { getMode, getSystemMode } from '@core/utils/serverHelpers'


import { isLogin } from '@/utils/login'

const Layout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'
  const mode = getMode()
  const systemMode = getSystemMode()
  const [isLoginData, setIsLogin] = useState<any>('loading')

  //const router = useRouter()

  useEffect(() => {
    // Function to fetch all data and set it in state
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

  if(isLoginData === "loading") {
    return <div>Loading...</div>
  }

  // if (!isLoginData) {
  //   router.push('/login')
  //
  //   return <div>Loading...</div>
  //
  // } else{
    return (
      <Providers direction={direction}>
        <LayoutWrapper
          systemMode={systemMode}
          verticalLayout={
            <VerticalLayout
              navigation={<Navigation mode={mode} systemMode={systemMode} />}
              navbar={<Navbar />}
              footer={<VerticalFooter />}
            >
              {children}
            </VerticalLayout>
          }
          horizontalLayout={
            <HorizontalLayout
              header={<Header />}
              footer={<HorizontalFooter />}>
              {children}
            </HorizontalLayout>
          }
        />
        <ScrollToTop className='mui-fixed'>
          <Button variant='contained' className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'>
            <i className='tabler-arrow-up' />
          </Button>
        </ScrollToTop>
      </Providers>
    )

  // }
}

export default Layout
