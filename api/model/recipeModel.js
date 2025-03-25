import fs from "fs";

// json dosyasının içeriğini oku

export const readRecipes = () => {
  try {
    const text = fs.readFileSync("./data.json", "utf-8");
    const data = JSON.parse(text);

    return data;
  } catch (error) {
    console.log(error);
  }
};

// parametre olarak aldığı veriyi yani (data) json dosyasına yazdır

export const writeRecipes = (data) => {
  try {
    fs.writeFileSync("./data.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
