
DROP TABLE IF EXISTS Patiekalo_priedas;
DROP TABLE IF EXISTS Krepselio_preke;
DROP TABLE IF EXISTS Ingredientas;
DROP TABLE IF EXISTS Alergenas;
DROP TABLE IF EXISTS Patiekalas;
DROP TABLE IF EXISTS Krepselis;
DROP TABLE IF EXISTS Kategorija;
DROP TABLE IF EXISTS Uzsakymo_adresas;
DROP TABLE IF EXISTS Uzsakymas;
DROP TABLE IF EXISTS Restoranas;
DROP TABLE IF EXISTS Restorano_valdytojas;
DROP TABLE IF EXISTS Klientas;
DROP TABLE IF EXISTS Administratorius;
DROP TABLE IF EXISTS Restorano_kategorija;
DROP TABLE IF EXISTS Kaina;
DROP TABLE IF EXISTS Dieta;
DROP TABLE IF EXISTS Astrumas;
DROP TABLE IF EXISTS Apmokejimo_budas;
DROP TABLE IF EXISTS Alergenai;
DROP TABLE IF EXISTS Priedas;
DROP TABLE IF EXISTS Naudotojas;

CREATE TABLE Naudotojas
(
	vardas varchar (255),
	pavarde varchar (255),
	gimimo_data datetime,
	slaptazodis varchar (255),
	el_pastas varchar (255),
	slapyvardis varchar (255),
	miestas varchar (255),
	registravimo_data datetime,
	tel_numeris varchar (255),
	id_Naudotojas integer NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(id_Naudotojas)
);

CREATE TABLE Priedas
(
	pavadinimas varchar (255),
	kaina varchar (255),
	id_Priedas integer NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(id_Priedas)
);

CREATE TABLE Alergenai
(
	id_Alergenai integer NOT NULL AUTO_INCREMENT,
	pavadinimas char (12) NOT NULL,
	PRIMARY KEY(id_Alergenai)
);
INSERT INTO Alergenai(id_Alergenai, pavadinimas) VALUES(1, 'laktozė');
INSERT INTO Alergenai(id_Alergenai, pavadinimas) VALUES(2, 'glitimas');
INSERT INTO Alergenai(id_Alergenai, pavadinimas) VALUES(3, 'jūrų gėrybės');
INSERT INTO Alergenai(id_Alergenai, pavadinimas) VALUES(4, 'riešutai');
INSERT INTO Alergenai(id_Alergenai, pavadinimas) VALUES(5, 'kiaušiniai');

CREATE TABLE Apmokejimo_budas
(
	id_Apmokejimo_budas integer NOT NULL AUTO_INCREMENT,
	pavadinimas char (7) ,
	PRIMARY KEY(id_Apmokejimo_budas)
);
INSERT INTO Apmokejimo_budas(id_Apmokejimo_budas, pavadinimas) VALUES(1, 'grynais');
INSERT INTO Apmokejimo_budas(id_Apmokejimo_budas, pavadinimas) VALUES(2, 'kortele');

CREATE TABLE Astrumas
(
	id_Astrumas integer,
	pavadinimas char (15) NOT NULL,
	PRIMARY KEY(id_Astrumas)
);
INSERT INTO Astrumas(id_Astrumas, pavadinimas) VALUES(1, 'neaštrus');
INSERT INTO Astrumas(id_Astrumas, pavadinimas) VALUES(2, 'švelniai aštrus');
INSERT INTO Astrumas(id_Astrumas, pavadinimas) VALUES(3, 'aštrus');

CREATE TABLE Dieta
(
	id_Dieta integer,
	pavadinimas varchar(50) NOT NULL,
	PRIMARY KEY(id_Dieta)
);
INSERT INTO Dieta(id_Dieta, pavadinimas) VALUES(1, 'veganiškas');
INSERT INTO Dieta(id_Dieta, pavadinimas) VALUES(2, 'vegetariškas');
INSERT INTO Dieta(id_Dieta, pavadinimas) VALUES(3, 'su mėsa');

