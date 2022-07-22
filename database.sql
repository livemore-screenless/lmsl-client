
-- DB name is lmsl

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "email" VARCHAR (255) UNIQUE NOT NULL
    "password" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "prompts" (
    id SERIAL PRIMARY KEY,
    question VARCHAR (1000)
);

CREATE TABLE "video-responses" (
    id SERIAL PRIMARY KEY,
    "prompt_id" INT REFERENCES "prompts",
    "user_id" INT REFERENCES "user",
    "video_url" VARCHAR (1000) NOT NULL,
    "approved" BOOLEAN DEFAULT NULL
);

CREATE TABLE reactions (
    id SERIAL PRIMARY KEY,
    reaction VARCHAR (255)
);

CREATE TABLE "video-reactions" (
    id SERIAL PRIMARY KEY,
    "video_response_id" INT REFERENCES "video-responses",
    "user_id" INT REFERENCES "user",
    "reaction_id" INT REFERENCES "reactions"
);