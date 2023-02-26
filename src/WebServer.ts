import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { TestRoute } from "./routes/TestRoute";

export class WebServer {
  private app = express();

  constructor() {
    this.setEnvironment();
    this.setHelmet();
    this.setCors();
    this.registerRoute();
  }

  // ====================================================================
  // @Public Methods
  // ====================================================================

  public start(): void {
    this.app.listen(process.env.PORT, () =>
      console.log(`API Server is running at port ${process.env.PORT}.`)
    );
  }

  // ====================================================================
  // @Private Methods
  // ====================================================================

  private setHelmet(): void {
    // this.app.use(helmet());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.hsts());
  }

  private setCors(): void {
    this.app.use(cors());
  }

  private setEnvironment(): void {
    dotenv.config({
      path: path.resolve(__dirname, `../environments/development.env`),
    });
  }

  private registerRoute(): void {

		const testRoute = new TestRoute();
    this.app.get("/", (req, res, next) => res.send("Hello!"));
		this.app.use("/Test", testRoute.router);
  }
}
