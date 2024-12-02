import mongoose, { Schema, Document } from 'mongoose';

const WordsCacheSchema: Schema = new Schema({
    term: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now, expires: 86400 }, // Expira em 1 dia
});

export default mongoose.model('WordsCache', WordsCacheSchema);
