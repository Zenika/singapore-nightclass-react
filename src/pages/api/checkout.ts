import { type NextApiRequest, type NextApiResponse } from "next";
import crypto from "crypto";
import { orderSchema } from "~/models/order";
import { z } from "zod";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-argument
    const safelyParsedBody = orderSchema.safeParse(JSON.parse(req.body));
    if (!safelyParsedBody.success) {
      res.status(400).send(safelyParsedBody.error.errors);
    } else {
      const uuid = crypto.randomUUID();
      const order = { ...safelyParsedBody, uuid };
      console.log(`{NEW ORDER}[${uuid}] => ${JSON.stringify(order)}`);
      res.status(201).json({ orderId: uuid });
    }
  } else {
    res.status(405).send({ message: "Only POST requests allowed" });
  }
}
