'use client'
import type { SetStateAction} from 'react';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function LoadingScreen() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
    </div>
  );
}

export default function Page() {
  const [loading, setLoading] = useState(true); // State for loading
  const [formStep, setFormStep] = useState(0); // State for form steps
  const [selectedButton, setSelectedButton] = useState(0); // State for selected button

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the time to your preference

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setFormStep((prevStep) => {
      const newStep = prevStep + 1;

      setSelectedButton(newStep);

return newStep;
    });
  };

  const handlePrev = () => {
    setFormStep((prevStep) => {
      const newStep = Math.max(prevStep - 1, 0);

      setSelectedButton(newStep);

return newStep;
    });
  };

  const handleButtonClick = (index: SetStateAction<number>) => {
    setSelectedButton(index);
    setFormStep(index); // Navigate to the corresponding form step
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col items-center bg-white-100 min-h-screen">
      <main className="container mx-auto mt-8">
        <div className="bg-grey p-8 rounded-lg shadow-lg">
          <div className="flex justify-between mb-10">
            {['Company Data', 'Business Product', 'Date Meeting', 'Upload File'].map((text, index) => (
              <button
                key={index}
                className={`flex-1 py-5 px-5 rounded-2xl text-white ml-4 ${selectedButton === index ? 'bg-[#0B3A89]' : 'bg-[#E1E1E1]'}`}
                style={{
                  fontFamily: 'YourCustomFont, inter',
                  fontSize: "13px",
                  boxShadow: '-1px 1px 1px rgba(0, 0, 0, 0.1)', // Tambahkan bayangan kustom
                }}
                onClick={() => handleButtonClick(index)}
              >
                <img
                  alt={`${text} Icon`}
                  className="mb-2"
                  height="40"
                  src={`/images/button/${text.toLowerCase().replace('', '')}.svg`}
                  width="200"
                />
                <div className="text-center" style={{ fontSize: 16 }}>
                  {text}
                </div>
              </button>
            ))}
          </div>
          <form>
            {formStep === 0 && (
              <div className="grid grid-cols-2 gap-4 p-8 rounded-2xl outline outline-2 outline-offset-2 outline-[#E8E8E8] shadow-2xl bg-[#fffff]" 
              style={{
                fontFamily: 'YourCustomFont, inter',
                fontWeight: 'thin !important',
                fontSize: "13px",
                boxShadow: '-5px 10px 10px rgba(128, 128, 128, 0.3)', // Tambahkan bayangan kustom
              }}
              >
                {/* Form Fields */}
              
                <div>
            <label className="block text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full mt-4 p-4 border rounded-md"
              required
              type="email"
              style={{ borderRadius: "8px",
                borderColor: "#E8E8E8",
              }}
            />
          </div>
          <div>
            <label className="block text-gray-700">
              Mobile Phone <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full mt-4 p-4 border rounded-md"
              required
              type="tel"
              style={{ borderRadius: "8px",
                borderColor: "#E8E8E8",
              }}
            />
          </div>
          <div>
                <label className="block text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-4 p-4 border rounded-md"
                  required
                  type="text"
                  style={{ borderRadius: "8px",
                    borderColor: "#E8E8E8",
                  }}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Company Email <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-4 p-4 border rounded-md"
                  required
                  type="email"
                  style={{ borderRadius: "8px",
                    borderColor: "#E8E8E8",
                  }}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Person In Charge <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-4 p-4 border rounded-md"
                  required
                  type="text"
                  style={{ borderRadius: "8px",
                    borderColor: "#E8E8E8",
                  }}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Website <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-4 p-4 border rounded-md"
                  required
                  type="url"
                  style={{ borderRadius: "8px",
                    borderColor: "#E8E8E8",
                  }}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-4 p-4 border rounded-md"
                  required
                  type="text"
                  style={{ borderRadius: "8px",
                    borderColor: "#E8E8E8",
                  }}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Year Of Established <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full mt-4 p-4 border rounded-md"
                  required
                  type="number"
                  style={{ borderRadius: "8px",
                    borderColor: "#E8E8E8",
                  }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-4">
              <span className="text-red-500">*</span> Mandatory, Wajib diisi
              </p>
              </div>
            )}

            {formStep === 1 && (
              <div className="grid grid-cols-2 gap-4 p-8 rounded-2xl outline outline-2 outline-offset-2 outline-[#E8E8E8] shadow-2xl bg-[#fffff]" 
              style={{
                fontFamily: 'YourCustomFont, inter',
                fontWeight: 'thin',
                fontSize: "13px",
                boxShadow: '-5px 10px 10px rgba(128, 128, 128, 0.3)', // Tambahkan bayangan kustom
              }}
              >
                {/* Next set of form fields */}
                <div>
                  <label className="block text-gray-700">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-4 p-4 border rounded-md"
                    required
                    type="text"
                    style={{ borderRadius: "8px",
                      borderColor: "#E8E8E8",
                    }}
                  />
                </div>
                {/* Other fields */}
                <p className="text-sm text-gray-500 mt-4">
                  <span className="text-red-500">*</span> Mandatory, Wajib diisi
                </p>
              </div>
            )}

            {formStep === 2 && (
              <div className="grid grid-cols-2 gap-4 p-8 rounded-2xl outline outline-2 outline-offset-2 outline-[#E8E8E8] shadow-2xl bg-[#fffff]" 
              style={{
                fontFamily: 'YourCustomFont, inter',
                fontWeight: 'thin',
                fontSize: "13px",
                boxShadow: '-5px 10px 10px rgba(128, 128, 128, 0.3)', // Tambahkan bayangan kustom
              }}
              >
                {/* Next set of form fields */}
                <div>
                  <label className="block text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-4 p-4 border rounded-md"
                    required
                    type="text"
                    style={{ borderRadius: "8px",
                      borderColor: "#E8E8E8",
                    }}
                  />
                </div>
                {/* Other fields */}
                <p className="text-sm text-gray-500 mt-4">
                  <span className="text-red-500">*</span> Mandatory, Wajib diisi
                </p>
              </div>
            )}

            {formStep === 3 && (
              <div className="grid grid-cols-2 gap-4 p-8 rounded-2xl outline outline-2 outline-offset-2 outline-[#E8E8E8] shadow-2xl bg-[#fffff]" 
              style={{
                fontFamily: 'YourCustomFont, inter',
                fontWeight: 'thin',
                fontSize: "13px",
                boxShadow: '-5px 10px 10px rgba(128, 128, 128, 0.3)', // Tambahkan bayangan kustom
              }}
              >
                {/* Next set of form fields */}
                <div>
                  <label className="block text-gray-700">
                    Upload <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-4 p-4 border"
                    required
                    type="text"
                    style={{ borderRadius: "8px",
                      borderColor: "#E8E8E8",
                    }}
                  />
                </div>
                {/* Other fields */}
                <p className="text-sm text-gray-500 mt-4">
                  <span className="text-red-500">*</span> Mandatory, Wajib diisi
                </p>
              </div>
            )}
            <div className="flex justify-between mt-6">
            <Button variant="contained" endIcon={<ArrowBackIcon />} onClick={handlePrev}
                sx={{
                  fontFamily: 'YourCustomFont, inter',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  backgroundColor: "#ffffff",
                  padding: "12px 36px",
                  fontSize: "15px",
                  color: "#0B3A89",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Menambahkan bayangan
                  '&:hover': {
                    backgroundColor: "#B3B3B3", // Mengubah warna tombol saat di-hover
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", // Bayangan saat di-hover
                  },
                }}
              >
                Prev
              </Button>
              <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleNext}
                sx={{
                  fontFamily: 'YourCustomFont, inter',
                  fontWeight: 'bold',
                  borderRadius: 2,
                  backgroundColor: "#0B3A89",
                  padding: "12px 36px",
                  fontSize: "15px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Menambahkan bayangan
                  '&:hover': {
                    backgroundColor: "#0A3378", // Mengubah warna tombol saat di-hover
                    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", // Bayangan saat di-hover
                  },
                }}
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
