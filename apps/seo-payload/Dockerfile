FROM node:18-buster as builder

# Used for install jerry private repo dependencies
ARG GIT_CREDENTIALS

WORKDIR /serverless

ENV CYPRESS_INSTALL_BINARY=0
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"

# Install dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY .npmrc .
COPY tools/plugins tools/plugins
COPY patches patches
# copy source files which contain client-side mocks
COPY apps/seo-payload apps/seo-payload
RUN git config --global url."$GIT_CREDENTIALS/".insteadOf ssh://git@github.com/
COPY @types ./@types
RUN npm ci --production --quiet

# Build app
COPY dist/apps/seo-payload dist/apps/seo-payload

EXPOSE 3333

CMD [ "node", "dist/apps/seo-payload/main.js"]
