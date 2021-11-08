declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		ENV_NAME: string;
		MONGODB_URL: string;
		ACCESS_TOKEN_SECRET: string;
		REFRESH_TOKEN_SECRET: string;
		CONFIRMATION_TOKEN_SECRET: string;
		ISSUER: string;
		REFRESH_TOKEN_EXPIRATION_IN_DAYS: number;
		ACCESS_TOKEN_EXPIRATION_IN_MINUTES: number;
		IPDATA_KEY: string;
		EMAIL_USERNAME: string;
		EMAIL_PASSWORD: string;
	}
}
