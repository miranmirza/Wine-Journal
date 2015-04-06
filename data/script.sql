--SQL Fake Book Song Data


--CREATE DATABASE TABLES
--=======================

--[CONSUMER_ID | FIRST_NAME, LAST_NAME, DOB, ADDRESS, PHONE_NO] √
--[WINE_ID | WINE_NAME, TYPE, YEAR, ALCNT, COUNTRY, STYLE, VRTL, RATING, WINERY_ID] √
--[WINERY_ID | NAME, YEAR_FOUNDED, LOCATION] √
--[CONSUMER_ID,WINE_ID | STARRED]
DROP TABLE if exists consumers;
DROP TABLE if exists winery;
DROP TABLE if exists wines;
DROP TABLE if exists starred;


create table if not exists consumers(
      id integer primary key not null, --auto increment key 
      firstName text NOT NULL, --title of the customer
	  lastName text NOT NULL, --title of the customer
	  dateOfBirth date NOT NULL, --date of birth of the customer
	  address varchar(200),
	  phoneNum varchar(100)
);

create table if not exists winery(
      wineryID integer primary key not null, --auto increment key 
	  wineryName text NOT NULL, -- name of the winery
	  yearFounded int NOT NULL,
	  location varchar(100)
);

create table if not exists wines(
      id integer primary key not null, --auto increment key 
	  wineName text NOT NULL, -- name of the winery
	  type text NOT NULL,
	  year int NOT NULL,
	  alcoholContent int NOT NULL,
	  country text NOT NULL,
      wineryID integer NOT NULL,
	  style text,
	  varterial text,--look into this again
	  rating integer,
      FOREIGN KEY(wineryID) REFERENCES winery(wineryID)
);

create table if not exists starred(
    wineID integer NOT NULL,
    consumerID integer NOT NULL,
	starred boolean not null,
    PRIMARY KEY(wineID, consumerID),
	FOREIGN KEY(wineID) REFERENCES wines(id),
	FOREIGN KEY(consumerID) REFERENCES consumers(id)
);


--INSERT DATA
--=======================

begin transaction;

insert into consumers(firstName, lastName, dateOfBirth, address, phoneNum) values ("Miran", "Mirza", '19940628', "1375 Prince of Wales Dr", "6131234567");
insert into winery(wineryID, wineryName, yearFounded, location) values (1, "Villa Maria Estates", 1961, "New Zealand");
insert into wines(wineName, type, year, alcoholContent, country, wineryID, style, varterial, rating) values("Villa Maria Private Bin Rose", "Rosé", 2010, 13, "New Zealand", 1, "Medium-bodied and Dry", "Rose Wines", 0);
insert into wines(wineName, type, year, alcoholContent, country, wineryID, style, varterial, rating) values("Villa Maria Cellar Selection Sauvignon Blanc 2014", "White Wine", 2014, 13, "New Zealand", 1, "Unavailable", "Sauvignon Blanc", 0);

insert into winery(wineryID, wineryName, yearFounded, location) values (2, "L’Ecole N° 41", 1983, "United States");
insert into wines(wineName, type, year, alcoholContent, country, wineryID, style, varterial, rating) values("Cabernet Sauvignon 2010", "Red Wine", 2010, 14.5, "United States", 2, "Full-bodied and Firm", "Cabernet Sauvignon", 0);
insert into wines(wineName, type, year, alcoholContent, country, wineryID, style, varterial, rating) values("Red 2011", "Red Wine", 2011, 14.5, "United States", 2, "Full-bodied and Smooth", "Red Blend", 0);
insert into wines(wineName, type, year, alcoholContent, country, wineryID, style, varterial, rating) values("Sémillon 2004", "White Wine", 2004, 13, "United States", 2, "Unavailable", "Semillon", 0);
    
insert into winery(wineryID, wineryName, yearFounded, location) values (3, "Miguel Torres Chile", 1979, "Chile");
insert into wines(wineName, type, year, alcoholContent, country, wineryID, style, varterial, rating) values("Santa Digna Cabernet Sauvignon Reserva", "Red Wine", 2010, 14, "Chile", 3, "Full-bodied and Smooth", "Cabernet Sauvignon", 0);
insert into wines(wineName, type, year, alcoholContent, country, wineryID, style, varterial, rating) values("Santa Digna Reserva Sauvignon Blanc 2014", "White Wine", 2014, 13.5, "Chile", 3, "Unavailable", "Sauvignon Blanc", 0);
insert into wines(wineName, type, year, alcoholContent, country, wineryID, style, varterial, rating) values("Miguel Torres Cordillera de Los Andes Chardonnay 2012", "White Wine", 2012, 13.5, "Chile", 3, "Full-bodied and Rich", "Chardonnay", 0);
insert into wines(wineName, type, year, alcoholContent, country, wineryID, style, varterial, rating) values("Miguel Torres Cordillera de los Andes Syrah 2010", "Red Wine", 2010, 14, "Chile", 3, "Unavailable", "Shiraz/Syrah", 0);
insert into wines(wineName, type, year, alcoholContent, country, wineryID, style, varterial, rating) values("Miguel Torres Altos Ibéricos Crianza 2011", "Red Wine", 2012, 14, "Spain", 3, "Medium-bodied and Fruity", "Tempranillo", 0);
insert into wines(wineName, type, year, alcoholContent, country, wineryID, style, varterial, rating) values("Miguel Torres Vina Esmeralda Semi Dry White Catalunya", "White Wine", 2012, 11.5, "Spain", 3, "Light and Crisp", "Blend", 0);
insert into wines(wineName, type, year, alcoholContent, country, wineryID, style, varterial, rating) values("Torres Grans Muralles 2006", "Red Wine", 2006, 15, "Spain", 3, "Unavailable", "Carignan/Grenache", 0);



--[CONSUMER_ID | FIRST_NAME, LAST_NAME, DOB, ADDRESS, PHONE_NO] √
--[WINE_ID | WINE_NAME, TYPE, YEAR, ALCNT, COUNTRY, STYLE, VRTL, RATING, WINERY_ID] √
--[WINERY_ID | NAME, YEAR_FOUNDED, LOCATION] √

--Insert songs
--LibOfMusJazz  -4

--insert into songs(songTitle, bookCode, page, student_number) values('LEROY THE MAGICIAN', 'RBK1‐5ed‐Bb', 261, '100878372');

/*
  Replace the above insert statements with ones that contribute your data
*/

end transaction;
