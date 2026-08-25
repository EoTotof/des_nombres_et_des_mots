import globals from 'globals';
import base from "../../eslint.config.mjs";
import { defineConfig } from 'eslint/config';

const eslintConfig = defineConfig(
  ...base,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);

export default eslintConfig