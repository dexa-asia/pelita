import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 300, // default TTL = 5 minutes
  checkperiod: 60, // how often to clean expired keys
});

export default cache;
