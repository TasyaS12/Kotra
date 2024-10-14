'use client'

// Import necessary modules
import { useEffect } from 'react';

import { useRouter } from 'next/navigation'

import { logout } from '@/utils/login'

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout();
        router.push('/login'); // Redirect to login page after successful logout
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    doLogout();
  }, [router]);

  return null; // Render nothing
};

export default Logout;
