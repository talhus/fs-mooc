const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogController");
const { unknownEndpoint } = require("./utils/middleware");
const app = express();

app.use(express.json());
mongoose.connect(config.MONGODB_URI, { family: 4 });

app.use("/api/blogs", blogRouter);
app.use(unknownEndpoint)

const PORT = config.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
