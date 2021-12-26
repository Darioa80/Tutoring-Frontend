import React from "react";

import RequestForm from "./../components/Forms/request-form";
import "../scss/wrap.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

const RequestPage = () => {
  const params = useParams();
  console.log(params);

  useEffect(()=>{
    
  })
  return (
    <div className="center-wrapper">
      <RequestForm subject_id={params.subject_id} />
    </div>
  );
};

export default RequestPage;
