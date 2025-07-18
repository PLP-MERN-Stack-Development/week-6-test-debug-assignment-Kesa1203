import { useState, useEffect, useCallback } from 'react'
import { bugService } from '../services/bugService'
import { useNotification } from '../contexts/NotificationContext'

export const useBugs = () => {
  const [bugs, setBugs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showError, showSuccess } = useNotification()

  const fetchBugs = useCallback(async (filters = {}) => {
    setLoading(true)
    setError(null)
    try {
      const response = await bugService.getBugs(filters)
      setBugs(response.data)
    } catch (err) {
      setError(err.message)
      showError('Failed to fetch bugs')
    } finally {
      setLoading(false)
    }
  }, [showError])

  const createBug = useCallback(async (bugData) => {
    setLoading(true)
    try {
      const response = await bugService.createBug(bugData)
      setBugs(prev => [response.data, ...prev])
      showSuccess('Bug created successfully')
      return response.data
    } catch (err) {
      setError(err.message)
      showError('Failed to create bug')
      throw err
    } finally {
      setLoading(false)
    }
  }, [showError, showSuccess])

  const updateBug = useCallback(async (bugId, updateData) => {
    setLoading(true)
    try {
      const response = await bugService.updateBug(bugId, updateData)
      setBugs(prev => prev.map(bug => 
        bug._id === bugId ? response.data : bug
      ))
      showSuccess('Bug updated successfully')
      return response.data
    } catch (err) {
      setError(err.message)
      showError('Failed to update bug')
      throw err
    } finally {
      setLoading(false)
    }
  }, [showError, showSuccess])

  const deleteBug = useCallback(async (bugId) => {
    setLoading(true)
    try {
      await bugService.deleteBug(bugId)
      setBugs(prev => prev.filter(bug => bug._id !== bugId))
      showSuccess('Bug deleted successfully')
    } catch (err) {
      setError(err.message)
      showError('Failed to delete bug')
      throw err
    } finally {
      setLoading(false)
    }
  }, [showError, showSuccess])

  const getBugById = useCallback(async (bugId) => {
    setLoading(true)
    try {
      const response = await bugService.getBugById(bugId)
      return response.data
    } catch (err) {
      setError(err.message)
      showError('Failed to fetch bug details')
      throw err
    } finally {
      setLoading(false)
    }
  }, [showError])

  useEffect(() => {
    fetchBugs()
  }, [fetchBugs])

  return {
    bugs,
    loading,
    error,
    fetchBugs,
    createBug,
    updateBug,
    deleteBug,
    getBugById,
  }
}