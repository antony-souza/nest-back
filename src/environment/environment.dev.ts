import * as dotenv from 'dotenv';
dotenv.config();

export const environment = {
  host: process.env.HOST,
  port: Number(process.env.PORT),
  api_key: process.env.API_KEY,
  bcryptSalt: Number(process.env.BCRYPT_SALT),
  tokenSecret: process.env.TOKEN_SECRET ?? '',
  tokenExpiration: process.env.TOKEN_EXPIRATION ?? '1h',
  rabbitmqUser: process.env.RABBITMQ_USER ?? '',
  rabbitmqPassword: process.env.RABBITMQ_PASSWORD ?? '',
  rabbitmqHost: process.env.RABBITMQ_HOST ?? '',
  rabbitmqPort: parseInt(process.env.RABBITMQ_PORT ?? '5672'),
  rabbitmqManagementPort: parseInt(
    process.env.RABBITMQ_MANAGEMENT_PORT ?? '15672',
  ),
  enabledRabbitmq: process.env.ENABLE_RABBITMQ === 'true',
  enabledRabbitQueueConsume: process.env.ENABLE_QUEUE_CONSUME === 'true',
  rabbitmqVhost: process.env.RABBITMQ_VHOST ?? '',
};
