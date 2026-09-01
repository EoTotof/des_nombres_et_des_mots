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
    },
  },
);

export default eslintConfig