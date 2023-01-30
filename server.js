const express = require("express");
const cors = require("cors");

const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};



// 导入 express 和 cors 模块：Express 用于构建 Rest api
// cors 提供了 Express 中间件来启用具有各种选项的 CORS。
app.use(cors(corsOptions));
// parse requests of content-type - application/json
// app.use() 方法添加主体解析器（json 和 urlencoded）
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


const db = require("./app/models");

/*
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

*/
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});


require("./app/routes/turorial.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});