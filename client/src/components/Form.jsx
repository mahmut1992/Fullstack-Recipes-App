import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select/creatable";

const Form = ({ isLoading, mutate, recipeData }) => {
  const [ingredients, setIngredients] = useState(recipeData?.ingredients || []);
  const handleSubmit = (e) => {
    e.preventDefault();

    // tüm inputlardaki verilere obje formatında eriş

    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());

    newRecipe.instructions = newRecipe.instructions.split(",");

    newRecipe.ingredients = ingredients;

    mutate(newRecipe);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-5 flex flex-col gap-7 max-w-[550px] mx-auto "
    >
      <Field label="Başlık">
        <input
          defaultValue={recipeData?.recipeName}
          type="text"
          name="recipeName"
          required
          className="inp"
        />
      </Field>
      <Field label="Kategori">
        <input
          defaultValue={recipeData?.category}
          type="text"
          className="inp"
          name="category"
          required
        />
      </Field>
      <Field label="Süre">
        <input
          defaultValue={recipeData?.recipeTime}
          type="text"
          className="inp"
          name="recipeTime"
          required
        />
      </Field>
      <Field label="Malzemeler" required>
        <Select
          isMulti
          value={ingredients?.map((i) => ({ value: i, label: i }))}
          onChange={(options) =>
            setIngredients(options.map((opt) => opt.value))
          }
        />
      </Field>
      <Field label="Tarif Adımları (, ile ayırınız) ">
        <textarea
          defaultValue={recipeData?.instructions}
          className="inp min-h-[80px] max-h-[200px] "
          required
          name="instructions"
        ></textarea>
      </Field>
      <Field label="Sunum Önerisi">
        <textarea
          defaultValue={recipeData?.servingSuggestion}
          className="inp min-h-[80px] max-h-[200px] "
          name="servingSuggestion"
        ></textarea>
      </Field>
      <div className="flex justify-end gap-6">
        <Link
          className="bg-gray-400 p-3 rounded-lg cursor-pointer hover:text-white transition"
          to="/"
        >
          Geri
        </Link>
        <button
          disabled={isLoading}
          className="bg-red-400 p-3 rounded-lg cursor-pointer hover:text-white transition"
          type="submit"
        >
          {recipeData ? "Güncelle" : "Oluştur"}
        </button>
      </div>
    </form>
  );
};

export default Form;

const Field = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label} </label>
      {children}
    </div>
  );
};
