import { useMutation } from "@tanstack/react-query";
import Form from "../components/Form";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: (newRecipe) => api.post("/api/v1/recipes", newRecipe),

    onSuccess: () => {
      toast.success("Yeni Tarif Oluşturuldu");
      navigate("/");
    },
    onError: () => {
      toast.error("Bir Sorun Oluştu");
    },
  });

  return (
    <div>
      <h1 className="text-2xl text-red-500 font-semibold">
        Yeni Tarif Oluştur
      </h1>

      <Form isLoading={isLoading} mutate={mutate} />
    </div>
  );
};

export default Create;
