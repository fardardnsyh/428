---
title: 'Rediscovering stylelint'
description: ''
pubDate: 'May 7 2024'
hasCode: true
---

7 years ago

## Final Configuration

After all that explanation and sorting the keys alphabetical, I hereby present my new stylelint configuratioon going forward.:

```js
module.exports = {
	plugins: ['stylelint-order'],
	rules: {
		'at-rule-empty-line-before': [
			'always',
			{
				ignore: ['after-comment'],
				except: ['blockless-after-same-name-blockless', 'first-nested'],
			},
		],
		'comment-empty-line-before': [
			'always',
			{
				ignore: ['after-comment'],
				except: ['first-nested'],
			},
		],
		'declaration-block-single-line-max-declarations': 1,
		'declaration-property-value-disallowed-list': {
			'/^border/': ['none'],
		},
		'max-nesting-depth': 2,
		'order/order': [
			'custom-properties',
			'declarations',
			{
				type: 'at-rule',
				name: 'supports',
			},
			{
				type: 'at-rule',
				name: 'media',
			},
			'rules',
		],
		'rule-empty-line-before': [
			'always',
			{
				ignore: ['after-comment'],
				except: ['first-nested'],
			},
		],
		'selector-max-id': 0,
	},
}
```

All you have to do, to use it, is to install following packages:

```sh
npm install --save-dev stylelint stylelint-order
```