CREATE TABLE Kaina
(
	id_Kaina integer,
	pavadinimas char (8) NOT NULL,
	PRIMARY KEY(id_Kaina)
);
INSERT INTO Kaina(id_Kaina, pavadinimas) VALUES(1, 'žema');
INSERT INTO Kaina(id_Kaina, pavadinimas) VALUES(2, 'vidutinė');
INSERT INTO Kaina(id_Kaina, pavadinimas) VALUES(3, 'aukšta');

CREATE TABLE Restorano_kategorija
(
	id_Restorano_kategorija integer,
	pavadinimas char (14) NOT NULL ,
	PRIMARY KEY(id_Restorano_kategorija)
);
INSERT INTO Restorano_kategorija(id_Restorano_kategorija, pavadinimas) VALUES(1, 'Suši');
INSERT INTO Restorano_kategorija(id_Restorano_kategorija, pavadinimas) VALUES(2, 'Pica');
INSERT INTO Restorano_kategorija(id_Restorano_kategorija, pavadinimas) VALUES(3, 'Lietuviškas');
INSERT INTO Restorano_kategorija(id_Restorano_kategorija, pavadinimas) VALUES(4, 'Kinietiškas');
INSERT INTO Restorano_kategorija(id_Restorano_kategorija, pavadinimas) VALUES(5, 'Amerikietiškas');
INSERT INTO Restorano_kategorija(id_Restorano_kategorija, pavadinimas) VALUES(6, 'Burgeriai');
INSERT INTO Restorano_kategorija(id_Restorano_kategorija, pavadinimas) VALUES(7, 'Desertai');

CREATE TABLE Administratorius
(
	id_Naudotojas integer NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(id_Naudotojas),
	FOREIGN KEY(id_Naudotojas) REFERENCES Naudotojas (id_Naudotojas)
);

CREATE TABLE Klientas
(
	id_Naudotojas integer NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(id_Naudotojas),
	FOREIGN KEY(id_Naudotojas) REFERENCES Naudotojas (id_Naudotojas)
);

CREATE TABLE Restorano_valdytojas
(
	verslo_registracijos_numeris varchar (255),
	id_Naudotojas integer NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(id_Naudotojas),
	FOREIGN KEY(id_Naudotojas) REFERENCES Naudotojas (id_Naudotojas)
);

CREATE TABLE Restoranas
(
	pavadinimas varchar (255),
	miestas varchar (255),
	adresas varchar (255),
	saskaita varchar (255),
	uzsakymo_mokestis float,
	aprasymas varchar (255),
	tel_numeris varchar (255),
	atidarymo_laikas varchar(255),
	uzdarymo_laikas varchar(255),
	minimali_uzsakymo_kaina float,
	nuotrauka varchar (255),
	brangumas integer,
	id_Restoranas integer NOT NULL AUTO_INCREMENT,
	fk_Restorano_valdytojasid_Naudotojas integer NOT NULL,
	PRIMARY KEY(id_Restoranas),
	FOREIGN KEY(brangumas) REFERENCES Kaina (id_Kaina),
	CONSTRAINT turi FOREIGN KEY(fk_Restorano_valdytojasid_Naudotojas) REFERENCES Restorano_valdytojas (id_Naudotojas)
);

CREATE TABLE Uzsakymas
(
	data datetime,
	sumoketa boolean,
	pilna_kaina float,
	apmokejimo_budas integer,
	id_Uzsakymas integer NOT NULL AUTO_INCREMENT,
	fk_Klientasid_Naudotojas integer NOT NULL,
	PRIMARY KEY(id_Uzsakymas) ,
	FOREIGN KEY(apmokejimo_budas) REFERENCES Apmokejimo_budas (id_Apmokejimo_budas),
	CONSTRAINT sudaro FOREIGN KEY(fk_Klientasid_Naudotojas) REFERENCES Klientas (id_Naudotojas)
);

CREATE TABLE Uzsakymo_adresas
(
	miestas varchar (255),
	adresas varchar (255),
	zinute varchar (255),
	id_Uzsakymo_adresas integer NOT NULL AUTO_INCREMENT,
	fk_Klientasid_Naudotojas integer NOT NULL,
	PRIMARY KEY(id_Uzsakymo_adresas),
	CONSTRAINT nustato FOREIGN KEY(fk_Klientasid_Naudotojas) REFERENCES Klientas (id_Naudotojas)
);

