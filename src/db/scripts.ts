const CREATE_TABLE = `
CREATE TABLE scraped_data(
    _id    SERIAL PRIMARY KEY,
    scraped_site varchar(100) NOT NULL CHECK (scraped_site <> ''),
    url varchar(200) NOT NULL CHECK (url <> ''),
    _type varchar(10) NOT NULL CHECK (_type <> '')
);

`