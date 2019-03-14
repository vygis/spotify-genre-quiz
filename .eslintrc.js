module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"jest/globals": true,
		"node": true
	},
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": ["react", "jest"],
	"rules": {
		"no-console": "off",
		"semi": 1
	},
	"settings": {
		"react": {
			"version": "detect"
		}
	}
};
