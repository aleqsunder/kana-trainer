import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	plugins: [react()],
	server: {
		port: 1234,
		open: true
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		}
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true
	},
})
