import express from "express";
import process from "node:process";
import * as dotenv from "dotenv-flow";
import cors from "cors";
import { join } from "path";

dotenv.config({
	default_node_env: "development",
});

const app = express();
app.use(cors());

const outputPath = join(process.env.USERPROFILE, "Desktop", process.env.DOWNLOADS_FOLDER_NAME);
let imageBuffer;
let missingSongs = [];

app.get("/api/v1/test", async (req, res) => {});

app.listen(parseInt(process.env.PORT), () => {
	console.log(`Server running in http://localhost:${parseInt(process.env.PORT)}`);
	console.log("Available routes:");
	app._router.stack.forEach((r) => {
		if (r.route && r.route.path) {
			console.log(`${Object.keys(r.route.methods)} ${r.route.path}`);
		}
	});
});
