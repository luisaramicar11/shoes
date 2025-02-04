'use client'
import ListProduct from '@/app/ui/organisms/listProduct/ListProduct'
import ProductDropdown from '@/app/ui/organisms/productDropdown/ProductDropdown'
import React from 'react'

export default function PrestamosPage() {

  const handleProductSubmit = (data: any) => {
    console.log("📦 Producto procesado:", data)
  }
  return (<>
  <div className=''>
    <ProductDropdown mode="search" onSubmit={handleProductSubmit}/>
  </div>
  <h1>Historial Préstamos</h1>
    <ListProduct />
  </>
  )
}