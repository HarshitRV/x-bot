import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT = process.env.PORT || 8500;
const startTime = new Date();

app.route("/status").get((req: Request, res: Response) => {
	const uptime = new Date().getTime() - startTime.getTime();
	return res.status(200).json({ message: "Server is up", uptime });
});

app.listen(PORT, () => {
	console.log("🚀 Server is running on port:", PORT);
});
