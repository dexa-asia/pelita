import routeSite from "./route_site.js";
import routeAuth from "./route_auth.js";
import routeDataset from "./route_dataset.js";
import routePublic from "./route_public.js";


const setupRoutes = (app) => {
    app.use('/', routeSite);
    app.use('/auth',routeAuth)
    app.use('/dataset', routeDataset);
    app.use('/public',routePublic)
    
};

export default setupRoutes;