import { RouteBase } from "./RouteBase";

export class TestRoute extends RouteBase {
  constructor() {
    super();
  }

  protected registerRoute(): void {
    this.router.get("/test", (req, res, next) => res.send("todo test."));
  }
}
