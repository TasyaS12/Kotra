// Type Imports
import Head from "next/head";

import type { ChildrenType } from '@core/types'

// Util Imports

const Layout = async ({ children }: ChildrenType) => {
  // Vars

  return (
    <>
    <header className="w-full py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              alt="Picture of the author"
              className="h-10"
              height="100"
              src="/kotralogo.svg"
              width="150"
            />
            </div>
        </div>
        </header>
    <Head>
        <title>Company Data Form</title>

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
    </Head>
      {children}
      <footer className="w-full bg-blue-900 text-white py-8 mt-8">
        <div className="container mx-auto flex justify-between">
          <div>
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p className="mt-2">KOTRA JAKARTA</p>
            <p>Wisma GKBI Suite 801, Jln. Jendral Sudirman Kav. 28, RT.14/RW.1</p>
            <p>Bend. Hilir, Tanah Abang, Kota Jakarta Pusat,</p>
            <p>Daerah Khusus Ibukota Jakarta 10210</p>
            <p className="mt-2">General Inquiries:</p>
            <div className="flex mt-2">
              <button className="py-1 px-3 bg-white text-blue-900 rounded-lg shadow-md mr-2">
                KOTRA HQ
              </button>
              <button className="py-1 px-3 bg-white text-blue-900 rounded-lg shadow-md">
                BuyKorea
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold">Follow Us</h2>
            <div className="flex mt-2 space-x-4">
              <i className="fab fa-youtube text-2xl"></i>
              <i className="fab fa-facebook text-2xl"></i>
              <i className="fab fa-twitter text-2xl"></i>
              <i className="fab fa-tiktok text-2xl"></i>
              <i className="fab fa-instagram text-2xl"></i>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout
