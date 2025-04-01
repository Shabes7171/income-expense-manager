const Invoice = mongoose.model('Invoice', new mongoose.Schema({
     items: Array,
     total: Number,
     date: { type: Date, default: Date.now }
 }));