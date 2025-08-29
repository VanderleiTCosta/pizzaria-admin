import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import professionalRouter from './routes/professionalRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import stateRouter from './routes/stateRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'

// Configuração do app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Conexão com o BD
connectDB();

// Rotas da API
app.use('/api/professional', professionalRouter);
app.use('/api/category', categoryRouter);
app.use('/api/state', stateRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);


app.get('/', (req, res) => {
  res.send('API Funcionando');
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta http://localhost:${port}`);
});