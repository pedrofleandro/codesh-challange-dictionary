import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
  term: { type: String, required: true, unique: true },
});

const Word = mongoose.model('words', WordSchema);
export default Word;
