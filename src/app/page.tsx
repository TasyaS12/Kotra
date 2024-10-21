'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import AOS from 'aos';
import 'aos/dist/aos.css';
import Button from '@mui/material/Button'

interface KoreanCompanyEntry {
  img: string;
  name: string;
  mainBusiness: string;
  website: string;
  catalog: string;
}


const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const koreanCompany: KoreanCompanyEntry[] = [
    // EV 2 Wheelers
    { img:"e3mobility.png", name: 'E3 Mobility', mainBusiness: 'EV 2-wheeler', website:'http://www.e3mobilitygroup.com/',
      catalog:'https://drive.google.com/file/d/1nfQ3A95YlP9AeEpwseX1PA4ualpJ29f6/view?usp=drive_link' },
    { img:"daedong.png", name: 'Daedong Mobility Corporation', mainBusiness: 'EV 2-wheeler', website:'http://daedongmobility.co.kr',
      catalog:'https://drive.google.com/file/d/1OH3iGiNVvBp_-9IFuJty8Cb5BGben-9H/view?usp=drive_link' },
    { img:"hyundaikefico.png", name: 'Hyundai Kefico', mainBusiness: 'EV 2-wheeler parts', website:'',
      catalog:'https://drive.google.com/file/d/1fQXBWU_Cfvnska-BbGG9JbMDYY5TBYtZ/view?usp=drive_link' },
    { img:"motrex.png", name: 'MOTREX', mainBusiness: 'EV 2/4-wheeler parts', website:'http://motrex.co.kr',
      catalog:'https://drive.google.com/file/d/1ijg_bARyIlC4Rd9kzDs7JBMyS5SrhUR3/view?usp=drive_link' },
    { img:"voltaira.png", name: 'FIT Voltaira Korea', mainBusiness: 'Wiring Harness (EV 2-wheelers)', website:'https://www.voltaira-group.com/',
      catalog:'https://drive.google.com/file/d/1lvadowHs5HIusQ5HCQYNEN2b6vgVO5Du/view?usp=drive_link' },

    // Battery Related
    { img:"lg.png", name: 'LG Energy Solution', mainBusiness: 'Battery', website:'http://www.lgensol.com',
      catalog:'https://drive.google.com/file/d/15_NA-TjCnlGYe66lgcydjBpiR90ezuEo/view?usp=drive_link' },
    { img:"poen.png", name: 'POEN Co., Ltd.', mainBusiness: 'EV Battery Re-manufacturing', website:'http://poen.co.kr/en/',
      catalog:'https://drive.google.com/file/d/1GHi2EYUyjtv44w_Rz7OJ89lb5lDrYLXT/view?usp=drive_link' },
    { img:"infac.png", name: 'INFAC CORPORATION', mainBusiness: 'Battery Module, System Assembly', website:'www.infac.com',
      catalog:'https://drive.google.com/file/d/1u_2m_7xd6KmZqMst6oX9hXZOumvbeU-u/view?usp=drive_link' },
    { img:"kwon.png", name: 'K-WON TS', mainBusiness: 'Battery Management System', website:'http://k-won.com/',
      catalog: 'https://drive.google.com/file/d/1sbIpcqkR-xsjZ7Xf1b0HVgA4NUntPLOM/view?usp=sharing'},

    // EV2 Charging
    { img:"chaevi.png", name: 'Chaevi', mainBusiness: 'EV Charging', website:'http://www.chaevi.com',
      catalog:'https://drive.google.com/file/d/1Tm7ixkBnZCsHAxqE9jMZqsXfbmRfcc2p/view?usp=drive_link' },
    { img:"kevit.png", name: 'Korea Electric Vehicle Infra Technology (KEVIT)', mainBusiness: 'EV Charging', website:'https://www.kevit.co.kr/en',
      catalog:'https://drive.google.com/file/d/1HGrPKcNuVEA9W_Ka9ZgDpwCv7pOIsTGu/view?usp=drive_link' },
    { img:"costel.png", name: 'COSTEL', mainBusiness: 'EV Charging', website:'http://www.costel.com',
      catalog:'https://drive.google.com/file/d/1WNomFxLtBBTD6TQ6chaH3z724X3ieXx3/view?usp=drive_link' },
    { img:"evar.png", name: 'EVAR', mainBusiness: 'EV Charging', website:'http://www.evar.co.kr',
      catalog:'https://drive.google.com/file/d/1jxuR4ZRa02CI0jANSJC-EMBQHS7yFuxF/view?usp=drive_link' },
    { img:"easy.png", name: 'Easy Charger', mainBusiness: 'EV Charging', website:'https://www.ezcharger.co.kr/',
      catalog:'https://drive.google.com/file/d/1CcC3wBPHQKEmWY2eq7AoP2G_ncZYO1lo/view?usp=sharing' },

    // Auto Parts
    { img:"hanhoecosti.png", name: 'HANHO ECOSTI', mainBusiness: 'Gear, Shaft', website:'http://hanhoinc.com',
      catalog:'https://drive.google.com/file/d/1nnKabTz3-ilQsgUof7IGRRRh1AiHqpCA/view?usp=drive_link' },
  ];

  const router = useRouter()

  // useEffect(() => {
  //   setMounted(typeof window !== 'undefined')
  // }, [])
  //
  // useEffect(() => {
  //   if (mounted) {
  //     router.push('/form')
  //   }
  // }, [mounted, router])

  return (
    <>
    <div className='bg-[#0B3A89]'>
      {/* Hero Section */}
      <section className="hero min-h-screen bg-cover bg-center bg-no-repeat relative"
               style={{ backgroundImage: 'url(https://static.wixstatic.com/media/08d438_a7cfbce851da4b2cb7fd7b54a6ba57d3~mv2.jpg/v1/fill/w_1920,h_633,al_c,q_85,enc_auto/08d438_a7cfbce851da4b2cb7fd7b54a6ba57d3~mv2.jpg)' }}>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-0"></div>

        {/* Glass Effect Container */}
        <div className="container mx-auto px-4 pt-4 flex flex-col items-center justify-center h-full relative z-10">
          <div
            className="bg-white bg-opacity-30 backdrop-blur-xl p-10 rounded-3xl text-center shadow-2xl transform transition-all duration-500 hover:scale-105 max-w-3xl">
            <h1 className="text-5xl font-extrabold text-white drop-shadow-2xl mb-4 animate-fade-in-up">
              Korea - Indonesia EV Business Partnership 2024
            </h1>
            <p className="text-lg text-gray-100 leading-relaxed">
              Dear Honorable Indonesian Business Partners,
              <br /><br />
              The Korea Trade-Investment Promotion Agency (KOTRA) is pleased to invite you to the upcoming ‘Korea -
              Indonesia EV Business Partnership.’ This event will serve as a key platform for fostering collaboration
              between Korean and Indonesian companies in the electric vehicle (EV) ecosystem sectors.
              <br /><br />
              The event will feature B2B meetings, offering participants the opportunity to engage directly with
              potential partners, explore business synergies, and discuss collaborative opportunities. Should you need
              any further information, please do not hesitate to contact
              <br /> <a href={'https://wa.me/628119125084'}>Ms. Adisty at +62-811-9125-084 (WhatsApp) </a>, or
              <br /><a href={'https://wa.me/6281221610099'}>Ms. Tasya at +62-812-2161-0099 (WhatsApp) </a>,
              <br /><br />
              We look forward to seeing you at <span className='font-bold'> Korea - Indonesia EV Business Partnership 2024!</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center">
              <Button
                onClick={() => {
                  router.push('/form')
                }}
                variant={'contained'}
                className="bg-blue-600 text-white px-8 py-3 rounded-full mt-8 hover:bg-blue-700 shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none">
                Register Now
              </Button>
              <Button
                onClick={() => {
                  router.push('https://drive.google.com/file/d/1qoaa5UfcQY59KjKAX3cQttnezt7wLsUo/view?usp=drive_link')
                }}
                variant={'outlined'}
                className="bg-blue-400 text-white px-8 py-3 rounded-full mt-8 hover:bg-blue-700 shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none sm:ml-12">
                Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white products py-16 text-center bg-[#0B3A89] mx-4">
        <h2 className="text-4xl font-bold mb-12" data-aos="fade-right">Company Information</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="col-span-1 md:col-span-3">
            <h2
              data-aos="fade-up"
              className="text-xl md:text-2xl font-extrabold mb-8 text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-full drop-shadow-lg tracking-wide px-6 py-3 inline-block"
            >
              EV 2 Wheelers
            </h2>
          </div>


          {koreanCompany.slice(0, 5).map((product, index) => (
            <div key={index} className="bg-white bg-opacity-30 backdrop-blur-lg shadow-lg p-6" data-aos="fade-up">
              <img
                src={`/images/logo/${product.img}`}
                alt={product.name}
                className="w-36 object-cover mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-4">{product.mainBusiness}</p>
              <div className="flex justify-center space-x-4">
                {product.website && (
                  <a
                    href={product.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    Visit Website
                  </a>
                )}
                {product.catalog && (
                  <a
                    href={product.catalog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                  >
                    View Catalog
                  </a>
                )}
              </div>
            </div>
          ))}
          <div className="col-span-1 md:col-span-3">
            <h2
              data-aos="fade-up"
              className="text-xl md:text-2xl font-extrabold mb-8 text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-full drop-shadow-lg tracking-wide px-6 py-3 inline-block"
            >
              Battery Related
            </h2>
          </div>
          {koreanCompany.slice(5, 9).map((product, index) => (
            <div key={index} className="bg-white bg-opacity-30 backdrop-blur-lg shadow-lg p-6" data-aos="fade-up">
              <img
                src={`/images/logo/${product.img}`}
                alt={product.name}
                className="w-36 object-cover mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-4">{product.mainBusiness}</p>
              <div className="flex justify-center space-x-4">
                {product.website && (
                  <a
                    href={product.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    Visit Website
                  </a>
                )}
                {product.catalog && (
                  <a
                    href={product.catalog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                  >
                    View Catalog
                  </a>
                )}
              </div>
            </div>
          ))}
          <div className="col-span-1 md:col-span-3">
            <h2
              data-aos="fade-up"
              className="text-xl md:text-2xl font-extrabold mb-8 text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-full drop-shadow-lg tracking-wide px-6 py-3 inline-block"
            >
              EV Charging
            </h2>
          </div>
          {koreanCompany.slice(9, 14).map((product, index) => (
            <div key={index} className="bg-white bg-opacity-30 backdrop-blur-lg shadow-lg p-6" data-aos="fade-up">
              <img
                src={`/images/logo/${product.img}`}
                alt={product.name}
                className="w-36 object-cover mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-4">{product.mainBusiness}</p>
              <div className="flex justify-center space-x-4">
                {product.website && (
                  <a
                    href={product.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    Visit Website
                  </a>
                )}
                {product.catalog && (
                  <a
                    href={product.catalog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                  >
                    View Catalog
                  </a>
                )}
              </div>
            </div>
          ))}
          <div className="col-span-1 md:col-span-3">
            <h2
              data-aos="fade-up"
              className="text-xl md:text-2xl font-extrabold mb-8 text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-full drop-shadow-lg tracking-wide px-6 py-3 inline-block"
            >
              Auto Parts
            </h2>
          </div>
          {koreanCompany.slice(14).map((product, index) => (
            <div key={index} className="bg-white bg-opacity-30 backdrop-blur-lg shadow-lg p-6" data-aos="fade-up">
              <img
                src={`/images/logo/${product.img}`}
                alt={product.name}
                className="w-36 object-cover mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-4">{product.mainBusiness}</p>
              <div className="flex justify-center space-x-4">
                {product.website && (
                  <a
                    href={product.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    Visit Website
                  </a>
                )}
                {product.catalog && (
                  <a
                    href={product.catalog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                  >
                    View Catalog
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  )
}

export default Page
