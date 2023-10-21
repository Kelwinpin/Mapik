import { ThemeProvider } from 'styled-components';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import New  from './pages/New';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function App() {

  const theme  = {
    primary: "#322153",
    secondary:"#6C63FF",
    background:"#F0F0F5",
    text:"#6C6C80",
    white:"#FFF"
  }

  return (
   <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home/>}/>
        <Route  path='/new' element={<New/>}/>
      </Routes>
    </BrowserRouter>
    <ToastContainer />
   </ThemeProvider>
  );
}