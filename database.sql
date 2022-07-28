
-- DB name is lmsl

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "email" VARCHAR (255) UNIQUE,
    "password" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN DEFAULT FALSE
ON DELETE CASCADE
);

CREATE TABLE "prompts" (
    id SERIAL PRIMARY KEY,
    question VARCHAR (1000),
    archived BOOLEAN DEFAULT FALSE
ON DELETE CASCADE
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
    "reaction_id" INT REFERENCES "reactions",
    CONSTRAINT "one_vote" UNIQUE ("video_response_id", "user_id")
);
