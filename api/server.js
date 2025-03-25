import express from "express";
import cors from "cors";
import recipeRouter from "./routes/recipeRoutes.js";

// express kurulumu

const app = express();

const port = 4004;

// cors hatalarını önleyen middleware

app.use(cors());

// body deki json verilerini bize açan middleware

app.use(express.json());

// tarifler için crud operasyonlarını gerçekleştireceğimiz endpointleri tanımla
app.use(recipeRouter);

app.listen(port, () => {
  console.log(`Server ${port}. portunda çalışmaya başladı`);
});

// server da kullanmak için routeri export et
