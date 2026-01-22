import routeSite from "./route_site.js";
import routeDataset from "./route_dataset.js";
import routeMember from "./route_member.js";

const setupRoutes = (app) => {
    app.use('/', routeSite);
    app.use('/dataset', routeDataset);
    app.use('/member',routeMember)
   
    
};

export default setupRoutes;