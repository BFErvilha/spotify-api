module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
	transform: {
		'^.+\\.vue$': '@vue/vue3-jest',
		'^.+\\.js$': 'babel-jest',
		'^.+\\.ts$': 'ts-jest',
	},
	transformIgnorePatterns: ['/node_modules/'],
	testMatch: ['**/tests/unit/**/*.spec.(js|ts)|**/__tests__/*.(js|ts)'],
	testEnvironmentOptions: {
		customExportConditions: ['node', 'node-addons'],
	},
}
