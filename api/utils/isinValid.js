const reqFiles = [
  "recipeName",
  "category",
  "recipeTime",
  "servingSuggestion",
  "ingredients",
  "instructions",
];

// nesnedeki değişkenlerin en az biri bile varsa true hepsi tamamsa false döndür

const isinValid = (data) => {
  return reqFiles.some((field) => !data[field]);
};

export default isinValid;
