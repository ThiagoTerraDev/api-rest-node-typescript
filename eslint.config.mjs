import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "indent": [
        "error", 
        2,
        {
          "SwitchCase": 1,
        }
      ],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/ban-types": "off",
    }
  }
];
