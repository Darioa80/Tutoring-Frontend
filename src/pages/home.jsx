import React, { useContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import "../scss/text.scss";
import "../scss/wrap.scss";
import MainGrid from "../components/main-grid";
import Login from "../components/Navigation/Login";
import { BioBlocks } from "./../components/home-bio-blocks";
import HTTPModal from "../components/HTTPModal";
import { AuthContext } from "../context/auth-context";
import axios from "axios";

const Home = () => {
  const location = useLocation();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const auth = useContext(AuthContext);
  const Close = () =>{
    setShowModal(false);
    history.push('/');
  }

  if(location.pathname =="/success" && showModal == false){
    console.log(showModal);
    setShowModal(true);
    
  }

  if(location.pathname =="/canceled"){
    if(JSON.parse(localStorage.getItem("requestData"))){
      localStorage.removeItem("requestData");
    }
  }
  useEffect(()=>{
    const storedData = JSON.parse(localStorage.getItem("requestData"));
    const makeRequest = async (storedData) =>{
      if(location.pathname =="/success" &&  storedData){
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        };
          try{
            const result = await axios.post(`${process.env.REACT_APP_API_URL}requests/`, storedData, {headers: headers});
          } catch(err){
            console.log(err);
          }
        }
    };
    makeRequest(storedData);
    localStorage.removeItem("requestData");
  },[]);

  return (
    <React.Fragment>
      {showModal && <HTTPModal 
      show={showModal}
      id={"confirm"}
      buttonID = {"default"}
      message={"Thank you for your request - you will receive an email with a Google Meets invitation soon."}
      buttonMessage={'Close'}
      onClose={Close}
      />}
      <div className="wrapper-padding">
        <div className="flex-col">
          <h1 className="mainTitle">Be Curious.</h1>
          <h3 className="subTitle">STEM Tutoring Services by Dario</h3>
          <hr />
          <MainGrid />
          <BioBlocks />
        </div>
      </div>
    </React.Fragment>
  );
};
export default Home;
