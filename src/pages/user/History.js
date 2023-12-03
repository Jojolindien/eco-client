import React from "react";
import UserNav from "../../component/nav/UserNav";

const History = () => {
  return (
    <div className="container-fluid">
      <div className="row my-5">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">user history page1</div>
        <div className="col">user history page2</div>
      </div>
    </div>
  );
};

export default History;
