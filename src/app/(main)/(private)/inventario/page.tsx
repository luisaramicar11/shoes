'use client'
import ListProduct from '@/app/ui/organisms/listProduct/ListProduct'
import ProductDropdown from '@/app/ui/organisms/productDropdown/ProductDropdown'
import React from 'react'

export default function DashboardPage() {

  const handleProductSubmit = (data: any) => {
    console.log("📦 Producto procesado:", data)
  }
  return (<>

    <ProductDropdown mode="add" onSubmit={handleProductSubmit} />

    <h1 className='title'>Historial Inventario</h1>
    <ProductDropdown mode="search" onSubmit={handleProductSubmit} />


    <ListProduct />
  </>
  )
}