// Type Imports
import Head from "next/head";

import { IconBrandYoutube, IconBrandFacebook, IconBrandTwitter, IconBrandTiktok, IconBrandInstagram } from '@tabler/icons-react';

import type { ChildrenType } from '@core/types';

// Util Imports

const Layout = async ({ children }: ChildrenType) => {
  // Vars

  return (
    <>
      <header className="w-full py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex pl-8 items-center">
            <img
              alt="KOTRA logo"
              className="h-10 w-auto"  // Ensure the image scales properly with w-auto
              src="/kotralogo.svg"
            />
          </div>
        </div>
      </header>

      <Head>
        <title>Company Data Form</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>

      {children}

      <footer className="w-full bg-blue-900 text-white py-8 mt-8 font-inter">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center">

          {/* Contact Section */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-xl font-bold mb-3">Contact Us</h2>
            <p className="text-sm mb-1">KOTRA JAKARTA</p>
            <p className="text-sm">Wisma GKBI Suite 801, Jln. Jendral Sudirman Kav. 28</p>
            <p className="text-sm">Bend. Hilir, Tanah Abang, Kota Jakarta Pusat,</p>
            <p className="text-sm">DKI Jakarta 10210</p>
            <p className="text-sm mt-4 font-semibold">General Inquiries:</p>

            {/* Buttons */}
            <div className="flex mt-4 space-x-3">
              <button
                className="py-2 px-4 bg-white text-blue-900 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-gray-100">
                KOTRA HQ
              </button>
              <button
                className="py-2 px-4 bg-white text-blue-900 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-gray-100">
                BuyKorea
              </button>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mt-8 md:mt-0">
            <h2 className="text-xl font-bold mb-3">Follow Us</h2>
            <div className="flex space-x-6 flex-wrap">
              <a href="#" className="text-white hover:text-red-500 transition">
                <IconBrandYoutube size={32} />
              </a>
              <a href="#" className="text-white hover:text-blue-700 transition">
                <IconBrandFacebook size={32} />
              </a>
              <a href="#" className="text-white hover:text-blue-400 transition">
                <IconBrandTwitter size={32} />
              </a>
              <a href="#" className="text-white hover:text-black transition">
                <IconBrandTiktok size={32} />
              </a>
              <a href="#" className="text-white hover:text-pink-500 transition">
                <IconBrandInstagram size={32} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout;
