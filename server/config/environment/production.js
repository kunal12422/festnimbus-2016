'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          8080,

  // MongoDB connection options
  //mongo: {
  //  uri:  process.env.MONGOLAB_URI ||
  //        process.env.MONGOHQ_URL ||
  //        process.env.OPENSHIFT_MONGODB_DB_URL +
  //        process.env.OPENSHIFT_APP_NAME ||
  //        'mongodb://localhost/coderdecoder2'
  //}

  mongo: {
    scheme: "mongodb",
    host: "kunal12422:changeit@ds021999.mlab.com:21999",
    databaseName: "festnimbus"

  }
};
