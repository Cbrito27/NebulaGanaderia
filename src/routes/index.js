import alimentacionRoutes from "./alimentacionRoutes.js"
import usuarioRoutes from "./usuarioRoutes.js"
import loginRoutes from "./loginRoutes.js"
const routesApi = (app) => {

  const routes = [alimentacionRoutes,usuarioRoutes,loginRoutes]
  routes.forEach(ruta => {
    app.use("/api", ruta);
  })

  app.get("/load", (req, resp) => {
    resp.send("Api Loading");
  });
};

export { routesApi };
