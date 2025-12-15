# Djanxt UI

The frontend of a Django + Next.js boilerplate.

## Architecture

- Bun for development
- Material UI for styling
- BetterAuth for authentication
- Drizzle for filterting / mutations
- Kysely (under the hood by BetterAuth) for schema generation / access

### The Problem

One of the key features of BetterAuth is how it manages the databases for you. Unfortunately, the same goes for Django. Even more unfortunately, they use wildly different database schemas for authentication. What's the solution? A single source of truth.

### Sharing the Database

Since Next.js is more of a "frontend" framework, we use Django (which is more of the "backend" framework) to manage the databases. The [`models.py`](../apps/user/models.py) file under the `user` app contains the models for the database required by BetterAuth. Django + BetterAuth share the `user_user` table. The extensible [`lib/auth.ts`](lib/auth.ts) file contains the authentication logic along with the customized table fields and names.

### Password Hashing

Since this project uses Bun, we utilise the powerful `Bun.password.hash` and `Bun.password.verify` functions to hash and verify passwords. For Django, we install `argon2-cffi`. We limit the parallelism of the Django hasher to 1 because Bun is single threaded.

### Session Management

BetterAuth also supports a secondaryStorage for faster session management. We can use Bun's inbuilt `redis` client.

Secondary storage is disabled (commented) by default since this boilerplate doesn't want to force users to use Redis - but it's implemented and ready to use. Just uncomment the `secondaryStorage` object in the auth config in [`lib/auth.ts`](lib/auth.ts).

### Updating the Schema

If there's any schema field we need to customize / add (or even entire tables) for the BetterAuth plugins, we can use Django migrations. Just edit the [`models.py`](../apps/user/models.py) file under the `user` app and run the migrations:

```bash
$ python manage.py makemigrations
$ python manage.py migrate
```

### Confirming Synchronization


To confirm that the migrations have been successfully applied to suit the schemas required by BetterAuth, run the generate command and check if the schema is up to date. There is, however, a small caveat:

BetterAuth's CLI tool relies on the `better-sqlite` package to generate schemas and process migrations. `better-sqlite` unfortunately isn't supported by Bun. To generate schemas and process migrations, just comment out the Bun import and the secondaryStorage object at the top of the [`lib/auth.ts`](lib/auth.ts) file. But this is a non-issue anyway since we use Django migrations. However, it's good to confirm the migrations made by Django are all that's required by BetterAuth and its plugins. Make sure the output of the generate command looks like this:

```bash
$ bunx better-auth generate
Your schema is already up to date.
```

If any new migrations are generated, something wasn't configured right by the Django models. Make sure the models are correctly mapped or named in both the Django models and the BetterAuth config.

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
