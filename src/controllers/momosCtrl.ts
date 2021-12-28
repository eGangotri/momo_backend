const puppeteer = require('puppeteer');
const POSTGRES = require("../db/postgres");

export const scrapeCtrl = async (req: any, res: any, next: any) => {
  const data = req.body.data;
  try {
    console.log(`recieve ${JSON.stringify(data)}. scrape now`);
    
    const imgJSON = []
    for(let _url of data){
      console.log(`_url ${_url}`);
      const imgSrcs = await scrape(_url)
      imgJSON.push({
        url:_url,
        imgSrcs
      })
    }
    POSTGRES.saveToDB(imgJSON);
    res.json(imgJSON)
  } catch (err) {
    next(err);
  }
};

export const retrieveCtrl = async(req: any, res: any, next: any) => {
  try {
    POSTGRES.retrieveFromDB().then((dbResponse:any)=>{
      res.json(dbResponse)
    });
  } catch (err) {
    next(err);
  }
}

async function scrape(url: any){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(1000);

    const imgSrcs = await page.$$eval("img", (imgs:any)=>{
      return imgs.map((x:any)=>x.src)
    });

    console.log(`imgSrcs ${imgSrcs}`)
    await browser.close();
    return imgSrcs
  }
