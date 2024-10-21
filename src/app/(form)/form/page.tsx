'use client'
import type { SetStateAction} from 'react';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { uploadData, uploadFile } from '@/utils/uploadData'

function LoadingScreen() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
    </div>
  );
}

interface FormData {
  email?: string;
  mobilePhone?: string;
  companyName?: string;
  companyEmail?: string;
  personInCharge?: string;
  website?: string;
  position?: string;
  yearOfEstablished?: number;
  businessLine?: string;
  importingCountries?: string;
  productRange?: string;
  experienceImporting?: string;
  annualSales?: number;
  importAmount?: number;
  brandName?: string;
  meetingDate?: string;
  selectedLocation?: string;
  participants?: string;
  question?: string;
  companyDescription?: string;
}

interface KoreanCompanyEntry {
  img: string;
  name: string;
  mainBusiness: string;
  website: string;
  catalog: string;
}

function checkNonMandatoryKey(key: string): boolean {
  const nonMandatoryKeys = ['companyEmail', 'annualSales', 'question', 'companyDescription'];

  for (const keys of nonMandatoryKeys) {
    if (keys === key) {
      return true;
    }
  }

  return false
}

function checkForNullValues(formData: FormData): boolean {
  const interfaceKeys = Object.keys(FormData.prototype);

  // Check if all interface keys are present in formData
  for (const key of interfaceKeys) {
    if (!formData.hasOwnProperty(key) && !checkNonMandatoryKey(key)) {
      return false; // At least one key is missing
    }
  }

  // Check if any value in formData is null
  for (const key in formData) {
    if (formData[key] === null || formData[key] === '' && !checkNonMandatoryKey(key)) {
      return true; // At least one value is null
    }
  }

  return false; // formData has the key and no values are null
}

