import express, { Application, Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { connectDatabase } from "./config/mongoose";
import appRoutes from "./routes";
import swaggerDoc from "./docs.json";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc, { customSiteTitle: "Orange Brix API" }));

app.get("/", (req: Request, res: Response) => {
  res.redirect("/docs");
});

app.use("/api", appRoutes(app));

app.listen(5000, async () => {
  const database = await connectDatabase();
  if (database) {
    console.log(`[database]: Database is running at ${database.host}/${database.name}`);
  }
  console.log(`[server]: Server is running at https://localhost:5000`);
});
