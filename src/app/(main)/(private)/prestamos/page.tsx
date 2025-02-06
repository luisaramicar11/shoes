'use client'
import ListProductPrestamo from '@/app/ui/organisms/listProduct/ListProductPrestamo'
import ProductDropdown from '@/app/ui/organisms/productDropdown/ProductDropdown'
import React from 'react'

export default function PrestamosPage() {

  const handleProductSubmit = (data: any) => {
    console.log("📦 Producto procesado:", data)
  }
  return (<>
  <h1 className='title'>Historial Préstamos</h1>

    <ProductDropdown mode="search" onSubmit={handleProductSubmit}/>
  
    <ListProductPrestamo />
  </>
  )
}