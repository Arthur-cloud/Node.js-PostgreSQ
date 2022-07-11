Node.js + PostgreSQL

API:
1. /users POST - create user with the next fields: first_name (required, only letters),
last_name (only letters), email (required, unique, correct format), phone (correct format),
password (hash)
2. /login POST - create API for user login by email and password. Use JWT authentication
3. /users/:id GET - get 1 user by id.
4. /users/:id PUT - update user, add validation. Connect Socket.IO for sending push
notifications after user update.
