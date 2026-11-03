import { build, type BuildOptions } from 'esbuild';

const baseOptions: BuildOptions = {
  entryPoints: ['lib/index.ts', 'lib/math.ts', 'lib/string.ts'],
  bundle: true,
  platform: 'neutral',
  target: 'es2022',
  logLevel: 'info',
};

await build({ ...baseOptions, format: 'esm', outdir: 'dist/lib/esm' });
