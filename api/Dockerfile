# Permissions added for node user because of this: https://github.com/BretFisher/node-docker-good-defaults
FROM node:lts-slim@sha256:c785e617c8d7015190c0d41af52cc69be8a16e3d9eb7cb21f0bb58bcfca14d6b as builder

RUN apk add dumb-init procps

# Latest npm regardless of node version.
RUN npm i npm@latest -g

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node ./package*.json ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /home/node/app/node_modules/.bin:$PATH

COPY --chown=node:node . .
RUN npm run build

#  Stage 2 - Start Node server.
FROM node:lts-alpine as final

# Set node as the main user.
USER node

# Set some ENV
# Set production env for node
# ENV NODE_ENV production
# Specified port variable. This is passed as ARG for deployment cases for different ports.
ARG PORT=5000
# Set port
ENV HOST=0.0.0.0
ENV PORT=${PORT}

# Set directory for user.
RUN mkdir -p /home/node/app

# Set working directory.
WORKDIR /home/node/app

COPY .env ./
COPY --chown=node:node --from=builder /home/node/app/dist /home/node/app/dist
COPY --chown=node:node --from=builder /home/node/app/node_modules /home/node/app/node_modules

# Expose port in container
EXPOSE ${PORT}

CMD [ "node",  "./dist/main.js" ]

RUN echo '🐳 Docker build success!'