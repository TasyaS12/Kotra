'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import Button from '@mui/material/Button'

// Third-party Imports
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

// Style Imports
import styles from '@core/styles/table.module.css'

// Data Imports
import type { FormData } from '@views/registrant/data'
import { getAllData } from '@/utils/getData'

// Column Definitions
const columnHelper = createColumnHelper<FormData>()

const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    header: 'ID'
  }),
  columnHelper.accessor('companyName', {
    cell: info => info.getValue(),
    header: 'Company Name'
  }),
  columnHelper.accessor('email', {
    cell: info => info.getValue(),
    header: 'Email'
  }),
  columnHelper.accessor('yearOfEstablished', {
    cell: info => info.getValue(),
    header: 'Year Established'
  }),
  columnHelper.accessor('selectedLocation', {
    cell: info => info.getValue(),
    header: 'Location'
  }),
  columnHelper.accessor('importingCountries', {
    cell: info => info.getValue(),
    header: 'Importing Countries'
  }),
  columnHelper.accessor('businessLine', {
    cell: info => info.getValue(),
    header: 'Business Line'
  }),
  columnHelper.accessor('annualSales', {
    cell: info => info.getValue(),
    header: 'Annual Sales'
  }),
  columnHelper.accessor('meetingDate', {
    cell: info => info.getValue(),
    header: 'Meeting Date'
  }),
]

const BasicDataTables = () => {
  // States
  const [data, setData] = useState<FormData[]>([]); // Initialize with an empty array

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


  const router = useRouter()

  // Hooks
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: () => false
    }
  })

  return (
    <Card>
      <CardHeader title='Registrant' />
      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 6)
            .map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="my-10 flex w-full justify-center">
          <Button variant='contained' onClick={() => router.push('./registrant')}>
            View All Registrants
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default BasicDataTables
