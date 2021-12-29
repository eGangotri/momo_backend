const puppeteer = require('puppeteer');
const POSTGRES = require("../db/postgres");

export const scrapeCtrl = async (req: any, res: any, next: any) => {
  const data = req.body.data;
  try {
    console.log(`recieve ${JSON.stringify(data)}. scrape now`);
    
    let collectedData:Array<any> = []
    for(let _url of data){
      console.log(`_url ${_url}`);
      let scrapedData:any = await scrape(_url)
      let imgSrcs = scrapedData.imgSrcs;
      let videoSrcs = scrapedData.videoSrcs;

      console.log(`imgSrcs ${imgSrcs}`);

      imgSrcs.forEach((imgSrc:any) =>{
        collectedData.push({
          scraped_site:_url,
          url:imgSrc,
          type:'I'
        })
      })

      videoSrcs.forEach((videoSrc:any) =>{
        collectedData.push({
          scraped_site:_url,
          url:videoSrc,
          type:'V'
        })
      })

    }

   POSTGRES.saveToDB(collectedData);

    res.json(collectedData);
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
    await page.setDefaultNavigationTimeout(0); 

    await page.goto(url);
    await page.waitForTimeout(1000);

    const imgSrcs = await page.$$eval("img", (imgs:any)=>{
      return imgs.map((x:any)=>x.src)
    })

    const videoSrcs = await page.$$eval("video > source", (videos:any)=>{
      return videos.map((x:any)=>x.src)
    })

    console.log(`imgSrcs ${imgSrcs}`)
    console.log(`videoSrcs ${videoSrcs}`)
    
    await browser.close();
    return {
      imgSrcs: imgSrcs,
      videoSrcs: videoSrcs,
    }
  }