export default function Page() {
  const [loading, setLoading] = useState(true); // State for loading
  const [formStep, setFormStep] = useState(0); // State for form steps
  const [selectedButton, setSelectedButton] = useState(0); // State for selected button
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    selectedLocation: 'jakarta',
    meetingDate: '2024-11-13'
  });

  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

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
      catalog: 'https://drive.google.com/file/d/1gGNKqkcORwrSLpeFOmRc8pM-IsNmjfNx/view?usp=drive_link'},

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

  // Toggle selection
  const handleSelect = (companyName: string) => {
    setSelectedCompanies((prevSelected) =>
      prevSelected.includes(companyName)
        ? prevSelected.filter((name) => name !== companyName)
        : [...prevSelected, companyName]
    );
  };

  // @ts-ignore
  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    // Cast the dropped files to an array of File
    const droppedFiles: File[] = Array.from(event.dataTransfer.files);

    // Update the state with the correctly typed array
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };


  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault(); // Prevent default behavior to allow drop
  };

  const handleRemoveFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  const handleLocationChange = (location: string, date: string) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedLocation: location, // Update selected location in formData
      meetingDate: date,          // Update meeting date based on location
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if(checkForNullValues(formData)){
        alert('Please fill in all mandatory fields');

        return
      }

      if(selectedCompanies.length === 0){
        alert('Please fill in all mandatory fields');

        return
      }

      if(files.length > 1){
        // Upload each file to Firebase Storage
        const fileUploadPromises = files.map((file) => uploadFile(file));
        const fileURLs = await Promise.all(fileUploadPromises);

        // if(files.length < 1){
        //   alert('Please Choose 3 or more company');
        //
        //   return
        // }

        // Include file URLs in the form data
        const updatedFormData = { ...formData, fileURLs };

        // Include file URLs in the form data
        const updatedFormDataSelectedCompany = { ...updatedFormData, selectedCompanies };

        // Upload form data to Firestore
        await uploadData(updatedFormDataSelectedCompany);

      }else{
        // Include file URLs in the form data
        const updatedFormDataSelectedCompany = { ...formData, selectedCompanies };

        // Upload form data to Firestore
        await uploadData(updatedFormDataSelectedCompany);
      }

      alert('Form successfully submitted!');
      setFiles([]); // Clear file inputs
    } catch (error) {
      console.error('Error during form submission: ', error);
      alert('Error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="flex flex-wrap md:flex-nowrap justify-between mb-10 space-y-4 md:space-y-0">
            {['Date Meeting', 'Company Data', 'Business Product', 'Upload File', 'Korean Company'].map((text, index) => (
              <button
                key={index}
                className={`w-full md:flex-1 py-5 px-5 rounded-2xl text-white md:ml-4 ${
                  selectedButton === index ? 'bg-[#0B3A89]' : 'bg-[#E1E1E1]'
                }`}
                style={{
                  fontFamily: 'YourCustomFont, inter',
                  fontSize: '13px',
                  boxShadow: '-1px 1px 1px rgba(0, 0, 0, 0.1)' // Custom shadow
                }}
                onClick={() => handleButtonClick(index)}
              >
                <img
                  alt={`${text} Icon`}
                  className="mb-2 mx-auto"  // Center the icon
                  height="40"
                  src={`/images/button/${text.toLowerCase().replace(' ', '-')}.svg`}
                  width="40"  // Reduce width for consistency
                />
                <div className="text-center" style={{ fontSize: 16 }}>
                  {text}
                </div>
              </button>
            ))}
          </div>
          <form>
            {formStep === 1 && (
              <div
                className="grid grid-cols-2 gap-4 p-8 rounded-2xl outline outline-2 outline-offset-2 outline-[#E8E8E8] shadow-2xl bg-[#fffff]"
                style={{
                  fontFamily: 'YourCustomFont, inter',
                  fontWeight: 'thin !important',
                  fontSize: '13px',
                  boxShadow: '-5px 10px 10px rgba(128, 128, 128, 0.3)' // Tambahkan bayangan kustom
                }}
              >
                {/* Form Fields */}
                <div>
                  <label className="block text-gray-700">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-4 p-4 border rounded-md"
                    required
                    type="text"
                    name="companyName"
                    value={formData.companyName || ''}
                    onChange={handleChange}
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-gray-700">
                    Personal Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-4 p-4 border rounded-md"
                    required
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Participant Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-4 p-4 border rounded-md"
                    required
                    name="personInCharge"
                    value={formData.personInCharge || ''}
                    onChange={handleChange}
                    type="text"
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Participants ( Ex: 2 Persons) <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-4 p-4 border rounded-md"
                    required
                    type="text"
                    name="participants"
                    value={formData.participants || ''}
                    onChange={handleChange}
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
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
                    name="position"
                    value={formData.position || ''}
                    onChange={handleChange}
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Company Email
                  </label>
                  <input
                    className="w-full mt-4 p-4 border rounded-md"
                    required
                    type="email"
                    name="companyEmail"
                    value={formData.companyEmail || ''}
                    onChange={handleChange}
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-4 p-4 border rounded-md"
                    required
                    type="tel"
                    name="mobilePhone"
                    value={formData.mobilePhone || ''}
                    onChange={handleChange}
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Website (ex: www.kotra.com / N/A) <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-4 p-4 border rounded-md"
                    required
                    type="url"
                    name="website"
                    value={formData.website || ''}
                    onChange={handleChange}
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
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
                    name="yearOfEstablished"
                    value={formData.yearOfEstablished || ''}
                    onChange={handleChange}
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  <span className="text-red-500">*</span> Mandatory, Wajib diisi
                </p>
              </div>
            )}

            {formStep === 2 && (
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 rounded-2xl outline outline-2 outline-offset-2 outline-[#E8E8E8] shadow-lg bg-white"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  fontSize: '14px',
                  boxShadow: '-5px 10px 15px rgba(128, 128, 128, 0.2)' // Custom shadow
                }}
              >
                {/* Business Line Field */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-700 font-semibold">
                    Business Line <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col md:flex-row md:space-x-6 mt-2">
                    {['Manufacture', 'Importer', 'Distributor', 'EPC', 'Service', 'Other'].map((line) => (
                      <div key={line} className="flex items-center">
                        <input
                          type="radio"
                          id={line}
                          name="businessLine"
                          value={line}
                          checked={formData.businessLine === line}
                          onChange={handleChange}
                          className="mr-2"
                          required
                        />
                        {/* Bind the label to the input using htmlFor */}
                        <label htmlFor={line} className="text-gray-700">
                          {line}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Importing Countries Field */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Main Importing Countries (Ex: China / N/A) <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-2 p-4 border rounded-md"
                    required
                    type="text"
                    name="importingCountries"
                    value={formData.importingCountries || ''}
                    onChange={handleChange}
                    placeholder="Enter importing countries"
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>

                {/* Product Range Field */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Product of Interest (Ex: EV Charging, E2W, E4W, Battery, Auto Part or Others) <span
                    className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-2 p-4 border rounded-md"
                    required
                    type="text"
                    name="productRange"
                    value={formData.productRange || ''}
                    onChange={handleChange}
                    placeholder="Enter product range"
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>

                {/* Experience of Importing Field */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Experience of partnership with South Korea (Ex: Hyundai / N/A) <span
                    className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-2 p-4 border rounded-md"
                    required
                    type="text"
                    name="experienceImporting"
                    value={formData.experienceImporting || ''}
                    onChange={handleChange}
                    placeholder="Enter your experience"
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>

                {/* Average Annual Sales Field */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    AVERAGE ANNUAL SALES In USD MILLION
                    (FOR LAST 3 YEARS)
                  </label>
                  <input
                    className="w-full mt-2 p-4 border rounded-md"
                    required
                    type="number"
                    name="annualSales"
                    value={formData.annualSales || ''}
                    onChange={handleChange}
                    placeholder="Enter annual sales"
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>

                {/* Import Amount Field */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Import Amount (USD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-2 p-4 border rounded-md"
                    required
                    type="number"
                    name="importAmount"
                    value={formData.importAmount || ''}
                    onChange={handleChange}
                    placeholder="Enter import amount"
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>

                {/* Brand Name Field */}
                <div className="">
                  <label className="block text-gray-700 font-semibold">
                    Brand Name of the Imported Products <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full mt-2 p-4 border rounded-md"
                    required
                    type="text"
                    name="brandName"
                    value={formData.brandName || ''}
                    onChange={handleChange}
                    placeholder="Enter brand name"
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>

                <div className="">
                  <label className="block text-gray-700 font-semibold">
                    Do you have any questions regarding the EV Ecosystem or Automotive Industry in Indonesia?
                  </label>
                  <input
                    className="w-full mt-2 p-4 border rounded-md"
                    required
                    type="text"
                    name="brandName"
                    value={formData.question || ''}
                    onChange={handleChange}
                    placeholder="Enter question"
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                  />
                </div>

                {/* Form Reminder */}
                <div className="col-span-1 md:col-span-2 mt-4 text-sm text-gray-500">
                  <span className="text-red-500">*</span> Mandatory, Wajib diisi
                </div>
              </div>
            )}


            {formStep === 0 && (
              <div
                className="p-8 rounded-2xl outline outline-2 outline-offset-2 outline-[#E8E8E8] shadow-lg bg-white"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '400',
                  fontSize: '14px',
                  boxShadow: '-5px 10px 15px rgba(128, 128, 128, 0.2)'
                }}
              >
                <h2 className="text-xl font-semibold mb-4">Schedule Your Meeting</h2>

                {/* Location and Date Meeting Field */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <div className="mb-4 md:mb-0 md:flex-1">
                    <label className="block text-gray-700 font-semibold">
                      Select Location <span className="text-red-500">*</span>
                    </label>
                    <div className=" flex justify-between mt-2">
                      <div
                        className={`p-4 flex-1 py-2 rounded-md text-white transition duration-200 ${
                          formData.selectedLocation === 'jakarta' ? 'bg-[#0B3A89]' : 'bg-[#E1E1E1]'
                        }`}
                        onClick={() => {
                          handleLocationChange('jakarta', '2024-11-13')
                        }}
                      >
                        Jakarta
                      </div>
                      <div
                        className={`p-4 flex-1 py-2 rounded-md text-white transition duration-200 ${
                          formData.selectedLocation === 'bandung' ? 'bg-[#0B3A89]' : 'bg-[#E1E1E1]'
                        }`}
                        onClick={() => {
                          handleLocationChange('bandung', '2024-11-14')
                        }}
                      >
                        Bandung
                      </div>
                    </div>
                  </div>

                  <div className="md:flex-1 md:ml-4">
                    <label className="block text-gray-700 font-semibold">
                      Date Meeting <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className="w-full mt-2 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                      readOnly
                      value={formData.meetingDate} // Bind input to meetingDate state
                    />
                  </div>
                </div>

                {/* Reminder */}
                <p className="text-sm text-gray-500 mt-4">
                  <span className="text-red-500">*</span> Mandatory, Wajib diisi
                </p>
              </div>
            )}


            {formStep === 3 && (
              <div
                className="grid grid-cols-2 gap-4 p-8 rounded-2xl outline outline-2 outline-offset-2 outline-[#E8E8E8] shadow-2xl bg-[#ffffff]"
                style={{
                  fontFamily: 'YourCustomFont, inter',
                  fontWeight: 'thin',
                  fontSize: '13px',
                  boxShadow: '-5px 10px 10px rgba(128, 128, 128, 0.3)'
                }}
              >
                <h1 className="h1 col-span-2 ">COMPANY PROFILE</h1>
                {/* Drag-and-Drop Area */}
                <div
                  className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center relative cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <p className="text-gray-600 mb-4">Drag & drop your files here</p>
                  <p className="text-gray-500">or</p>
                  <a
                    className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    onClick={() => {
                      document.getElementById('fileInput').click()
                    }}
                  >
                    Browse Files
                  </a>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])}
                    multiple
                  />
                </div>

                {/* File Preview Section */}
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Uploaded Files:</h3>
                  <ul className="list-disc pl-5">
                    {files.map((file) => (
                      <li key={file.name} className="flex justify-between items-center">
                        <span className="text-gray-700">{file.name}</span>
                        <button
                          onClick={() => handleRemoveFile(file.name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-2">
                  <label className="mt-4 font-xl block text-gray-700 font-semibold">

                  </label>
                  <textarea
                    className="w-full mt-4 p-4 border rounded-md"
                    required
                    name="companyDescription"
                    value={formData.companyDescription || ''}
                    onChange={handleChange}
                    placeholder="If you do not have a company profile, we would greatly appreciate it if you could provide a short
                    description of your company."
                    style={{
                      borderRadius: '8px',
                      borderColor: '#E8E8E8'
                    }}
                    rows={8} // You can adjust the number of rows if needed
                  />
                </div>


                <p className="col-span-2 text-sm text-gray-500 mt-4">
                  <span className="text-red-500">*</span> Mandatory, Wajib diisi
                </p>
              </div>
            )}

            {formStep === 4 && (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 rounded-2xl outline outline-2 outline-offset-2 outline-[#E8E8E8] shadow-2xl bg-white"
                style={{
                  fontFamily: 'YourCustomFont, inter',
                  fontWeight: 'thin',
                  fontSize: '13px',
                  boxShadow: '-5px 10px 10px rgba(128, 128, 128, 0.3)'
                }}
              >
                <div className="col-span-1 sm:col-span-2">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Korean Company</h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-4">
                    <span className="text-red-500">*</span> Mandatory, Please choose minimum 3
                  </p>
                </div>

                {koreanCompany.map((company, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl border p-4 sm:p-6 cursor-pointer flex flex-col items-center gap-2 sm:gap-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                      selectedCompanies.includes(company.name)
                        ? 'bg-blue-100 border-blue-500'
                        : 'bg-white border-gray-200'
                    }`}
                    onClick={() => handleSelect(company.name)}
                  >
                    {/* Hidden Checkbox */}
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedCompanies.includes(company.name)}
                      onChange={() => handleSelect(company.name)} // Toggle selection when clicked
                    />
                    <label className="flex flex-col items-center">
                      <img
                        src={`/images/logo/${company.img}`}
                        alt={company.name}
                        className="w-20 sm:w-24 object-cover mx-auto mb-2 sm:mb-4 border-2 border-gray-200 shadow-sm"
                      />
                      <span className="font-bold text-sm sm:text-lg text-gray-800 text-center">{company.name}</span>
                      <span className="text-xs sm:text-sm text-gray-600 text-center">{company.mainBusiness}</span>
                    </label>
                  </div>
                ))}
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
              {formStep === 4 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    fontFamily: 'YourCustomFont, inter',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    backgroundColor: "#890b22",
                    padding: "12px 36px",
                    fontSize: "15px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                    '&:hover': {
                      backgroundColor: "#cb091c",
                      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleNext}
                  sx={{
                    fontFamily: 'YourCustomFont, inter',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    backgroundColor: "#0B3A89",
                    padding: "12px 36px",
                    fontSize: "15px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                    '&:hover': {
                      backgroundColor: "#0A3378",
                      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
