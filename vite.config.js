import { defineConfig } from 'vite'
import dns from 'node:dns'
import htmlPlugin from './vitePluguins';

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  server: {
    port: 2333
  },
  plugins: [htmlPlugin()]
});
