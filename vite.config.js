import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(()=>{
  const env = loadEnv(process.cwd(),'');
  return{
    define:{
      'process.env':env
    },
    plugins: [react()],
  }
})