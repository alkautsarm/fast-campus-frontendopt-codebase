import { FlatCompat } from '@eslint/eslintrc'
 
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})
 
const eslintConfig = [
  ...compat.config({
    extends: ['next', 'prettier', 'next/typescript'],
  }),
  {
    ignores: ['dist'],
  }
]
 
export default eslintConfig
