const {Router} = require("express");
const { isAuthenticated } = require("../middleware/auth");
const appRouter = Router();
const {createContact, registeruser, loginuser, getSingleUser, getAllUsers, updateUser, createUser} = require("./controllers/userController");
const { getAllProducts, createProduct, deleteProduct, updateProduct } = require("./controllers/productsController");

appRouter.post("/contact", createContact)
appRouter.post("/register", registeruser)
appRouter.post("/login", loginuser)
appRouter.get("/getuser", isAuthenticated, getSingleUser);
appRouter.get("/users", getAllUsers);
appRouter.patch("/update/:id", updateUser);
appRouter.post("/createuser", createUser);

// product routes can be added here later
appRouter.get("/products", getAllProducts);
appRouter.post("/products", createProduct);
appRouter.delete("/products/:id", deleteProduct);
appRouter.patch("/products/:id", updateProduct);

module.exports = appRouter;