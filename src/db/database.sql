
create TABLE users (
    id SERIAL PRIMARY KEY,
    first_name CHARACTER VARYING(255) CHECK(first_name !='' AND first_name ~* '^[A-Za-z]+$'),
    last_name CHARACTER VARYING(255) ,
    email CHARACTER VARYING(255) UNIQUE CHECK (email !='' AND email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    phone CHARACTER VARYING(255) CHECK (phone ~ '^[0-9]{10}$'),
    password CHARACTER VARYING(255)
)

create TABLE tokens (
    id SERIAL PRIMARY KEY,
    refresh_token CHARACTER VARYING(255),
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE  
) 