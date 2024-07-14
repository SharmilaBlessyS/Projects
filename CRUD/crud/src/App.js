import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Info from "./Info";
import Header from "./Header";
import Update from "./Update"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/update/:id" element={<Update />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
