// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt()
  .append({
    files: ['**/*.vue'],
    rules: {
      'vue/padding-line-between-tags': ['error', [{ blankLine: 'always', prev: '*', next: '*' }]],
      'vue/prefer-use-template-ref': ['error'],
      'vue/prefer-define-options': ['error'],
      'vue/new-line-between-multi-line-property': ['error', { minLineOfMultilineProperty: 2 }],
      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/define-emits-declaration': ['error', 'type-based'],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/define-macros-order': ['error', { order: ['defineProps', 'defineEmits'] }],
      'vue/require-typed-ref': ['error']
    }
  })
  .append({
    rules: {
      'import/order': 'error'
    }
  })
  .overrideRules({
    'import/first': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
    'vue/max-attributes-per-line': ['error', { singleline: { max: 1 }, multiline: { max: 1 } }],
    'vue/first-attribute-linebreak': ['error', { singleline: 'beside', multiline: 'below' }],
    'vue/singleline-html-element-content-newline': ['error', { ignoreWhenNoAttributes: true, ignoreWhenEmpty: true }],
    'vue/html-comment-content-spacing': ['error', 'always'],
    'vue/no-required-prop-with-default': ['error', { autofix: false }]
  })
