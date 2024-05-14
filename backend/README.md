add .env and wrangler.toml with var,

.env: 
    DATABASE_URL // you'll get from your appropriate database (eg: mognodb or neon)

wrangler.toml: 
    DATABASE_URL // you'll need to get from prisma 
    JWT_SECERET // you can set it what ever you want

```
npm install
npm run dev
```

```
npm run deploy
```
