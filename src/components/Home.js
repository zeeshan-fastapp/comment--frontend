import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "./Button";
import Comment from "./Comment";

function Home() {
  const history = useHistory();

  useEffect(() => {
    console.log("hello");
    if (!window.localStorage.getItem("token")) {
      // eslint-disable-next-line no-restricted-globals
      history.push("/login");
    }
  }, []);
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl w-full px-4 sm:px-6 mx-auto">
        <div className="bg-red-500 w-full h-48"></div>
        <div className="mt-4">
          <Comment />
        </div>
      </div>
    </div>
  );
}

export default Home;
