import { readRecipes, writeRecipes } from "../model/recipeModel.js";
import isinValid from "../utils/isinValid.js";
import crypto from "crypto";

const data = readRecipes();

//! bütün yemek tariflerini al

export const getAllRecipes = (req, res) => {
  // tarif verisinin bir kopyasını oluştur

  let recipes = [...data];

  // aratılan kelime

  const search = req.query?.search?.toLowerCase();

  // eğer searc paremetresi geldiyse fitreleme yap

  if (search) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search)
    );
  }

  // eğer order parametresi geldiyse sıralama yapsın
  if (req.query.order) {
    recipes.sort((a, b) =>
      req.query.order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  res.status(200).json({
    message: "Bütün yemek tarifleri alındı",
    result: recipes.length,
    recipesi: recipes,
  });
};

//! yeni yemek tarifi ekle

export const createRecipes = (req, res) => {
  // isteğin body bölümünden gelen veriye erişelim
  let newRecipe = req.body;

  // veri bütünlüğünü kontrol et

  if (isinValid(newRecipe)) {
    return res
      .status(4040)
      .json({ message: "Lütfen tüm değerleri giriniz..." });
  }

  // veriye ıd ve foto ekle
  newRecipe = {
    ...newRecipe,
    id: crypto.randomUUID(),
    image: `https://picsum.photos/seed/${crypto.randomUUID()}/500/500`,
  };

  // tarif verisini diziye ekle
  data.push(newRecipe);

  // json dosyasını güncelle
  writeRecipes(data);

  //cevap gönder
  res.status(201).json({ message: "Bir yemek tarifi ekle", recipe: newRecipe });
};

//! bir yemek tarifini al

export const getRecipes = (req, res) => {
  res.status(200).json({
    message: "Bir yemek tarifi alındı",
    result: [req.foundRecipe].length,
    found: req.foundRecipe,
  });
};

//! bir yemek tarifini sil

export const deleteRecipes = (req, res) => {
  // silinecek ID li verinin sırasını bul

  const index = data.findIndex((item) => item.id == req.params.id);

  // elemanı diziden kaldır

  const deleteRecipe = data.splice(index, 1);

  // json dosyasını güncelle

  writeRecipes(data);

  res.status(202).json({ deleteRecipe: deleteRecipe });
};

//! bir yemek tarifini güncelle

export const updateRecipes = (req, res) => {
  // eski tarif nesnesini güncelle

  const updated = { ...req.foundRecipe, ...req.body };

  // güncellenecek elemanın sırasını bul
  const index = data.findIndex((item) => item.id == req.params.id);

  // diziyi güncelle

  data.splice(index, 1, updated);

  writeRecipes(data);

  res
    .status(200)
    .json({ message: "Bir yemek tarifini güncelle", recipe: updated });
};
