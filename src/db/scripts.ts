const CREATE_TABLE = `
CREATE TABLE scraped_data(
    _id    SERIAL PRIMARY KEY,
    website   varchar(100) NOT NULL CHECK (website   <> ''),
    urlsAsCSV   varchar(1000) NOT NULL CHECK (urlsAsCSV   <> '')
);
`