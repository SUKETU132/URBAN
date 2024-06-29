import React from 'react'
import { AlertCircle, X } from 'lucide-react'

export function WarningBanner({ warning }) {
  return (
    <>
      <div className="mt-10 rounded-md border-l-4 border-yellow-500 bg-yellow-100 p-4">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <AlertCircle className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-yellow-600">
              {warning}
            </p>
          </div>
          <div>
            <X className="h-6 w-6 cursor-pointer text-yellow-600" />
          </div>
        </div>
      </div>
    </>
  )
}
