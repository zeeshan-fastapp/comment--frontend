import React from "react";

function FormWrapper({ children }) {
  return (
    <div className="bg-white shadow-sm rounded-md px-5 py-6 flex flex-col sm:mx-auto sm:w-full sm:max-w-sm">
      {children}
    </div>
  );
}

export default FormWrapper;
