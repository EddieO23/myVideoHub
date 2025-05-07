const sendResponse = (res, status, success, message, data = {}) => {
  res.status(status).send({ success, message, ...data });
};

export default sendResponse;
