app.post('/stock', async (req, res) => {
     const stock = new Stock(req.body);
     await stock.save();
     res.send(stock);
 });
 
 app.get('/stock', async (req, res) => {
     const stock = await Stock.find();
     res.send(stock);
 });
 