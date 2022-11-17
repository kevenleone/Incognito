# Incognito App

A proof of concept of an Application collecting information from a client and sending it to a server through a SDK, 

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `api`: a [Cloudflare Worker](https://workers.cloudflare.com) serverless app
- `web`: a [Vite](https://vitejs.dev) app
- `sdk`: a library to collect data from browser `web` and send it to the `api`.
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
yarn dev
```

### Local Envinronment

The `web` app is using SDK, using the API from the Cloud, to switch to local to must open `apps/web/src/main.ts` and change `https://incognito-api.incognito-poc.workers.dev` to `http://localhost:8787`

To run local it's necessary to create an account in `https://planetscale.com/` and add the access to the database into file: `apps/api/wrangler.toml`

Replacing `PLANET_SCALE_HOST`, `PLANET_SCALE_PASSWORD`, `PLANET_SCALE_USERNAME` with your credentials

----
You must create an account in cloudclare workers to run it locally, using wrangler.

Read the docs here: https://workers.cloudflare.com

### Accessing Production Environment

https://incognito-web.vercel.app

Use Dev Tools to analyze the network, to change the location I recommend using Google Chrome, read the topic [Manually change your location in Chrome](https://www.comparitech.com/blog/vpn-privacy/change-location-chrome-firefox-spoof)