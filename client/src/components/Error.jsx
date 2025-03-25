import React from "react";

const Error = ({ info, refetch }) => {
  return (
    <div className="flex flex-col">
      <div className="mt-40 bg-red-400 rounded-lg p-5 text-white text-lg text-center">
        <h1>Üzgünüz Bir Sorun oluştu ...</h1>
        <h1>{info} </h1>
      </div>
      <button
        className="btn mt-10 bg-blue-400 hover:bg-blue-300 p-2 rounded-lg text-white"
        onClick={refetch}
      >
        Tekrar dene
      </button>
    </div>
  );
};

export default Error;
