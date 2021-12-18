BEGIN;

CREATE TABLE "user" (
    "id" Int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "google_id" TEXT,
    "first_name" varchar(60) NOT NULL,
    "last_name" varchar(60) NOT NULL,
    "city" varchar(60) NOT NULL,
    "phone" varchar(40) NOT NULL,
    "age" INT NOT NULL,
    "gender" varchar(40),
    "email" varchar(60) NOT NULL,
    "latitude" DECIMAL(8,6),
    "longitude" DECIMAL(9,6),
    "nbr_friend" INT NOT NULL
);

CREATE TABLE "event" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" varchar(60) NOT NULL,
    "description" TEXT NOT NULL,
    "location" varchar(60) NOT NULL,
    "date" varchar(60) NOT NULL,
    "picture" TEXT NOT NULL,
    "creator" INT REFERENCES "user"(id),
    "createdAt" date NOT NULL DEFAULT DATE( NOW() ),
    "updatedAt" date NOT NULL DEFAULT DATE( NOW() )
);


CREATE TABLE "interest" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" varchar(60) NOT NULL
);

CREATE TABLE "user_has_interest" (
    "user_id" INT NOT NULL,
    "interest_id" INT NOT NULL,

    PRIMARY KEY ("user_id", "interest_id")
);

CREATE TABLE "user_is_friend_with" (
    "user_id" INT NOT NULL,
    "friend_id" int NOT NULL,

    PRIMARY KEY("user_id", "friend_id")
);

CREATE TABLE "user_has_liked" (
    "user_id" INT NOT NULL,
    "user_liked_id" int NOT NULL,

    PRIMARY KEY("user_id", "user_liked_id")
);


CREATE TABLE "event_has_user" (
    "event_id" int NOT NULL,
    "user_id" INT NOT NULL,

    PRIMARY KEY("event_id", "user_id")
);


COMMIT; 