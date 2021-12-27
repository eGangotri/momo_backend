const puppeteer = require('puppeteer');

export const recieveCtrl = async (req: any, res: any, next: any) => {
  const data = req.body.data;
  try {
    console.log(`recieve ${JSON.stringify(data)}. scrape now`);

    const imgs = []
    for(let _url of data){
      console.log(`_url ${_url}`);
      const imgSrcs = await scrape(_url)
      imgs.push({
        url:_url,
        imgSrcs
      })
      res.send(imgs)
    }
  } catch (err) {
    next(err);
  }
};

async function scrape(url: any){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(1000);

    const imgSrcs = await page.$$eval("img", (imgs:any)=>{
      return imgs.map((x:any)=>x.src)
    });

    console.log(`imgSrcs ${imgSrcs}`)
    await browser.close();
    return imgSrcs
  }
