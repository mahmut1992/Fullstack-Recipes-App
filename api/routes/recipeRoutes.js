import express from "express";
import {
  createRecipes,
  deleteRecipes,
  getAllRecipes,
  getRecipes,
  updateRecipes,
} from "../controllers/recipeControllers.js";
import controlId from "../middleware/controlId.js";

// Router server.js dosyasında route tanımı yapmamızı sağlar

const router = express.Router();

// Oluşturduğumuz router ın end-point route(yol) yollarını ve istek gelince çalışacak fonksiyonları belirle.

router.route("/api/v1/recipes").get(getAllRecipes).post(createRecipes);

router
  .route("/api/v1/recipes/:id")
  .get(controlId, getRecipes)
  .delete(controlId, deleteRecipes)
  .patch(controlId, updateRecipes);
export default router;
