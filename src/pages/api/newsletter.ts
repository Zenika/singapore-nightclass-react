import { type NextApiRequest, type NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const body: { email: string } = JSON.parse(req.body);
    if (!body.email) {
      res.status(400).send({ message: "missing email in body" });
    } else {
      res.status(201).json({ registered: body.email });
    }
  } else {
    res.status(405).send({ message: "Only POST requests allowed" });
  }
}
