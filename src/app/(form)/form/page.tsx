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
                className={`flex-1 py-5 px-5 rounded-2xl text-white shadow-md ml-4 ${selectedButton === index ? 'bg-[#0B3A89]' : 'bg-[#E1E1E1]'}`}
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
              <div className="grid grid-cols-2 gap-4 p-8 rounded-2xl outline outline-2 outline-offset-2 outline-[#E8E8E8] shadow-xl bg-[#fffff]">
                {/* Form Fields */}
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
              <p className="text-sm text-gray-500 mt-4">
              <span className="text-red-500">*</span> Mandatory, Wajib diisi
              </p>
              </div>
            )}

            {formStep === 1 && (
              <div className="grid grid-cols-2 gap-4 p-8 rounded-2xl outline outline-2 outline-offset-2 outline-[#E8E8E8] shadow-xl bg-[#fffff]">
                {/* Next set of form fields */}
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
                {/* Other fields */}
                <p className="text-sm text-gray-500 mt-4">
                  <span className="text-red-500">*</span> Mandatory, Wajib diisi
                </p>
              </div>
            )}

            {formStep === 2 && (
              <div className="grid grid-cols-2 gap-4 p-8 rounded-2xl outline outline-2 outline-offset-2 outline-[#E8E8E8] shadow-xl bg-[#fffff]">
                {/* Next set of form fields */}
                <div>
                  <label className="block text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-1 p-2 border rounded-md"
                    required
                    type="text"
                  />
                </div>
                {/* Other fields */}
                <p className="text-sm text-gray-500 mt-4">
                  <span className="text-red-500">*</span> Mandatory, Wajib diisi
                </p>
              </div>
            )}

            {formStep === 3 && (
              <div className="grid grid-cols-2 gap-4 p-8 rounded-2xl outline outline-2 outline-offset-2 outline-[#E8E8E8] shadow-xl bg-[#fffff]">
                {/* Next set of form fields */}
                <div>
                  <label className="block text-gray-700">
                    Upload <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-1 p-2 border rounded-md"
                    required
                    type="text"
                  />
                </div>
                {/* Other fields */}
                <p className="text-sm text-gray-500 mt-4">
                  <span className="text-red-500">*</span> Mandatory, Wajib diisi
                </p>
              </div>
            )}
            <div className="flex justify-between mt-6">
              <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handlePrev}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#ffffff",
                  padding: "12px 36px",
                  fontSize: "15px"
                }}
              >
                Prev
              </Button>
              <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={handleNext}
                style={{
                  borderRadius: 10,
                  backgroundColor: "#0B3A89",
                  padding: "12px 36px",
                  fontSize: "15px"
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
