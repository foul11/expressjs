import bodyParser from "body-parser";
import express from "express";

require('express-ws')(app);

const app = express();
const port = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));
app.use(ws);

app.get("/", async (req, res) => {
  res.json({ Hello: "World" });
});

app.ws('/echo', function(ws, req){
	ws.on('message', function(msg){
		ws.send(msg);
	});
});

app.use(function(err, req, res, next) {
	console.error('ERROR');
	console.error(err.stack);
	console.error(err);
	res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
