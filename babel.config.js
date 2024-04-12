module.exports = {
	presets: [
		'@babel/preset-env',
		[
			'@babel/preset-typescript',
			{
				allExtensions: true,
				isTSX: true,
			},
		],
	],
	env: {
		test: {
			plugins: ['@babel/plugin-transform-runtime'],
		},
	},
}
