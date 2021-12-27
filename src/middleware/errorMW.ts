export const errorMW = (err: any, req: any, res: any, next: any) => {
    console.error('Error Handling MW' + err.message);
    console.log('Path: ', req.path)
    res.status(500).send('Something broke!');
  }