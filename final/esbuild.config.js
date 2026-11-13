const { readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');
const { analyzeMetafile, build } = require('esbuild');
const { transform } = require('@svgr/core');
const jsx = require('@svgr/plugin-jsx');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const outdir = path.join(__dirname, 'esbuild', 'dist');

const svgPlugin = {
	name: 'svg',
	setup(builder) {
		builder.onLoad({ filter: /\.svg$/i }, async ({ path: filePath }) => {
			const source = await readFile(filePath, 'utf8');
			const url = `data:image/svg+xml;base64,${Buffer.from(source).toString(
				'base64'
			)}`;
			const contents = await transform(
				source,
				{
					plugins: [jsx],
					exportType: 'named',
					namedExport: 'ReactComponent',
				},
				{
					filePath,
					componentName: 'SvgIcon',
					caller: {
						name: 'esbuild',
						previousExport: `export default ${JSON.stringify(url)};`,
					},
				}
			);

			return { contents, loader: 'jsx' };
		});
	},
};

async function buildApp() {
	const analyze = process.argv.includes('--analyze');
	const result = await build({
		absWorkingDir: __dirname,
		entryPoints: { app: 'src/index.tsx' },
		outdir,
		bundle: true,
		minify: true,
		metafile: analyze,
		target: 'es2017',
		jsx: 'automatic',
		define: {
			'process.env.NODE_ENV': '"production"',
			'process.env.API_URL': JSON.stringify(process.env.API_URL ?? ''),
		},
		loader: {
			'.module.css': 'local-css',
			'.png': 'file',
			'.jpg': 'file',
			'.gif': 'file',
			'.webp': 'file',
			'.woff': 'file',
			'.woff2': 'file',
		},
		plugins: [svgPlugin],
		logLevel: 'info',
	});

	const template = await readFile(
		path.join(__dirname, 'public', 'index.html'),
		'utf8'
	);
	const html = template
		.replace('</head>', '    <link rel="stylesheet" href="/app.css">\n</head>')
		.replace('</body>', '    <script defer src="/app.js"></script>\n</body>');
	await writeFile(path.join(outdir, 'index.html'), html);

	if (analyze) {
		await writeFile(
			path.join(__dirname, 'esbuild-meta.json'),
			JSON.stringify(result.metafile, null, 2)
		);
		console.log(await analyzeMetafile(result.metafile, { verbose: true }));
	}
}

buildApp().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
