import { type NextApiRequest, type NextApiResponse } from "next";
import crypto from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument
    const body: unknown = JSON.parse(req.body);
    if (!body) {
      res.status(400).send({ message: "missing body" });
    } else {
      const uuid = crypto.randomUUID();
      const order = { ...body, uuid };
      console.log(`{NEW ORDER}[${uuid}] => ${JSON.stringify(order)}`);
      res.status(201).json({ orderId: uuid });
    }
  } else {
    res.status(405).send({ message: "Only POST requests allowed" });
  }
}
