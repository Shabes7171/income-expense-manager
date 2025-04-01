app.post('/invoice', async (req, res) => {
     const invoice = new Invoice(req.body);
     await invoice.save();
     res.send(invoice);
 });
 
 app.get('/invoice', async (req, res) => {
     const invoices = await Invoice.find();
     res.send(invoices);
 });
 
 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 