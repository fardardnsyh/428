import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
	site: 'https://christophervoigt.dev/',
	integrations: [sitemap()],
	markdown: {
		syntaxHighlight: 'prism',
	},
	build: {
		inlineStylesheets: 'always',
	},
	devToolbar: {
		enabled: false,
	},
})
