import routeSite from "./route_site.js";
import routeDataset from "./route_dataset.js";

const setupRoutes = (app) => {
    app.use('/', routeSite);
    app.use('/dataset', routeDataset);
    
};

export default setupRoutes;