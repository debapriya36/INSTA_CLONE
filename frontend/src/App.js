import './App.css';
import React, { createContext, useState } from "react";
import Navbar from './components/Navbar';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Profile from './components/Profile';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import CreatePost from './components/CreatePost';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "./context/LoginContext";
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';


function App() {
  const [userLogin,setUserLogin]=useState(false);
  const [modalOpen,setModalOpen]=useState(false);

  return (
    <div className="App">
    <BrowserRouter>
    <LoginContext.Provider value={{setUserLogin , setModalOpen}}>
    <Navbar login={userLogin} />
      <Routes>
         <Route exact path="/"  element={<Home/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact  path="/profile" element={<Profile/>}/>
          <Route exact path="/signin" element={<Signin/>}/>
          <Route exact path="/createpost" element={<CreatePost/>}/>
          {/* <Route exact path="/followingpost" element={<MyFollowingPost/>}/> */}
          <Route  path="/profile/:userid" element={<UserProfile/>}/>
      </Routes>
      <ToastContainer theme='dark'/>
      {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
    </LoginContext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
