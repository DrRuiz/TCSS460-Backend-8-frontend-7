-- Active: 1713770752115@@localhost@5432@postgres

CREATE TABLE demo (
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(255), message VARCHAR(255), priority int
);

CREATE TABLE Demo (
    DemoID SERIAL PRIMARY KEY, Priority INT, Name TEXT NOT NULL UNIQUE, Message TEXT
);

CREATE TABLE Account (
    Account_ID SERIAL PRIMARY KEY, FirstName VARCHAR(255) NOT NULL, LastName VARCHAR(255) NOT NULL, Username VARCHAR(255) NOT NULL UNIQUE, Email VARCHAR(255) NOT NULL UNIQUE, Phone VARCHAR(15) NOT NULL UNIQUE, Account_Role int NOT NULL
);

CREATE TABLE Account_Credential (
    Credential_ID SERIAL PRIMARY KEY, Account_ID INT NOT NULL, Salted_Hash VARCHAR(255) NOT NULL, salt VARCHAR(255), FOREIGN KEY (Account_ID) REFERENCES Account (Account_ID)
);

CREATE TABLE BOOKS (
    id INT PRIMARY KEY, isbn13 BIGINT, authors TEXT, publication_year INT, original_title TEXT, title TEXT, rating_avg FLOAT, rating_count INT, rating_1_star INT, rating_2_star INT, rating_3_star INT, rating_4_star INT, rating_5_star INT, image_url TEXT, image_small_url TEXT
);

COPY books FROM '/docker-entrypoint-initdb.d/books.csv'

DELIMITER ','

CSV HEADER;