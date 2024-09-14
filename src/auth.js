let cachedGpn = localStorage.getItem('gpn')

export const isLoggedIn = () => {
  return !!cachedGpn
}

export const login = (gpn, password) => {
  cachedGpn = gpn
  localStorage.setItem('gpn', gpn)
}

export const logout = () => {
  cachedGpn = null
  localStorage.removeItem('gpn')
}
