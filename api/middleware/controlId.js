import { readRecipes } from "../model/recipeModel.js";

const data = readRecipes();

const controlId = (req, res, next) => {
  // json dosyasındaki veriler arasında parametre ile gelen id li eleman var mı

  const found = data.find((item) => item.id == req.params.id);

  // id bulunamazsa hata gönder

  if (!found) {
    return res.status(404).json({ message: "Girilen ID bulunamadı" });
  }

  // req nesnesi içerisine bulunanı ekle

  req.foundRecipe = found;

  next();
};

export default controlId;
