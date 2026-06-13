import { useState } from 'react'
import { actualizarLaptop } from '../api/LaptopApi'

export const useLaptop = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateLaptop = async (laptopId, data) => {
    setError(null)
    setLoading(true)
    try {
      const updated = await actualizarLaptop(laptopId, data)
      setLoading(false)
      return updated
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Error updating laptop')
      setLoading(false)
      throw err
    }
  }

  return {
    updateLaptop,
    loading,
    error,
  }
}
