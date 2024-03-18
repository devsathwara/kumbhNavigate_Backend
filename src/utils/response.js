
 function sendResponse(res, StatusCodes, data) {
  return res.status(StatusCodes).json({ data });
}

module.exports=sendResponse;