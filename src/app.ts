import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

export class App {
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

  public bootstrap(): void {
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
    this.app.get("/", (req, res, next) => res.send("Hello!"));
  }
}
