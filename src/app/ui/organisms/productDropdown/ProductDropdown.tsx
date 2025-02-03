// components/AddProductDropdown.tsx
'use client'

import { useState } from 'react'

type TallasType = {
  [key: string]: number
}

export default function ProductDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    referencia: '',
    tipo: '',
    tienda: '',
    tallas: {} as TallasType,
  })

  const tallasDisponibles = ['S', 'M', 'L', 'XL', 'XXL']

  const handleToggle = () => setIsOpen(!isOpen)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const toggleTalla = (talla: string) => {
    setFormData(prev => {
      const newTallas = { ...prev.tallas }
      if (newTallas[talla] !== undefined) {
        delete newTallas[talla]
      } else {
        newTallas[talla] = 0
      }
      return { ...prev, tallas: newTallas }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Filtrar tallas con cantidad mayor a 0
    const tallasValidas = Object.fromEntries(
      Object.entries(formData.tallas).filter(([_, cantidad]) => cantidad > 0)
    )
    console.log('Producto agregado:', { ...formData, tallas: tallasValidas })
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
      <button onClick={handleToggle} className="toggleButton">
        {isOpen ? 'Cerrar Formulario' : 'Agregar Producto'}
      </button>
  
      {isOpen && (
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label>Referencia:</label>
            <input
              type="text"
              name="referencia"
              value={formData.referencia}
              onChange={handleInputChange}
              required
            />
          </div>
  
          <div className="formGroup">
            <label>Tipo:</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione tipo</option>
              <option value="camiseta">Camiseta</option>
              <option value="pantalon">Pantalón</option>
              <option value="vestido">Vestido</option>
            </select>
          </div>
  
          <div className="formGroup">
            <label>Tienda:</label>
            <select
              name="tienda"
              value={formData.tienda}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione tienda</option>
              <option value="tienda-1">Tienda 1</option>
              <option value="tienda-2">Tienda 2</option>
              <option value="tienda-3">Tienda 3</option>
            </select>
          </div>
  
          <div className="formGroup">
            <label>Tallas y Cantidades:</label>
            <div className="tallasContainer">
              {tallasDisponibles.map((talla) => (
                <div key={talla} className="tallaGroup">
                  <label className="tallaCheckbox">
                    <input
                      type="checkbox"
                      checked={formData.tallas[talla] !== undefined}
                      onChange={() => toggleTalla(talla)}
                    />
                    {talla}
                  </label>
  
                  {formData.tallas[talla] !== undefined && (
                    <input
                      type="number"
                      min="0"
                      value={formData.tallas[talla] || 0}
                      onChange={(e) =>
                        handleTallaChange(talla, parseInt(e.target.value))
                      }
                      className="cantidadInput"
                      required
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
  
          <div className="buttonGroup">
            <button type="button" onClick={handleCancel} className="cancelButton">
              Cancelar
            </button>
            <button type="submit" className="submitButton">
              Agregar Producto
            </button>
          </div>
        </form>
      )}
    </div>
  );
}  