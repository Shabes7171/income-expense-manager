app.post('/transaction', async (req, res) => {
     const transaction = new Transaction(req.body);
     await transaction.save();
     res.send(transaction);
 });
 
 app.get('/transaction', async (req, res) => {
     const transactions = await Transaction.find();
     res.send(transactions);
 });
 