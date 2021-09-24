import React from "react";

function Button({ children, onSubmit }) {
  return (
    <>
      <button
        type="submit"
        onClick={onSubmit}
        className="px-5 py-3 text-white rounded-md mt-6 bg-indigo-600 focus:outline-none"
      >
        {children}
      </button>
    </>
  );
}

export default Button;
