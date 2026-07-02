module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,mdx}': ['prettier --write'],
  '*.{css,scss,html}': ['prettier --write', 'stylelint --fix'],
};