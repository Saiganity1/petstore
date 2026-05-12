import axios from 'axios'

const trimTrailingSlash = (value) => value.replace(/\/+$/, "")

const resolveRenderBackendUrl = () => {
  if (typeof window === 'undefined') return ''
  const host = window.location.hostname
  const match = host.match(/^petstore-frontend(-[a-z0-9]+)?\.onrender\.com$/i)
  if (!match) return ''
  const suffix = match[1] || ''
  return `https://petstore-backend${suffix}.onrender.com`
}

const resolveApiBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_API_URL || '').trim()
  if (envUrl) return trimTrailingSlash(envUrl)
  const inferred = resolveRenderBackendUrl()
  if (inferred) return inferred
  return 'http://localhost:8080'
}

export const API_BASE_URL = resolveApiBaseUrl()

const axiosInstance = axios.create({ baseURL: API_BASE_URL, timeout: 20000 })

const normalizeAxiosError = (err) => {
  if (err.response) {
    return new Error(`HTTP ${err.response.status} - ${err.response.data || err.response.statusText}`)
  }
  if (err.request) return new Error('No response received from server')
  return new Error(err.message)
}

export const getPets = async ({ q, species, page = 0, limit = 12 } = {}) => {
  const params = {}
  if (q) params.q = q
  if (species) params.species = species
  params.page = page
  params.limit = limit
  try {
    const res = await axiosInstance.get('/api/pets', { params })
    return Array.isArray(res.data) ? res.data : []
  } catch (err) {
    throw normalizeAxiosError(err)
  }
}

export const createPet = async (payload) => {
  try {
    const res = await axiosInstance.post('/api/pets', payload)
    return res.data
  } catch (err) {
    throw normalizeAxiosError(err)
  }
}

export const updatePet = async (id, payload) => {
  try {
    const res = await axiosInstance.put(`/api/pets/${id}`, payload)
    return res.data
  } catch (err) {
    throw normalizeAxiosError(err)
  }
}

export const deletePet = async (id) => {
  try {
    const res = await axiosInstance.delete(`/api/pets/${id}`)
    return res.data
  } catch (err) {
    throw normalizeAxiosError(err)
  }
}
