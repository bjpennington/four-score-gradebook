CREATE DATABASE "fourscore";

CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "teacher_name" varchar (255)
);

CREATE TABLE "classrooms" (
	"id" SERIAL PRIMARY KEY,
	"classroom_name" VARCHAR (255),
	"person_id" INTEGER REFERENCES "person"
);

CREATE TABLE "students" (
	"id" SERIAL PRIMARY KEY,
	"student_name" VARCHAR (255),
	"classroom_id" INTEGER REFERENCES "classrooms"
);

CREATE TABLE "assignments" (
	"id" SERIAL PRIMARY KEY,
	"assignment_name" VARCHAR (255),
	"classroom_id" INTEGER REFERENCES "classrooms"
);

CREATE TABLE "standards" (
	"id" SERIAL PRIMARY KEY,
	"standard_name" VARCHAR (255),
	"classroom_id" INTEGER REFERENCES "classrooms"
);

CREATE TABLE "scores" (
	"id" SERIAL PRIMARY KEY,
	"student_id" INTEGER REFERENCES "students",
	"assignment_id" INTEGER REFERENCES "assignments",
	"standard_id" INTEGER REFERENCES "standards",
	"score" INTEGER NOT NULL DEFAULT 0
);