CREATE TABLE Kategorija
(
	kategorija integer,
	id_Kategorija integer NOT NULL AUTO_INCREMENT,
	fk_Restoranasid_Restoranas integer NOT NULL,
	PRIMARY KEY(id_Kategorija),
	FOREIGN KEY(kategorija) REFERENCES Restorano_kategorija (id_Restorano_kategorija),
	CONSTRAINT turi1 FOREIGN KEY(fk_Restoranasid_Restoranas) REFERENCES Restoranas (id_Restoranas)
);

CREATE TABLE Krepselis
(
	id_Krepselis integer NOT NULL AUTO_INCREMENT,
	fk_Uzsakymasid_Uzsakymas integer NOT NULL,
	PRIMARY KEY(id_Krepselis),
	UNIQUE(fk_Uzsakymasid_Uzsakymas),
	CONSTRAINT turi2 FOREIGN KEY(fk_Uzsakymasid_Uzsakymas) REFERENCES Uzsakymas (id_Uzsakymas)
);

CREATE TABLE Patiekalas
(
	pavadinimas varchar (255),
	kaina float,
	meniu_kategorija varchar (255),
	kalorijos integer,
	aprasymas varchar (255),
	tinka_veganams boolean,
	astrumas integer,
	id_Patiekalas integer NOT NULL AUTO_INCREMENT,
	fk_Restoranasid_Restoranas integer NOT NULL,
	PRIMARY KEY(id_Patiekalas),
	FOREIGN KEY(astrumas) REFERENCES Astrumas (id_Astrumas),
	CONSTRAINT priklauso FOREIGN KEY(fk_Restoranasid_Restoranas) REFERENCES Restoranas (id_Restoranas)
);

CREATE TABLE Alergenas
(
	pavadinimas varchar (255),
	id_Alergenas integer NOT NULL AUTO_INCREMENT,
	fk_Patiekalasid_Patiekalas integer NOT NULL,
	PRIMARY KEY(id_Alergenas),
	CONSTRAINT turi3 FOREIGN KEY(fk_Patiekalasid_Patiekalas) REFERENCES Patiekalas (id_Patiekalas)
);

CREATE TABLE Ingredientas
(
	pavadinimas varchar (255),
	id_Ingredientas integer NOT NULL AUTO_INCREMENT,
	fk_Patiekalasid_Patiekalas integer NOT NULL,
	PRIMARY KEY(id_Ingredientas),
	CONSTRAINT sudaro1 FOREIGN KEY(fk_Patiekalasid_Patiekalas) REFERENCES Patiekalas (id_Patiekalas)
);

CREATE TABLE Krepselio_preke
(
	kiekis integer,
	id_Krepselio_preke integer NOT NULL AUTO_INCREMENT,
	fk_Patiekalasid_Patiekalas integer NOT NULL,
	fk_Uzsakymasid_Uzsakymas integer NOT NULL,
	PRIMARY KEY(id_Krepselio_preke),
	CONSTRAINT yra FOREIGN KEY(fk_Patiekalasid_Patiekalas) REFERENCES Patiekalas (id_Patiekalas),
	CONSTRAINT sudedamas_is FOREIGN KEY(fk_Uzsakymasid_Uzsakymas) REFERENCES Uzsakymas (id_Uzsakymas)
);

CREATE TABLE Patiekalo_priedas
(
	kiekis integer,
	id_Patiekalo_priedas integer NOT NULL AUTO_INCREMENT,
	fk_Patiekalasid_Patiekalas integer NOT NULL,
	fk_Priedasid_Priedas integer NOT NULL,
	PRIMARY KEY(id_Patiekalo_priedas),
	CONSTRAINT gali_tureti FOREIGN KEY(fk_Patiekalasid_Patiekalas) REFERENCES Patiekalas (id_Patiekalas),
	CONSTRAINT yra1 FOREIGN KEY(fk_Priedasid_Priedas) REFERENCES Priedas (id_Priedas)
);
