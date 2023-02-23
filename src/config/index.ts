import { config } from 'dotenv';

config();


export default {
    SERVER: {
        PORT: process.env.PORT
    },
    JWT: {
        ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret',
        REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || 'secret',
        ACCESS_EXPIRES_IN: Number(process.env.JWT_ACCESS_EXPIRES_IN) || 24 * 60 * 60,
        REFRESH_EXPIRES_IN: Number(process.env.JWT_REFRESH_EXPIRES_IN) || 365 * 24 * 60 * 60
    },
};
