import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { LoaderSm } from "./Loader";

const DeleteButton = ({ id }) => {
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: () => api.delete(`/api/v1/recipes/${id}`),
    onSuccess: () => {
      navigate("/");
      toast.success("tarif Kaldırıldı");
    },

    onError: () => {
      toast.error("Tarif Silinemedi");
    },
  });

  return (
    <button
      disabled={isLoading}
      onClick={mutate}
      className="bg-red-500 flex gap-2 items-center p-3 min-w-[75px] rounded-lg text-white "
    >
      {isLoading ? (
        <LoaderSm />
      ) : (
        <>
          <FaTrashAlt />
          Sil
        </>
      )}
    </button>
  );
};

export default DeleteButton;
