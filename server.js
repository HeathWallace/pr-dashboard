/* eslint-env node */
/* eslint-disable no-console */
const Koa = require("koa");
const Router = require("koa-router");
const koaStatic = require("koa-static");
const cors = require("@koa/cors");

const loadPRs = require("./api/loadPRs");

const app = new Koa();
const router = new Router();

/* global process */
const port = process.env.PORT || 3001;

const servers = [
	{
		url: "https://bitbucket.uhub.biz",
		token: "",
	},
	{
		url: "https://hsbc-bitbucket.heathwallace.com",
		token: "",
	},
];

router.get(
	"/api/pull-requests",
	async ctx => (ctx.body = await loadPRs(servers)),
);

app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(koaStatic("dist"));
app.listen(port);
console.log(`Listening on ${port}`);
