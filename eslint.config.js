import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
	{
		files: ['src/**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		settings: { react: { version: '18.3' } },
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs['jsx-runtime'].rules,
			...reactHooks.configs.recommended.rules,
			'react/jsx-no-target-blank': 'off',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			// Garante que sejam usadas apenas operadores de comparação estrita.
			eqeqeq: ['error'],
			// Garante o uso de chaves em estruturas condicionais e de controle de fluxo. Com all, garantimos que a regra seja estrita para todos os casos.
			curly: ['error', 'all'],
			// Define o número máximo de linhas vazias entre códigos.
			'no-multiple-empty-lines': ['error', { max: 2 }],
			// Garante o uso de Camel Case em nosso código.
			camelcase: ['error'],
			// Regra para não uso de mensagem de alerta em geral.
			'no-alert': ['warn'],
			...eslintConfigPrettier.rules,
		},
	},
];
