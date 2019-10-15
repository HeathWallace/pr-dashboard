/* eslint-disable no-console */
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const yaml = require("js-yaml");
const fs = require("fs");

const loadPRs = require("./api/loadPRs");

let servers = [];

try {
	const { servers: _servers } = yaml.safeLoad(
		fs.readFileSync("config.yaml", "utf8"),
	);
	servers = _servers.map(({ url, auth }) => ({
		url,
		headers: { Authorization: auth },
	}));
} catch (e) {
	console.error(e);
}

const port = process.env.PORT || 3021;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const ONE_MINUTE = 60000;

app.use(express.static(path.join(__dirname, "dist")));

const router = express.Router();
router.get("/", (req, res) => res.sendStatus(200));
app.use(router);

let PRs = [];
let lastUpdated = 0;

async function emitPRs({ force = false } = {}) {
	if (io.engine.clientsCount === 0) {
		console.log("No clients connected, skipping update");
	}

	if (force || io.engine.clientsCount > 0) {
		force && console.log(`Force update, updating cache...`);
		console.log(
			`${io.engine.clientsCount} clients connected, updating cache...`,
		);
		io.emit("loading");
		try {
			PRs = await loadPRs(servers);
			lastUpdated = Date.now();
			io.emit("prs", { PRs, lastUpdated });
		} catch (e) {
			console.log("Failed to fetch PRs:");
			console.log(e);
		}
	}
	console.log("Done");
	setTimeout(emitPRs, ONE_MINUTE);
}

emitPRs({ force: true }).then(() => (lastUpdated = Date.now()));

io.on("connection", socket => {
	console.log(`New client connected (${io.engine.clientsCount})`);
	socket.emit("prs", { PRs, lastUpdated });
	socket.on("disconnect", () =>
		console.log(`Client disconnected (${io.engine.clientsCount})`),
	);
});

server.listen(port, () => console.log(`Listening on port ${port}`));
