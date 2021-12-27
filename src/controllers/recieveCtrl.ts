export const recieveCtrl =  (req:any, res:any, next:any) => {
    const data = req.body.data;
    try {
      throw new Error('BROKEN')
    } catch (err) {
      next(err)
    }
    console.log(data.y + 1 );
    console.log(`recieve ${JSON.stringify(data)}`);
    res.send('recieve request to the homepage');
  }

