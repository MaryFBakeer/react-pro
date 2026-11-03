import { build, context, type BuildOptions } from 'esbuild';

const MODES = ['dev', 'prod'] as const;
type BuildMode = (typeof MODES)[number];

const isBuildMode = (value: string | undefined): value is BuildMode =>
  MODES.some((mode) => mode === value);

const modeArg = process.argv
  .find((arg) => arg.startsWith('--mode='))
  ?.slice('--mode='.length);

if (!isBuildMode(modeArg)) {
  throw new Error(`Укажите режим: --mode=${MODES.join('|')}`);
}

const baseOptions: BuildOptions = {
  entryPoints: { app: 'app/index.ts' },
  outdir: 'dist',
  bundle: true,
  splitting: true,
  format: 'esm',
  chunkNames: 'chunks/[name]-[hash]',
  platform: 'browser',
  target: 'es2022',
  logLevel: 'info',
};

const modeOptions: Record<BuildMode, BuildOptions> = {
  dev: {
    minify: false,
    sourcemap: true,
  },
  prod: {
    minify: true,
    sourcemap: true,
    treeShaking: true,
  },
};

const options: BuildOptions = { ...baseOptions, ...modeOptions[modeArg] };

if (modeArg === 'dev') {
  const ctx = await context(options);
  await ctx.watch();

  const { port } = await ctx.serve({ servedir: '.', host: '127.0.0.1' });
  console.log(`Dev-сервер: http://127.0.0.1:${String(port)}`);
} else {
  await build(options);
}
