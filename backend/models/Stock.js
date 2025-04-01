const Stock = mongoose.model('Stock', new mongoose.Schema({
     name: String,
     vendor: String,
     quantity: Number,
     price: Number,
     type: String // purchase or sale
 }));