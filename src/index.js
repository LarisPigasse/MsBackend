import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

import indexRouter from "./routes/indexRouter.js";
import utentiRouter from "./routes/utentiRouter.js";
import prodottiRouter from "./routes/prodottiRouter.js";
import authRouter from "./routes/authRouter.js";
import dipendentiRouter from "./routes/dipendentiRouter.js";
import contattiRouter from "./routes/contattiRouter.js";
import fornitoriRouter from "./routes/fornitoriRouter.js";
import categorieRouter from "./routes/categorieRouter.js";
import sottocategorieRouter from "./routes/sottocategorieRouter.js";
import articoliRouter from "./routes/articoliRouter.js";
import operatoriRouter from "./routes/operatoriRouter.js";

import aliquoteRouter from "./routes/aliquoteRouter.js";
import variantiRouter from "./routes/variantiRouter.js";
import attributiRouter from "./routes/attributiRouter.js";
import produttoriRouter from "./routes/produttoriRouter.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.__rootdir = path.resolve(__dirname);

// Middlewares
dotenv.config();

// Routes
app.use(express.json());
app.use(cors());
// app.use('/static', express.static(path.join(__dirname, 'public/static')));
app.use(express.static('public'));
// CORS
// const whitelist = ['http://localhost:5173'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.includes(origin)) {
//       // OK
//       callback(null, true);
//     } else {
//       // NO AUTH
//       callback(new Error("Error de Cors"));
//     }
//   },
// };
// app.use(cors(corsOptions));

app.use("/api",indexRouter);
app.use("/api/auth",authRouter);
app.use("/api/utenti",utentiRouter);
app.use("/api/prodotti",prodottiRouter);
app.use("/api/dipendenti",dipendentiRouter);
app.use("/api/contatti",contattiRouter);
app.use("/api/fornitori",fornitoriRouter);
app.use("/api/categorie",categorieRouter);
app.use("/api/sottocategorie",sottocategorieRouter);
app.use("/api/articoli",articoliRouter);
app.use("/api/operatori",operatoriRouter);

app.use("/api/aliquote",aliquoteRouter);
app.use("/api/varianti",variantiRouter);
app.use("/api/attributi",attributiRouter);
app.use("/api/produttori",produttoriRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Noot found" });
});

const port = process.env.PORT || 4020;
app.listen(port, () => console.log(`Server ON ${port}`));