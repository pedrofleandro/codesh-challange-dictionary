import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router';

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: "Fullstack Challenge 🏅 - Dictionary" });
});

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server runing on http://localhost:8080/');
});

const MONGO_URL = "mongodb+srv://pedrofragosoleandro:iL5NEWOr6Ggluayi@cluster0.8tfxs.mongodb.net/codesh-dictionary?retryWrites=true&w=majority&appName=Cluster0";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log('Erro ao connectar com o Banco de Dados' + error));

app.use('/', router());