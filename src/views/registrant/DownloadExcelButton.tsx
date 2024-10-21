'use client'

import { useEffect, useState } from 'react' // Import the data from data.ts

import * as XLSX from 'xlsx';

import { getAllData } from '@/utils/getData'

interface RegistrantData {
  id: string;
  position: string;
  businessLine: string;
  mobilePhone: string;
  companyName: string;
  experienceImporting: string;
  yearOfEstablished: number;
  meetingDate: string;
  personInCharge: string;
  selectedLocation: string;
  productRange: string;
  email: string;
  website: string;
  companyEmail: string;
  importingCountries: string;
  annualSales: number;
  brandName: string;
  importAmount: string;
  fileURLs: string[]; // Add fileURLs to the interface
}

// Import xlsx for Excel download
const DownloadExcelButton = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RegistrantData[]>([]); // Initialize with an empty array

  useEffect(() => {
    // Function to fetch all data and set it in state
    const fetchData = async () => {
      try {
        const allData = await getAllData(); // Fetch all documents

        setData(allData); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures this runs once after the component mounts

  // Excel Download function
  const downloadExcel = () => {
    // Define a new workbook and worksheet
    setLoading(true);

    const worksheet = XLSX.utils.json_to_sheet(
      data.map(item => ({
        ID: item.id,
        "Company Name": item.companyName,
        "Email": item.email,
        "Year Established": item.yearOfEstablished,
        "Selected Location": item.selectedLocation,
        "Importing Countries": item.importingCountries,
        "Company Email": item.companyEmail,
        "Product Range": item.productRange,
        "Business Line": item.businessLine,
        "Import Amount": item.importAmount,
        "Position": item.position,
        "Mobile Phone": item.mobilePhone,
        "Brand Name": item.brandName,
        "Meeting Date": item.meetingDate,
        "Website": item.website,
        "Experience Importing": item.experienceImporting,
        "Annual Sales": item.annualSales,
        "File URLs": item.fileURLs.join('| ') // Join array if needed
      }))
    );

    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Companies');

    // Export the Excel file
    XLSX.writeFile(workbook, 'company_data.xlsx');
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Data Export</h1>

      {/* Download Excel button */}
      <button
        onClick={downloadExcel}
        style={{
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Download as Excel'}
      </button>
    </div>
  );
}

export default DownloadExcelButton;
