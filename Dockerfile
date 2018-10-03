FROM node:10-alpine

# Prepare work dir.

WORKDIR /opt/travel-ka

RUN addgroup -g 82 -S www-data \
  && adduser -u 82 -D -S -G www-data www-data \
  && chown www-data:www-data .

USER www-data

# Installation

COPY package.json yarn.lock ./

RUN yarn --pure-lockfile

# Run config.

COPY . ./

RUN yarn build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE 8000

CMD sleep 5 \
  && npx knex migrate:latest \
# && npx knex seed:run \
  && if [ "$NODE_ENV" = "production" ]; then \
    yarn start; \
  else \
    yarn start:dev; \
  fi
