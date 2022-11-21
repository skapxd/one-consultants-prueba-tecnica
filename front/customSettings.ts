export const CustomSettings = {
  isDevMode: window.location.protocol === 'http:',
  getUrlBaseServer: (path = '') => window.location.protocol === 'http:'
    ? `http://localhost:3000${path}`
    : `https://back-prueba-production.up.railway.app${path}`
}
