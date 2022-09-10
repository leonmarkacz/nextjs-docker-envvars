This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the server:

```bash
npm run dev
yarn dev
# or
npm run start
yarn start
```

Second, build the image:

```bash
docker build --target app-prod -t app-prod:local --build-arg BUILD_ENVIRONMENT="production" .
docker run --publish 4200:3000 app-prod:local
docker build --target app-dev -t app-dev:local --build-arg BUILD_ENVIRONMENT="development" .
docker run --publish 4200:3000 app-dev:local
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

