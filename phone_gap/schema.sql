

CREATE TABLE IF NOT EXISTS medicine (id INTEGER PRIMARY KEY, name VARCHAR, dosage VARCHAR, remind BOOLEAN);    

CREATE TABLE IF NOT EXISTS medicine_timing (medicine INTEGER, medicine_time TIME, am_pm VARCHAR, FOREIGN KEY (medicine) REFERENCES medicine(id));

CREATE TABLE IF NOT EXISTS medicine_stock (medicine INTEGER, place VARCHAR, quantity INTEGER, FOREIGN KEY (medicine) REFERENCES medicine(id));


