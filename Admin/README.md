# NovaMark Admin

The admin console is a separate frontend application from the storefront.

## Run locally

```powershell
cd Admin
npm install
npm run dev
```

Open `http://localhost:5174`. Run the backend separately; it defaults to
`http://localhost:3000`. To use different addresses, set `VITE_API_URL` and
`VITE_STORE_URL` before starting the admin app.

Only users granted the `isAdmin: true` flag in the `users` collection can sign
in. The admin frontend keeps its session separate from the storefront.
