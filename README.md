To generate new module:

make generate-module MODULE_NAME=product

To run:

npx kill-port 3000 && yarn start

TODO:

1. Load Balancer
2. Elastic Search for Searching
3. Microservice (RabbitQM)
4. SMTP
5. Transaction / concurrency handle
6. Caching (Redis)
7. Kafka

To migrate:

- Go to database.ts
- Change dir to migrations to:
  migrations: [
  'src/core/config/migrations/*{.ts,.js}'
  ]

- Run:
  make migrate-add MIGRATE_NAME=CreateUsersTable
  make migrate-apply
- To run api, change to:
  migrations: [
  '../../core/config/migrations/*{.ts,.js}'
  ]

- To generate entity file:
  bash/generate-input-instance.sh
