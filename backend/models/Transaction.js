const Transaction = mongoose.model('Transaction', new mongoose.Schema({
     category: String,
     amount: Number,
     type: String // income or expense
 }));