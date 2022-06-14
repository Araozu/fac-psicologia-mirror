import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStandard({estandar}) {
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
            <h1 className="text-4xl font-bold text-white">{estandar.n}</h1>
            <p className="text-lg text-white">{estandar.titulo}</p>
        </div>
      </div>
    </>
  );
}
