# djanxt

An opinionated Django + Next.js template.

## Architecture

- Backend (Python)
  - Django 6.0
  - Psycopg 3
  - Argon2 (argon2-cffi)
  - Django REST Framework 3.16
  - DRF Simple JWT 5.5.1
- Frontend (TypeScript)
  - Bun 1.3
  - React 19
  - Next.js 16
  - Material UI 7.3
  - Better-Auth 1.4
- Database (PostgreSQL 17)

Django use Django REST Framework to expose a REST API for the frontend. The API is protected
using JWT tokens via DRF Simple JWT. The backend is configured to verify JWKs from the exposed
`/api/auth/jwks/` endpoint of the _"frontend"_. Note: the backend will never issue tokens itself.
It will only ever verify them.

The _"frontend"_ itself uses Better-Auth for authentication management. The database tables are
configured to be shared and synchronised between Django and Next.js. Refer to 
[`lib/auth.ts`](ui/lib/auth.ts) for more details. The `jwt()` plugin is used to issue JWT tokens
that the backend can verify.

Django + Better-Auth are both configured to use Argon2 for password hashing. It keeps the password
layer compatible between both frameworks. Better-Auth is tweaked to store the hashes in Django's
own format. Django is also configured to insert necessary rows in the database for Better-Auth
and signals to keep them synchronised.

## Installation

### Backend Setup

Create a virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

Now create an .env file in the root directory with the following content:

```dotenv
DEBUG=True
SECRET_KEY=<your_django_secret_key>
DATABASE_URL=postgres://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>
```

Run your database migrations:

```bash
python manage.py migrate
```

### Frontend Setup

**Note: This project uses Bun. We are NOT compatible with Node or Deno. Please install Bun from [https://bun.sh](https://bun.sh).**

Navigate to the [`ui`](ui) directory and install dependencies:

```bash
cd ui
bun install
```

Create an `.env` file in the `ui` directory with the following content:

```dotenv
BACKEND_URL=http://localhost:8000
DATABASE_URL=<same_database_url_as_backend>

BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=<your_better_auth_secret_key>

# optional - only if you want to use secondaryStorage
REDIS_URL=<redis_url>

# Example config for social oauth providers (optional)
GOOGLE_CLIENT_SECRET=<google_client_secret>
GOOGLE_CLIENT_ID=<google_client_id>
```

## Running the Application

### Backend

To run the Django backend server, use:

```bash
python manage.py runserver
```

### Frontend

To run the Next.js frontend server, navigate to the `ui` directory and use:

```bash
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the frontend in action.
