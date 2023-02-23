import { createClient } from 'redis';

const cache = createClient();

cache.on('connect', () => console.log('connected to redis'));
cache.on('error', (error) => console.error('redis error', error));

cache.connect();

export default cache;
