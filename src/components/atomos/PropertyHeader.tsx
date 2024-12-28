import React from 'react'

interface PropertyHeaderProps {
  title: string
  price: number
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  title,
  price
}) => {
  return (
    <div className="w-full mx-auto bg-white overflow-hidden">
      <div className="px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-sans font-bold text-center sm:text-left w-full sm:w-auto">
            {title}
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-accent text-center sm:text-right w-full sm:w-auto">
            USD {price.toLocaleString('de-DE')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PropertyHeader

