'use client'

import { useState } from 'react' // Import the data from data.ts

import * as XLSX from 'xlsx';

import data from './data';

 // Import xlsx for Excel download
const DonwloadExcelButton = () => {
  const [loading, setLoading] = useState(false);

  // Function to convert status to meaningful text
  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return 'Active';
      case 2:
        return 'Inactive';
      default:
        return 'Unknown';
    }
  };

  // Excel Download function
  const downloadExcel = () => {
    // Define a new workbook and worksheet
    setLoading(true);

    const worksheet = XLSX.utils.json_to_sheet(
      data.map(item => ({
        ID: item.id,
        "Full Name": item.fullName,
        Post: item.post,
        Email: item.email,
        City: item.city,
        "Start Date": item.start_date,
        Salary: item.salary.toFixed(2),
        Age: item.age,
        Experience: item.experience,
        Status: getStatusText(item.status),
      }))
    );

    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

    // Export the Excel file
    XLSX.writeFile(workbook, 'employee_data.xlsx');
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Employee Data Export</h1>

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

export default DonwloadExcelButton;
