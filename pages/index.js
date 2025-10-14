import React from "react";
import Counter from "../components/Counter";
import { Provider } from "jotai";

const Home = () => {
  return (
    <Provider>
      <div>
        <h1>Home Page</h1>
        <Counter />
      </div>
    </Provider>
  );
};

export default Home;
