'use client'

import { useState } from 'react'

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
                  <div className="detailRow">
                    <label>Tipo:</label>
                    <select value={editedData.tipo} onChange={(e) => handleInputChange(e, 'tipo')}>
                      <option value="camiseta">Camiseta</option>
                      <option value="pantalon">Pantalón</option>
                      <option value="vestido">Vestido</option>
                    </select>
                  </div>
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
  const [formData, setFormData] = useState({
    cantidad: '',
    talla: '',
    tiendaOrigen: product.tienda || '',
    tiendaDestino: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Préstamo confirmado:', formData)
    onClose()
  }

  return (
    <div className="modalBackdrop">
      <div className="modalContent">
        <h3>Prestar producto</h3>
        <button onClick={onClose} className="modalClose">✖</button>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Cantidad</label>
            <input 
              type="number" 
              name="cantidad" 
              value={formData.cantidad} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="formGroup">
            <label>Talla</label>
            <select 
              name="talla" 
              value={formData.talla} 
              onChange={handleInputChange} 
              required
            >
              <option value="">Selecciona una talla</option>
              {Object.keys(product.tallas || {}).map(talla => (
                <option key={talla} value={talla}>{talla}</option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label>Tienda origen</label>
            <input 
              type="text" 
              name="tiendaOrigen" 
              value={formData.tiendaOrigen} 
              readOnly 
            />
          </div>

          <div className="formGroup">
            <label>Tienda destino</label>
            <select 
              name="tiendaDestino" 
              value={formData.tiendaDestino} 
              onChange={handleInputChange} 
              required
            >
              <option value="">Selecciona una tienda</option>
              <option value="tienda-1">Tienda 1</option>
              <option value="tienda-2">Tienda 2</option>
              <option value="tienda-3">Tienda 3</option>
            </select>
          </div>

          <div className="buttonGroup">
            <button type="button" onClick={onClose} className="cancelButton">Cancelar</button>
            <button type="submit" className="submitButton">Confirmar préstamo</button>
          </div>
        </form>
      </div>
    </div>
  )
}
