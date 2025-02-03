// components/ProductDropdownList.tsx
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
    // Ejemplo de datos
    {
      id: '1',
      nombre: 'Camiseta Básica',
      referencia: 'REF-001',
      tipo: 'camiseta',
      tienda: 'tienda-1',
      tallas: { S: 5, M: 3 }
    },
    {
        id: '1',
        nombre: 'Camiseta Básica',
        referencia: 'REF-001',
        tipo: 'camiseta',
        tienda: 'tienda-1',
        tallas: { S: 5, M: 3 }
      },
      {
        id: '1',
        nombre: 'Camiseta Básica',
        referencia: 'REF-001',
        tipo: 'camiseta',
        tienda: 'tienda-1',
        tallas: { S: 5, M: 3 }
      },

  ])

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [showLendModal, setShowLendModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Partial<Producto> | null>(null)

  const toggleProduct = (productId: string) => {
    setSelectedProduct(prev => prev === productId ? null : productId)
  }

  const handleEdit = (product: Producto) => {
    setEditingProduct(product)
  }

  const handleSaveEdit = () => {
    // Lógica para guardar cambios
    setEditingProduct(null)
  }

  const LendModal = () => (
    <div className="modalBackdrop">
      <div className="modalContent">
        <h3>Préstamo de Producto</h3>
        <p>Aquí se realiza el préstamo</p>
        <button 
          onClick={() => setShowLendModal(false)}
          className="modalClose"
        >
          Cerrar
        </button>
      </div>
    </div>
  )

  return (
    <div className="containerList">
      {productos.map((producto) => (
        <div key={producto.id} className="productItem">
          <div className="productHeader" onClick={() => toggleProduct(producto.id)}>
            <span>{producto.nombre}</span>
            <span className="arrow">
              {selectedProduct === producto.id ? '▼' : '▶'}
            </span>
          </div>
  
          {selectedProduct === producto.id && (
            <div className="productDetails">
              {editingProduct?.id === producto.id ? (
                <div className="editForm">
                  <div className="formGroup">
                    <label>Referencia:</label>
                    <input
                      value={editingProduct.referencia}
                      onChange={(e) =>
                        setEditingProduct((prev) => ({
                          ...prev,
                          referencia: e.target.value,
                        }))
                      }
                    />
                  </div>
  
                  <div className="buttonGroup">
                    <button onClick={handleSaveEdit} className="saveButton">
                      Guardar
                    </button>
                    <button onClick={() => setEditingProduct(null)} className="cancelButton">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="detailRow">
                    <span>Referencia:</span>
                    <span>{producto.referencia}</span>
                  </div>
                  <div className="detailRow">
                    <span>Tipo:</span>
                    <span>{producto.tipo}</span>
                  </div>
                  <div className="detailRow">
                    <span>Tienda:</span>
                    <span>{producto.tienda}</span>
                  </div>
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
                    <button onClick={() => handleEdit(producto)} className="editButton">
                      Editar
                    </button>
                    <button onClick={() => setShowLendModal(true)} className="lendButton">
                      Prestar
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}
  
      {showLendModal && <LendModal />}
    </div>
  );
  
}