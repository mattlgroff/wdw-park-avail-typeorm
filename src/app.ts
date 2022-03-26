import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import * as express from "express";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { Park } from "./entity/Park";

// create and setup express app
const app = express();
app.use(express.json());


(async () => {
  const connection = await createConnection({
    type: "postgres",
    url: process.env.CONNECTION_STRING,
    entities: [Park],
    synchronize: true
  });

  const parkRepository = connection.getRepository(Park);

  // create and setup express app
  const app = express();
  app.use(express.json());

  // register routes
  app.get("/parks", async function (req: Request, res: Response) {
    const parks = await parkRepository.find();
    res.json(parks);
  });

  app.get("/parks/:id", async function (req: Request, res: Response) {
    const results = await parkRepository.findOne({
      where: {
        id: req.params.id,
      }
    });
    return res.send(results);
  });

  const port = process.env.PORT || 3000;

  // start express server
  app.listen(port, () => {
    console.log(`Node backend for Park Availability is listening on Port: ${port}`);
  });
})();