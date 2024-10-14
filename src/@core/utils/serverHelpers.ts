// Next Imports
import Cookies from 'js-cookie';

// Type Imports
import type { Settings } from '@core/contexts/settingsContext'
import type { SystemMode } from '@core/types'

// Config Imports
import themeConfig from '@configs/themeConfig'

export const getSettingsFromCookie = (): Settings => {
  const cookieName = themeConfig.settingsCookieName;
  const cookieValue = Cookies.get(cookieName);

  return JSON.parse(cookieValue || '{}');
};

export const getMode = () => {
  const settingsCookie = getSettingsFromCookie()

  // Get mode from cookie or fallback to theme config
  return settingsCookie.mode || themeConfig.mode
}

export const getSystemMode = (): SystemMode => {
  const mode = getMode()

  const colorPrefCookie = Cookies.get('colorPref') as SystemMode || 'light'

  return (mode === 'system' ? colorPrefCookie : (mode === 'dark' ? 'dark' : 'light'))
}
