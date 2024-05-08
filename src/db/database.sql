
/* create database */
CREATE DATABASE batalhaherois;

/* tabela de herois */
CREATE TABLE herois (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    power VARCHAR(100) NOT NULL,
    level INT NOT NULL, 
    hp INT NOT NULL,
    equipe VARCHAR(100),
    editora VARCHAR(100)
);

/* tabelha histórico de batalhas */

 CREATE TABLE historicoBatalhas (
     id SERIAL PRIMARY KEY,
     heroi_1 INT NOT NULL,
     heroi_2 INT NOT NULL,
     vencedor INT NOT NULL,
     perdedor INT NOT NULL,
     FOREIGN KEY (heroi_1) REFERENCES herois(id),
     FOREIGN KEY (heroi_2) REFERENCES herois(id),
     FOREIGN KEY (vencedor) REFERENCES herois(id),
     FOREIGN KEY (perdedor) REFERENCES herois(id)
 );