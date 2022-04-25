import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { InputForm } from "./components/InputForm";

function App() {
  return (
    <div className="App">
      <div>Welcome to Customer Address Repository</div>
      <div className="mx-auto w-75">
        <InputForm />
      </div>
    </div>
  );
}

export default App;
