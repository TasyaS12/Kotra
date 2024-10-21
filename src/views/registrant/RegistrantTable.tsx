'use client'

// @ts-nocheck
// React Imports
import { useEffect, useMemo, useState } from 'react'

// MUI Imports
import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import classnames from 'classnames'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { Column, Table, ColumnFiltersState, FilterFn, ColumnDef } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { FormData } from './data'

type RegistrantData = {
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
  fileURLs: string[]; // Add fileURLs to the interface
}

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Icon Imports
import ChevronRight from '@menu/svg/ChevronRight'

// Style Imports
import styles from '@core/styles/table.module.css'

// Data Imports
import { getAllData } from '@/utils/getData'

// Column Definitions
const columnHelper = createColumnHelper<RegistrantData>()

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

// A debounced input react component
const DebouncedInput = ({
                          value: initialValue,
                          onChange,
                          debounce = 500,
                          ...props
                        }: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & TextFieldProps) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const Filter = ({ column, table }: { column: Column<any, unknown>; table: Table<any> }) => {
  // Vars
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className='flex gap-x-2'>
      <CustomTextField
        fullWidth
        type='number'
        sx={{ minInlineSize: 100, maxInlineSize: 125 }}
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={e => column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])}
        placeholder={`Min ${column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''}`}
      />
      <CustomTextField
        fullWidth
        type='number'
        sx={{ minInlineSize: 100, maxInlineSize: 125 }}
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={e => column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])}
        placeholder={`Max ${column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''}`}
      />
    </div>
  ) : (
    <CustomTextField
      fullWidth
      sx={{ minInlineSize: 100 }}
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder='Search...'
    />
  )
}

const RegistrantTable = () => {
  // States
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<FormData[]>([]); // Initialize with an empty array
  const router = useRouter();

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

  useEffect(() => {
    console.log(data)
  }, [data])

  // Hooks
  const columns = useMemo<ColumnDef<RegistrantData, any>[]>(
    () => [
      columnHelper.accessor('companyName', {
        cell: info => info.getValue(),
        header: 'Company Name'
      }),
      columnHelper.accessor('position', {
        cell: info => info.getValue(),
        header: 'Position'
      }),
      columnHelper.accessor('email', {
        cell: info => info.getValue(),
        header: 'Email'
      }),
      columnHelper.accessor('mobilePhone', {
        cell: info => info.getValue(),
        header: 'Mobile Phone'
      }),
      columnHelper.accessor('businessLine', {
        cell: info => info.getValue(),
        header: 'Business Line'
      }),
      columnHelper.accessor('meetingDate', {
        cell: info => info.getValue(),
        header: 'Meeting Date'
      }),
      {
        id: 'detailsButton',
        header: 'Details',
        cell: ({ row }) => {
          const registrantId = row.original.id;

          return (
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => router.push(`/registrant/id?id=${registrantId}`)} // If using Next.js
            >
              View Details
            </button>
          );
        }
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      columnFilters,
      globalFilter
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'companyName') {
      if (table.getState().sorting[0]?.id !== 'companyName') {
        table.setSorting([{ id: 'companyName', desc: false }])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnFilters[0]?.id])

  return (
    <Card>
      <CardHeader
        title='Registrant Table'
        action={
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search all columns...'
          />
        }
      />
      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <ChevronRight fontSize='1.25rem' className='-rotate-90' />,
                            desc: <ChevronRight fontSize='1.25rem' className='rotate-90' />
                          }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                        </div>
                        {header.column.getCanFilter() && <Filter column={header.column} table={table} />}
                      </>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
            <tr>
              <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                No data available
              </td>
            </tr>
            </tbody>
          ) : (
            <tbody>
            {table.getRowModel().rows.map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  })}
                </tr>
              )
            })}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </Card>
  )
}

export default RegistrantTable
