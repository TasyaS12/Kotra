'use client'

// React Imports
import { useEffect, useRef } from 'react'


// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import { useSettings } from '@core/hooks/useSettings'



const Logo = () => {
  // Refs
  const logoTextRef = useRef<HTMLImageElement>(null)

  // Hooks
  const { isHovered, isBreakpointReached } = useVerticalNav()
  const { settings } = useSettings()

  // Vars
  const { layout } = settings

  useEffect(() => {
    if (layout !== 'collapsed') {
      return
    }

    if (logoTextRef && logoTextRef.current) {
      if (!isBreakpointReached && layout === 'collapsed' && !isHovered) {
        logoTextRef.current?.classList.add('hidden')
      } else {
        logoTextRef.current.classList.remove('hidden')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, layout, isBreakpointReached])

  return (
    <div className='flex items-center'>
      <img
        ref={logoTextRef}
        alt="Logo"
        className="h-10"
        height="100"
        src="/kotralogo.svg"
        width="150"
      />
    </div>
  )
}

export default Logo
