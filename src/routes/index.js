import alimentacionRoutes from "./alimentacionRoutes.js";
import usuarioRoutes from "./usuarioRoutes.js";
import loginRoutes from "./loginRoutes.js";
import ganadoRoutes from "./ganadoRoutes.js";
import reproduccionRoutes from "./reproduccionRoutes.js"
import produccionRoutes from "./produccionRoutes.js"
const routesApi = (app) => {

  const routes = [alimentacionRoutes,usuarioRoutes,loginRoutes,ganadoRoutes,reproduccionRoutes,produccionRoutes]
  routes.forEach(ruta => {
    app.use("/api", ruta);
  })

  app.get("/load", (req, resp) => {
    resp.send("Api Loading");
  });
};

export { routesApi };
