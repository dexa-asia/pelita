import routeSite from "./route_site.js";
import routeDataset from "./route_dataset.js";
import routeMember from "./route_member.js";
import routeUser from "./route_user.js";
import routeDpw from "./route_dpw.js";

const setupRoutes = (app) => {
    app.use('/', routeSite);
    app.use('/dataset', routeDataset);
    app.use('/member',routeMember)
    app.use('/user',routeUser)
    app.use('/dpw',routeDpw)
    
};

export default setupRoutes;