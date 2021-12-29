const { Pool, Client } = require('pg');

//https://api.elephantsql.com/console/2b190722-3bf6-4e73-856a-6025b39c0263/browser?#

const connectionString =
  'postgres://ajovycks:eoDyXY-hiLB-fW0m0NLtfZy-HPuOuqWo@kashin.db.elephantsql.com/ajovycks';
const pool = new Pool({
  connectionString
});

export const closePool = ()=>{
    pool.end();
}

export const saveToDB = (data: Array<any>) => {
  const _values = data
    .map((element) => {
      return `( '${element.scraped_site}', '${element.url}', '${element.type}')`;
    })
    .join(',');

  const INSERT_QUERY = `
    INSERT INTO "public"."scraped_data"(scraped_site, url, _type) VALUES ${_values};
    `;
  console.log(`insert query = ${INSERT_QUERY}`);
  pool.query(INSERT_QUERY, (err: any, res: any) => {
    if (err) {
      console.log(err);
    }
  });
};

export const retrieveFromDB = async () => {
  const SELECT_QUERY = `SELECT * FROM "public"."scraped_data" LIMIT 100;`;
  console.log(`select query = ${SELECT_QUERY}`);

  const { rows } = await pool.query(SELECT_QUERY);
  console.log(`retrieveFromDB = ${JSON.stringify(rows)}`);
  return rows;
};

export const selectNow = (data: any) => {
  pool.query('SELECT NOW()', (err: any, res: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.rows);
    }
  });
};
