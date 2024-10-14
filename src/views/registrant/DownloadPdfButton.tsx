'use client'

import { useState } from 'react';

import { jsPDF } from 'jspdf';

import data from './data'; // Import the data from data.ts

const DownloadPdfButton = () => {
  const [loading, setLoading] = useState(false);

  // Function to convert status to meaningful text
  const getStatusText = (status: number) => {
    switch (status) {
      case 1:
        return 'Active';
      case 2:
        return 'Inactive';
      default:
        return 'Unknown';
    }
  };

  const downloadPDF = () => {
    setLoading(true);
    const doc = new jsPDF();

    // Add a title to the document
    doc.text('Employee Data', 10, 10);

    // Define table headers
    const headers = [
      ['ID', 'Full Name', 'Post', 'Email', 'City', 'Start Date', 'Salary', 'Age', 'Experience', 'Status'],
    ];

    // Populate the rows with your data, ensuring all values are strings
    const rows = data.map(item => [
      item.id.toString(),
      item.fullName,
      item.post,
      item.email,
      item.city,
      item.start_date,
      item.salary.toFixed(2), // Already a string
      item.age.toString(),
      item.experience.toString(),
      getStatusText(item.status),
    ]);

    // Append headers and rows to the PDF, ensuring row is a string array
    headers.concat(rows).forEach((row, index) => {
      doc.text(row.join(' | '), 10, 20 + index * 10);
    });

    // Generate and download the PDF
    doc.save('employee_data.pdf');
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>PDF Export</h1>
      <button
        onClick={downloadPDF}
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
        {loading ? 'Generating...' : 'Download as PDF'}
      </button>
    </div>
  );
}

export default DownloadPdfButton;
