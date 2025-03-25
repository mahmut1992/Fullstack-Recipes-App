import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import DeleteButton from "../components/DeleteButton";

import { PiForkKnifeFill } from "react-icons/pi";
import { FaClock } from "react-icons/fa";

const Detail = () => {
  const { id } = useParams();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipes", id],
    queryFn: async () => {
      const res = await api.get(`/api/v1/recipes/${id}`);

      return res.data?.found || {};
    },
  });

  return (
    <div>
      <div>
        <div className="flex items-center justify-between mb-10">
          <Link
            className="flex items-center gap-2 bg-gray-400 p-3 rounded-lg text-white"
            to={-1}
          >
            <IoMdArrowRoundBack />
            Geri
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to={`/düzenle/${data?.id}`}
              className="flex items-center gap-2 bg-blue-500 p-3 rounded-lg text-white"
            >
              <MdEdit />
              Düzenle
            </Link>
            <DeleteButton disabled={!data?.id} id={data?.id} />
          </div>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        data && (
          <div>
            <h1 className="text-3xl">{data.recipeName} </h1>
            <div className="flex gap-4 my-5 font-semibold">
              <span className="badge">
                <PiForkKnifeFill /> {data.category}
              </span>
              <span className="badge">
                <FaClock /> {data.recipeTime} dak.
              </span>
            </div>
            <img
              className="rounded-lg max-h-[350px] w-full max-w-[800px]  "
              src={data.image}
              alt={data.recipeName}
            />
            <div className="my-5">
              <h2 className="title">Malzemeler</h2>
              <ul>
                {data.ingredients.map((i, key) => (
                  <li className="font-semibold text-lg" key={key}>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="my-5">
              <h2 className="title">Tarif</h2>
              <ol className="list-decimal ml-5">
                {data.instructions.map((i, key) => (
                  <li className="font-semibold text-lg" key={key}>
                    {i}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )
      )}
      {data && data.servingSuggestion && (
        <div>
          <h2 className="title">Sunum Önerisi</h2>
          <p className="font-semibold text-lg"> {data.servingSuggestion}</p>
        </div>
      )}
    </div>
  );
};

export default Detail;
