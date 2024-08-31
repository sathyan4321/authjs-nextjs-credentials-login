///routes.ts
export const DEFAULT_LOGIN_REDIRECT_URL = '/home';
export const PUBLIC_ROUTES = ['/', '/auth/new-verification'];
export const AUTH_ROUTES = [
	'/auth/login',
	'/auth/register',
	'/auth/error',
	'/auth/reset',
	'/auth/new-password',
];
export const API_AUTH_PREFIX = '/api/auth';
