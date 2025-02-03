import ListProduct from '@/app/ui/organisms/listProduct/ListProduct'
import ProductDropdown from '@/app/ui/organisms/productDropdown/ProductDropdown'
import React from 'react'

export default function DashboardPage() {
  return (<>
    <ProductDropdown />
    <ListProduct />
  </>
  )
}