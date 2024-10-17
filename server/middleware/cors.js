// unused file will be deleted in future
const corsHeaders = (_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept,x-Request-with  Content-Type, Authorization"
  );
  next();
};

export default corsHeaders;
