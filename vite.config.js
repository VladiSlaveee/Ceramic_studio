import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import postcss from "./postcss.config.js";
import viteImagemin from 'vite-plugin-imagemin'

const __dirname = dirname(fileURLToPath(import.meta.url));


export default defineConfig({
	base: '/',
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				catalog: "catalog.html",
				blog: "blog.html",
				about: "about.html",
			},
			output: {
				// Отключаем хэши в именах файлов
				assetFileNames: 'assets/[name].[ext]', // Будет style.css, а не style-XXXXX.css
				entryFileNames: 'assets/[name].js',    // Будет script.js, а не script-XXXXX.js
				chunkFileNames: 'assets/[name].js',    // Для чанков (если есть)
			}
		},
	},
	plugins: [
		viteImagemin({
			gifsicle: {
				optimizationLevel: 7,
				interlaced: false,
			},
			optipng: {
				optimizationLevel: 7,
			},
			mozjpeg: {
				quality: 70,
			},
			pngquant: {
				quality: [0.8, 0.9],
				speed: 4,
			},
			svgo: {
				plugins: [
					{
						name: 'removeViewBox',
					},
					{
						name: 'removeEmptyAttrs',
						active: false,
					},
				],
			},
		}),
	],
});





