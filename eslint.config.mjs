import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  {
    ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}', '.next/**', 'out/**'],
  },
  ...compat.config({
    extends: ['eslint:recommended', 'next','next/core-web-vitals'],
  }),
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'off',
      'no-var': 'off',
    }
  },
  
);
