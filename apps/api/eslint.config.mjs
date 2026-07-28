import globals from 'globals';
import tseslint from 'typescript-eslint';
import base from "../../eslint.config.mjs";

const eslintConfig = defineConfig([
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
]);

export default eslintConfig