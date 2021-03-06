# -- Base images
# Pinned to specific versions, and updated by Renovate
FROM node:8.11.3-alpine@sha256:d3ecde67a30db99d10a32173cc2fee8766bb42430feb2f819179c8dcf494dac1 AS node
FROM buildkite/puppeteer:v1.6.0@sha256:efcda86b5e105772abbceea132cca91fa4cc5d784fbf042c4264dcc0cf5ac071 AS puppeteer

# -- Production environment
FROM    node AS production
ENV     NODE_ENV=production
EXPOSE  3000
WORKDIR /app
COPY    package.json yarn.lock .yarnclean /app/
RUN     apk --no-cache --virtual build-dependencies add python make g++ && \
        yarn install --frozen-lockfile --silent && \
        apk del build-dependencies
COPY    . /app
RUN     yarn run build
CMD     ["yarn", "run", "start"]

# -- Development
# We can just override NODE_ENV and re-run install to get the additional dev
# deps.
FROM production as development
ENV  NODE_ENV=development
RUN  yarn install

# -- Test
# Same deps as development
FROM development as test

# -- Integration tests
# Has headless chrome and puppeteer, and adds in Mocha so we can run our tests
# directly inside it
FROM puppeteer AS integration-tests
RUN  npm i -g mocha@5
ENV  PATH="${PATH}:/node_modules/.bin"

# -- Default target
FROM production
