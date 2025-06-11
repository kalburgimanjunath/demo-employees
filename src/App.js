import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/employee/:id" element={<Home/>}></Route>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
