module.exports.getIP = async (req, res, next) => {
    var ip = (
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      null
    ).split(",")[0].replace("::ffff:","");
    req.ip_address = ip;
    next();
  };