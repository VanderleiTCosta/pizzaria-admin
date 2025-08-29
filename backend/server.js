import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import professionalRouter from "./routes/professionalRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import categoryRouter from "./routes/categoryRoute.js";
import stateRouter from "./routes/stateRoute.js";

// Importe o http e o Server do socket.io
import http from "http";
import { Server } from "socket.io";

// Config da app
const app = express();
const port = process.env.PORT || 4000;

// Crie o servidor http a partir da sua app Express
const server = http.createServer(app);

// Inicie o Socket.IO e configure o CORS para ele também
const io = new Server(server, {
  cors: {
    origin: "*", // Permite todas as origens, ajuste se necessário
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Conexão com DB
connectDB();

// Middleware para injetar o 'io' em todas as requisições
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Endpoints da API
app.use("/api/professional", professionalRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/state", stateRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Evento de conexão do Socket.IO (opcional, bom para debug)
io.on('connection', (socket) => {
  console.log('Um cliente se conectou:', socket.id);
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Mude a última linha para usar o servidor http
server.listen(port, () => {
  console.log(`Servidor iniciado na porta http://localhost:${port}`);
});