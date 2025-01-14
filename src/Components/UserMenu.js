import React from "react";
import {Link} from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>DashBoard</h4>
          <Link to="/dashboard/user/profile" className="list-group-item list-group-item-action">
            profile
          </Link>

          <Link to="/dashboard/user/orders" className="list-group-item list-group-item-action">
            Orders
          </Link>

          
        </div>
      </div>
    </>
  );
};

export default UserMenu;
