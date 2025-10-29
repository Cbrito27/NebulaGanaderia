import alimentacionRoutes from "./alimentacionRoutes.js"

const routesApi = (app) => {

  const routes = [alimentacionRoutes]
  routes.forEach(ruta => {
    app.use("/api", ruta);
  })

  app.get("/load", (req, resp) => {
    resp.send("Api Loading");
  });
};

export { routesApi };
