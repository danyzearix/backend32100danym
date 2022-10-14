CREATE TABLE users (
    id INT,
    name VARCHAR(100),
    lastname VARCHAR(100),
    gender CHAR(2),
    PRIMARY KEY (id)  
    );

INSERT INTO  users (id, name, lastname, gender )
VALUES (2, "daniela", "munoza", "FM"),
(3, "mariela", "rodriguez", "FM");