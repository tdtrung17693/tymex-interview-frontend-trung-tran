const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const port = 5005;
server.use(middlewares);

router.render = (req, res) => {
  const params = new URLSearchParams(req.url.split("?")[1]);
  const page = params.get("_page");
  const limit = params.get("_limit");
  if (page && limit && res.locals.data) {
    const totalCount = res.get("X-Total-Count");

    const data = Array.isArray(res.locals.data) ? res.locals.data : [];

    res.jsonp({
      data: data,
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total: totalCount ? parseInt(totalCount, 10) : data.length,
      },
    });
  } else {
    res.jsonp(res.locals.data);
  }
};

server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
});
