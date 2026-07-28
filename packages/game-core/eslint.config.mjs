import base from "../../eslint.config.mjs";

export default [
  ...base,

  {
    files: ["eslint.config.mjs"],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            "eslint.config.mjs",
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];