import { Link } from "react-router-dom";
import { TbClockHour8 } from "react-icons/tb";

const Card = ({ recipe }) => {
  return (
    <Link className=" rounded-lg p-4" to={`/tarif/${recipe.id}`}>
      <div className="relative">
        <img
          className="rounded-lg h-[200px] w-full object-cover "
          src={recipe.image}
          alt={recipe.recipeName}
        />
        <p className="absolute bottom-1 left-1 bg-red-400 text-white rounded-lg py-1 px-2 font-semibold flex items-center gap-2">
          <TbClockHour8 />
          <span>{recipe.recipeTime} dakika</span>
        </p>
      </div>
      <h2 className="my-3 text-xl font-semibold">{recipe.recipeName} </h2>
      <p className="text-gray-500">{recipe.category} </p>
      <p className="flex gap-3 mt-3">
        <span className="bg-gray-300 rounded-md p-1 line-clamp-1">
          {recipe.ingredients[0]}
        </span>
        <span className="bg-gray-300 rounded-md p-1 line-clamp-1">
          {recipe.ingredients[1]}
        </span>
      </p>
    </Link>
  );
};

export default Card;
