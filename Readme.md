<a href="https://documenter.getpostman.com/view/17955962/2s93Y6syi8">POSTMAN DOCUMENTATION</a>

<a href="https://github.com/aritrasen12345/contlo-url-shortner">GitHub Repo</a>

<a href="https://contlo-url-shortner.onrender.com/">Render Deploy Link</a>

```bash
// .env for API

# DEV CRED
DEV_PORT=8000
DEV_DB_URL=xxxxxxxxxxxxxxxxxxxxxxxxxx
DEV_DB_PASSWORD=xxxxx
DEV_JWT_ACTIVATE=xxxxxxxxx

# PROD CRED
PROD_PORT=5000
PROD_DB_URL=xxxxxxxxxxxxxxxxxxxxxxxxxx
PROD_DB_PASSWORD=xxxxx
PROD_JWT_ACTIVATE=xxxxxxxxx

```

## Start Server

```bash
git clone https://github.com/aritrasen12345/contlo-url-shortner
cd contlo-url-shortner
npm install
npm start
```

## Test Endpoint

- Test - GET /api/v1/test

## Auth Endpoint

- Login - POST /api/v1/auth/login
- SignUp - POST /api/v1/auth/signup

## URL Endpoint

- Generate ShortUrl - POST /api/v1/url/generate
- Fetch OriginalURL - POST /api/v1/url/fetch
- Delete shortURL - POST /api/v1/url/delete
- Update OriginalURL - POST /api/v1/url/update

## Dummy User(For Login)

- email: test@test.com
- password: Test@123
