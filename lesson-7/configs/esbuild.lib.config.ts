import { build, type BuildOptions } from 'esbuild';

const baseOptions: BuildOptions = {
  entryPoints: ['lib/index.ts', 'lib/math.ts', 'lib/string.ts'],
  bundle: true,
  external: ['react', 'lodash'],
  minify: true,
  sourcemap: true,
  platform: 'neutral',
  target: 'es2022',
  logLevel: 'info',
};

await build({ ...baseOptions, format: 'esm', outdir: 'dist/lib/esm' });
await build({
  ...baseOptions,
  format: 'cjs',
  outdir: 'dist/lib/cjs',
  outExtension: { '.js': '.cjs' },
});
