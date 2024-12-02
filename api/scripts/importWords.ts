import mongoose from 'mongoose';
import fs from 'fs/promises';

// Conecta ao MongoDB 
const connectToMongoDB = async () => {
  const MONGO_URL = 'mongodb+srv://pedrofragosoleandro:iL5NEWOr6Ggluayi@cluster0.8tfxs.mongodb.net/codesh-dictionary?retryWrites=true&w=majority&appName=Cluster0';

  try {
    mongoose.Promise = Promise;
    mongoose.connect(MONGO_URL);
    console.log('Conectado ao MongoDB com sucesso!');
  }catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}

// Definir o Modelo de Palavra
const WordSchema = new mongoose.Schema({
  term: {type: String, require: true, unique: true}, 
});

const Word = mongoose.model('Word', WordSchema);

// Ler o Arquivo com as Palavras
const readWordsFromFile = async (filePath: string): Promise<string[]> => {
  try{
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return fileContent.split('\n').map(word => word.trim()).filter(Boolean);
  }catch (error){
    console.error('Erro ao ler arquivo', error);
    return []
  }
}

// Importar Palavras para o Banco de Dados
const importWordsToDB = async (words: string[]) => {
  try {
    for (const word of words) {
      await Word.create({term: word});
    }
    console.log('Palavras importadas com sucesso!')
  } catch (error) {
    console.error('Erro ao imprimir palavras:', error)
  }
}

// Script Principal
const main = async () => {
  await connectToMongoDB();
  const words = await readWordsFromFile('./data/words.txt');
  if(words.length > 0) {
    await importWordsToDB(words);
  }else{
    console.log('Nenhuma palavra encontrada no arquivo.')
  }
  mongoose.connection.close();
}

main();