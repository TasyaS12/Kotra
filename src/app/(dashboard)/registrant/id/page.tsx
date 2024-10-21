'use client'

// Import necessary modules
import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { getDataById } from '@/utils/getData'

// TypeScript interface for the data
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
  fileURLs: string[]; // Add fileURLs to the interface
  selectedCompanies: string[]; // Add fileURLs to the interface
  participants: string;
  question: string;
  companyDescription: string;
}

const RegistrantPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [registrantData, setRegistrantData] = useState<RegistrantData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const data = await getDataById(String(id))

          if (data) {
            setRegistrantData(data as RegistrantData) // Cast to RegistrantData type
          } else {
            console.log('No such document!')
          }
        } catch (error) {
          console.error('Error fetching registrant data:', error)
        } finally {
          setLoading(false) // Set loading to false regardless of success or failure
        }
      }
    }

    fetchData()
  }, [id]) // Dependencies array should only contain id

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>
  }

  if (!registrantData) {
    return <div className="text-center text-xl">No data found for this registrant.</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Registrant Details</h1>
      <div className="space-y-2">
        <p><strong>ID:</strong> {registrantData.id}</p>
        <p><strong>Company Name:</strong> {registrantData.companyName}</p>
        <p><strong>Position:</strong> {registrantData.position}</p>
        <p><strong>Participants:</strong> {registrantData.participants}</p>
        <p><strong>Business Line:</strong> {registrantData.businessLine}</p>
        <p><strong>Mobile Phone:</strong> {registrantData.mobilePhone}</p>
        <p><strong>Email:</strong> {registrantData.email}</p>
        <p><strong>Experience Importing:</strong> {registrantData.experienceImporting}</p>
        <p><strong>Year Established:</strong> {registrantData.yearOfEstablished}</p>
        <p><strong>Meeting Date:</strong> {registrantData.meetingDate}</p>
        <p><strong>Person In Charge:</strong> {registrantData.personInCharge}</p>
        <p><strong>Selected Location:</strong> {registrantData.selectedLocation}</p>
        <p><strong>Product of Interest:</strong> {registrantData.productRange}</p>
        <p><strong>Website:</strong> {registrantData.website}</p>
        <p><strong>Company Email:</strong> {registrantData.companyEmail}</p>
        <p><strong>Importing Countries:</strong> {registrantData.importingCountries}</p>
        <p><strong>Annual Sales:</strong> {registrantData.annualSales}</p>
        <p><strong>Brand Name:</strong> {registrantData.brandName}</p>
        <p><strong>Questions regarding the EV Ecosystem or Automotive Industry in Indonesia :</strong> {registrantData.question}</p>
        <p><strong>Company Description:</strong> {registrantData.companyDescription}</p>

      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
      <h2 className="text-lg font-semibold">Selected Company:</h2>
        <ul className="list-disc pl-5 space-y-1">
          {registrantData.selectedCompanies.map((company, index) => (
            <li key={index}>
              <p  className="text-blue-600 hover:underline">
                {company}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <h2 className="text-lg font-semibold">Download Files:</h2>
        <ul className="list-disc pl-5 space-y-1">
          {registrantData.fileURLs.map((url, index) => (
            <li key={index}>
              <a href={url} download className="text-blue-600 hover:underline">
                Download File {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RegistrantPage
