'use client'

import { useState, useEffect } from 'react'

type Producto = {
  id: string
  nombre: string
  referencia: string
  tipo: string
  tienda: string
  tallas: Record<string, number>
}

export default function ListProduct() {
  const [productos, setProductos] = useState<Producto[]>([
    { id: '1', nombre: 'Camiseta Básica', referencia: 'REF-001', tipo: 'camiseta', tienda: 'SportCenter', tallas: { S: 5, M: 3 } },
    { id: '2', nombre: 'Pantalón Clásico', referencia: 'REF-002', tipo: 'pantalon', tienda: 'SportCenter', tallas: { M: 4, L: 2 } },
    { id: '3', nombre: 'Vestido Elegante', referencia: 'REF-003', tipo: 'vestido', tienda: 'SportCenter', tallas: { S: 3, M: 5, XL: 2 } }
  ])

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [showLendModal, setShowLendModal] = useState<boolean>(false)
  const [lendData, setLendData] = useState<Partial<Producto>>({})

  const toggleProduct = (productId: string) => {
    setSelectedProduct(prev => (prev === productId ? null : productId))
  }

  const handleLend = (product: Producto) => {
    setLendData(product)
    setShowLendModal(true)
  }

  return (
    <div className="containerList">
      {productos.map((producto) => (
        <div key={producto.id} className="productItem">
          <div className="productHeader" onClick={() => toggleProduct(producto.id)}>
            <span>{producto.nombre}</span>
            <span className="arrow">{selectedProduct === producto.id ? '▼' : '▶'}</span>
          </div>

          {selectedProduct === producto.id && (
            <div className="productDetails">
              <div className="detailRow"><span>Referencia:</span><span>{producto.referencia}</span></div>
              <div className="detailRow"><span>Tipo:</span><span>{producto.tipo}</span></div>
              <div className="detailRow"><span>Tienda:</span><span>{producto.tienda}</span></div>
              <div className="tallasSection">
                <h4>Tallas Disponibles:</h4>
                {Object.entries(producto.tallas).map(([talla, cantidad]) => (
                  <div key={talla} className="tallaItem">
                    <span>{talla}:</span>
                    <span>{cantidad} unidades</span>
                  </div>
                ))}
              </div>
              <div className="buttonGroupPrestamo">
                <button className="saveButton">Regresar a 3T</button>
                <button className="editButton">Confirmar pago</button>
                <button onClick={() => handleLend(producto)} className="lendButton">Prestar</button>
              </div>
            </div>
          )}
        </div>
      ))}

      {showLendModal && <LendModal product={lendData} onClose={() => setShowLendModal(false)} />}
    </div>
  )
}

const LendModal = ({ product, onClose }: { product: Partial<Producto>, onClose: () => void }) => {
  const [formData, setFormData] = useState<{
    tallas: Record<string, number>
    tiendaDestino: string
    tiendaOrigen: string
  }>({
    tallas: {},
    tiendaDestino: '',
    tiendaOrigen: product.tienda || ''
  })

  useEffect(() => {
    if (product.tallas) {
      const initialTallas = Object.keys(product.tallas).reduce((acc, talla) => {
        acc[talla] = 0
        return acc
      }, {} as Record<string, number>)
      
      setFormData(prev => ({
        ...prev,
        tallas: initialTallas,
        tiendaOrigen: product.tienda || ''
      }))
    }
  }, [product])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'tiendaDestino') {
      setFormData(prev => ({ ...prev, tiendaDestino: value }))
    } else {
      setFormData(prev => ({
        ...prev,
        tallas: {
          ...prev.tallas,
          [name]: Math.min(Number(value), product.tallas?.[name] || 0)
        }
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Datos del préstamo:', formData)
    onClose()
  }

  return (
    <div className="modalBackdrop">
      <div className="modalContent">
        <h3>Prestar producto</h3>
        <button onClick={onClose} className="modalClose">✖</button>
        
        <form onSubmit={handleSubmit}>
          <div className="detailRow">
            <label>Tienda origen:</label>
            <input
              type="text"
              value={formData.tiendaOrigen}
              readOnly
              className="readOnlyInput"
            />
          </div>

          <div className="detailRow">
            <label>Tienda destino:</label>
            <select
              name="tiendaDestino"
              value={formData.tiendaDestino}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccionar tienda</option>
              <option value="tienda-1">Tienda 1</option>
              <option value="tienda-2">Tienda 2</option>
              <option value="tienda-3">Tienda 3</option>
            </select>
          </div>

          <div className="tallasSection">
            <h4>Cantidades a prestar:</h4>
            {product.tallas && Object.entries(product.tallas).map(([talla, disponible]) => (
              <div key={talla} className="tallaItem">
                <label>Talla {talla}:</label>
                <input
                  type="number"
                  name={talla}
                  min="0"
                  max={disponible}
                  value={formData.tallas[talla] || 0}
                  onChange={handleInputChange}
                  className="cantidadInput"
                />
                <span className="disponible">Disponible: {disponible}</span>
              </div>
            ))}
          </div>

          <div className="buttonGroup">
            <button type="button" onClick={onClose} className="cancelButton">
              Cancelar
            </button>
            <button type="submit" className="submitButton">
              Confirmar préstamo
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
