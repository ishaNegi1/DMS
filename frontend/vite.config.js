import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD:vite.config.js
=======
  server:{
    proxy:{
      '/api/*':'https://backend-dms-rril.onrender.com',
    },
  },
>>>>>>> 23b64c3eea126a456cc566b2c1b0b0e3fe2fc648:frontend/vite.config.js
  plugins: [react()],
})
