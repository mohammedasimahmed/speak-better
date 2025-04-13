export const commonRules = {
    "no-var": "error",
    "no-trailing-spaces": "error",
    "no-duplicate-imports": "error",
    "no-unused-expressions": "warn",
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-new-func": "error",
    "prefer-object-spread": "error",
    "consistent-return": "error",
    "yoda": ["error", "never"],
    "eqeqeq": ["error", "always"],
    "quotes": [
      "warn",
      "double",
      {
        "allowTemplateLiterals": true,
        "avoidEscape": true
      }
    ],
    "indent": ["error", 2],
    "linebreak-style": ["warn", "unix"],
    "semi": ["error", "always"],
    "require-await": "error",
    "max-params": [
      "warn",
      {
        "max": 4
      }
    ],
    "prefer-destructuring": [
      "warn",
      {
        "array": true,
        "object": true
      }
    ],
    "prefer-const": [
      "warn",
      {
        "destructuring": "all"
      }
    ]
  }