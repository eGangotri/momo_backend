const { Pool, Client } = require('pg');
const connectionString =
  'postgres://ajovycks:eoDyXY-hiLB-fW0m0NLtfZy-HPuOuqWo@kashin.db.elephantsql.com/ajovycks';
const pool = new Pool({
  connectionString
});

export const saveToDB = (data: Array<any>) => {
  const _values = data
    .map((element) => {
      return `( '${element.url}', '${element.imgSrcs}')`;
    })
    .join(',');

  const INSERT_QUERY = `
    INSERT INTO "public"."scraped_data"(website, urlsAsCSV) VALUES ${_values};
    `;
  console.log(`insert query = ${INSERT_QUERY}`);
  pool.query(INSERT_QUERY, (err: any, res: any) => {
    if (err) {
      console.log(err);
    }
    pool.end();
  });
};

export const retrieveFromDB = async () => {
  const SELECT_QUERY = `SELECT * FROM "public"."scraped_data" LIMIT 100;`;
  console.log(`select query = ${SELECT_QUERY}`);

  const { rows } = await pool.query(SELECT_QUERY);
  console.log(`retrieveFromDB = ${JSON.stringify(rows)}`);

  pool.end();
  return rows;
};

export const selectNow = (data: any) => {
  pool.query('SELECT NOW()', (err: any, res: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.rows);
    }
    pool.end();
  });
};
