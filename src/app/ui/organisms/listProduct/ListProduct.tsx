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
    { id: '1', nombre: 'Zapato', referencia: 'REF-001', tipo: 'camiseta', tienda: '3t', tallas: { 32: 5, 34: 13, 38: 9, 40: 8 } },
    { id: '2', nombre: 'Zapato', referencia: 'REF-002', tipo: 'pantalon', tienda: '3t', tallas: {32: 5, 34: 13, 38: 9, 40: 8 } },
    { id: '3', nombre: 'Zapato', referencia: 'REF-003', tipo: 'vestido', tienda: '3t', tallas: { 32: 5, 34: 13, 38: 9, 40: 8 } }
  ])

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [editedData, setEditedData] = useState<Partial<Producto>>({})
  const [showLendModal, setShowLendModal] = useState<boolean>(false)
  const [lendData, setLendData] = useState<Partial<Producto>>({})

  const toggleProduct = (productId: string) => {
    setSelectedProduct(prev => (prev === productId ? null : productId))
    setEditingProduct(null)
  }

  const handleEdit = (productId: string, product: Producto) => {
    setEditingProduct(productId)
    setEditedData({ ...product })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    const { value } = e.target
    setEditedData(prev => ({ ...prev, [field]: value }))
  }

  const handleTallaChange = (talla: string, cantidad: number) => {
    setEditedData(prev => ({
      ...prev,
      tallas: { ...(prev.tallas || {}), [talla]: cantidad }
    }))
  }

  const handleSaveEdit = (productId: string) => {
    setProductos(prev => prev.map(p => (p.id === productId ? { ...p, ...editedData } : p)))
    setEditingProduct(null)
  }

  const handleDeleteProduct = (productId: string) => {
    setProductos(prev => prev.filter(p => p.id !== productId))
    setEditingProduct(null)
    setSelectedProduct(null)
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
              {editingProduct === producto.id ? (
                <>
                  <div className="detailRow">
                    <label>Referencia:</label>
                    <input type="text" value={editedData.referencia} onChange={(e) => handleInputChange(e, 'referencia')} />
                  </div>
                  {/* <div className="detailRow">
                    <label>Tipo:</label>
                    <select value={editedData.tipo} onChange={(e) => handleInputChange(e, 'tipo')}>
                      <option value="camiseta">zapato</option>
                      <option value="pantalon">teni</option>
                      <option value="vestido">bota</option>
                    </select>
                  </div> */}
                  <div className="detailRow">
                    <label>Tienda:</label>
                    <select value={editedData.tienda} onChange={(e) => handleInputChange(e, 'tienda')}>
                      <option value="SportCenter">SportCenter</option>
                      <option value="tienda-1">Tienda 1</option>
                      <option value="tienda-2">Tienda 2</option>
                      <option value="tienda-3">Tienda 3</option>
                    </select>
                  </div>

                  <div className="tallasSection">
                    <h4>Tallas Disponibles:</h4>
                    {Object.entries(producto.tallas).map(([talla, cantidad]) => (
                      <div key={talla} className="tallaItem">
                        <span>{talla}:</span>
                        <input
                          type="number"
                          min="0"
                          value={editedData.tallas?.[talla] || 0}
                          onChange={(e) => handleTallaChange(talla, parseInt(e.target.value))}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="buttonGroup">
                    <button onClick={() => handleSaveEdit(producto.id)} className="saveButton">Guardar</button>
                    <button onClick={() => handleDeleteProduct(producto.id)} className="deleteButton">Eliminar</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="detailRow"><span>Referencia:</span><span>{producto.referencia}</span></div>
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
                  <div className="buttonGroup">
                    <button onClick={() => handleEdit(producto.id, producto)} className="editButton">Editar</button>
                    <button onClick={() => handleLend(producto)} className="lendButton">Prestar</button>
                  </div>
                </>
              )}
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

  // Inicializar tallas cuando cambia el producto
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
