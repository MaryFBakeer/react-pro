import { build, type BuildOptions } from 'esbuild';

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
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  logLevel: 'info',
};

const modeOptions: Record<BuildMode, BuildOptions> = {
  dev: {},
  prod: {},
};

const options: BuildOptions = { ...baseOptions, ...modeOptions[modeArg] };

await build(options);
