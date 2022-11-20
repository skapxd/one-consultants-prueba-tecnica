export const CustomSettings = {
  isDevMode: window.location.protocol === 'http',
  getUrlBaseServer: (path = '') => window.location.protocol === 'http'
    ? `http://localhost:3000${path}`
    : `https://one-consultants-prueba-tecnica-production.up.railway.app${path}`
}
