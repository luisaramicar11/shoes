'use client'

import { useState } from 'react'

type TallasType = { [key: string]: number }

type ProductFormProps = {
  mode: 'add' | 'search'
  existingProducts?: { referencia: string; tipo: string; tienda: string; tallas: TallasType }[]
  onSubmit: (data: { referencia: string; tipo: string; tienda: string; tallas: TallasType }) => void
  onSearch?: (filters: { referencia: string; tipo: string; tienda: string }) => void
}

export default function ProductDropdown({ mode, existingProducts = [], onSubmit, onSearch }: ProductFormProps) {
  const [isOpen, setIsOpen] = useState(false)

  const [formData, setFormData] = useState({
    referencia: '',
    tipo: '',
    tienda: '',
    tallas: {} as TallasType,
  })

  const tallasDisponibles = ['S', 'M', 'L', 'XL', 'XXL']

  const handleToggle = () => setIsOpen(!isOpen)

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTallaChange = (talla: string, cantidad: number) => {
    setFormData(prev => ({
      ...prev,
      tallas: {
        ...prev.tallas,
        [talla]: cantidad
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === 'add') {
      // Filtrar tallas con cantidad mayor a 0 antes de enviar
      const tallasValidas = Object.fromEntries(
        Object.entries(formData.tallas).filter(([_, cantidad]) => cantidad > 0)
      )
      onSubmit({ ...formData, tallas: tallasValidas })
    } else if (mode === 'search' && onSearch) {
      onSearch({ referencia: formData.referencia, tipo: formData.tipo, tienda: formData.tienda })
    }

    handleCancel()
  }

  const handleCancel = () => {
    setIsOpen(false)
    setFormData({
      referencia: '',
      tipo: '',
      tienda: '',
      tallas: {}
    })
  }

  return (
    <div className="containerProduct">
      <div className="buttonGroup">
        <button onClick={() => { setIsOpen(true); setFormData({ referencia: '', tipo: '', tienda: '', tallas: {} }) }} className="toggleButton">
          {isOpen ? 'Cerrar Formulario' : mode === 'add' ? 'Agregar Producto' : 'Buscar Producto'}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label>Referencia:</label>
            <select name="referencia" value={formData.referencia} onChange={handleInputChange} required>
              <option value="">{mode === 'add' ? 'Seleccione una referencia' : 'Seleccione producto a buscar'}</option>
              {existingProducts.map((product) => (
                <option key={product.referencia} value={product.referencia}>
                  {product.referencia}
                </option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label>Tipo:</label>
            <select name="tipo" value={formData.tipo} onChange={handleInputChange}>
              <option value="">Seleccione tipo</option>
              <option value="camiseta">Camiseta</option>
              <option value="pantalon">Pantalón</option>
              <option value="vestido">Vestido</option>
            </select>
          </div>

          <div className="formGroup">
            <label>Tienda:</label>
            <select name="tienda" value={formData.tienda} onChange={handleInputChange}>
              <option value="">Seleccione tienda</option>
              <option value="tienda-1">Tienda 1</option>
              <option value="tienda-2">Tienda 2</option>
              <option value="tienda-3">Tienda 3</option>
            </select>
          </div>

          {mode === 'add' && (
            <div className="formGroup">
              <label>Tallas y Cantidades:</label>
              <div className="tallasContainer">
                {tallasDisponibles.map((talla) => (
                  <div key={talla} className="tallaGroup">
                    <span className="tallaLabel">{talla}</span>
                    <input
                      type="number"
                      min="0"
                      value={formData.tallas[talla] || ''}
                      onChange={(e) => handleTallaChange(talla, parseInt(e.target.value))}
                      className="cantidadInput"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="buttonGroup">
            <button type="button" onClick={handleCancel} className="cancelButton">Cancelar</button>
            <button type="submit" className="submitButton">{mode === 'add' ? 'Agregar Producto' : 'Buscar Producto'}</button>
          </div>
        </form>
      )}
    </div>
  )
}
