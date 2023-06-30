import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LayOut from "./layout/LayOut";
import Home from "./pages/Home";
import PrivateRouter from "./layout/PrivateRouter";
import Login from "./pages/Login";
import UploadAward from "./pages/UploadAward";
import MyAwards from "./pages/MyAwards";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<PrivateRouter />}>
              <Route element={<LayOut />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/upload-awards" element={<UploadAward />} />
                  <Route path="/my-awards" element={<MyAwards />} />
              </Route>
          </Route>
          <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
