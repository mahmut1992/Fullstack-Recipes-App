import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api";
import { toast } from "react-toastify";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["recipes"],
    queryFn: () =>
      api.get(`/api/v1/recipes/${id}`).then((res) => res.data?.found),
  });
  const { isLoading, mutate } = useMutation({
    mutationFn: (updateData) => api.patch(`/api/v1/recipes/${id}`, updateData),

    onSuccess: () => {
      navigate("/");
      toast.success("Tarif Güncellendi");
    },

    onError: () => {
      toast.error("Tarif güncelenirken hata oluştu");
    },
  });
  return (
    <div>
      <h1 className="title">Tarifi Düzenle</h1>

      <Form isLoading={isLoading} mutate={mutate} recipeData={data} />
    </div>
  );
};

export default Update;
