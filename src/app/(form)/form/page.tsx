import Head from "next/head";

export default function Page() {
    return (
      <div className="flex flex-col items-center bg-gray-100 min-h-screen">
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
      <header className="w-full bg-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              alt="Picture of the author"
              className="h-10"
              height="50"
              src="/kotralogo.svg"
              width="200"
            />
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-between mb-6">
            <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md">
              <i className="fas fa-building mr-2"></i> Company Data
            </button>
            <button className="flex-1 py-2 px-4 bg-gray-200 text-gray-600 rounded-lg shadow-md ml-4">
              <i className="fas fa-box mr-2"></i> Business Products
            </button>
            <button className="flex-1 py-2 px-4 bg-gray-200 text-gray-600 rounded-lg shadow-md ml-4">
              <i className="fas fa-calendar-alt mr-2"></i> Date Meeting
            </button>
            <button className="flex-1 py-2 px-4 bg-gray-200 text-gray-600 rounded-lg shadow-md ml-4">
              <i className="fas fa-upload mr-2"></i> Upload File
            </button>
          </div>
          <form>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                  type="email"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Mobile Phone <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                  type="tel"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                  type="text"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Company Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                  type="email"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Person In Charge <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                  type="text"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Website <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                  type="url"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                  type="text"
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Year Of Established <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                  type="number"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              * Mandatory, Wajib diisi
            </p>
            <div className="flex justify-between mt-6">
              <button
                className="flex items-center py-2 px-4 bg-gray-200 text-gray-600 rounded-lg shadow-md"
                type="button"
              >
                <i className="fas fa-arrow-left mr-2"></i> Prev
              </button>
              <button
                className="flex items-center py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md"
                type="submit"
              >
                Next <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </form>
        </div>
      </main>
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
      </div>
      
    )
  }
