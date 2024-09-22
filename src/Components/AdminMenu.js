import React from "react";
import {Link} from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <Link to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
            Create Category
          </Link>

          <Link to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">
            Create Products
          </Link>

          <Link to="/dashboard/admin/products" className="list-group-item list-group-item-action">
            Products
          </Link>

          <Link to="/dashboard/admin/users" className="list-group-item list-group-item-action">
            Users
          </Link>
           
          <Link to="/dashboard/admin/orders" className="list-group-item list-group-item-action">
            Orders
          </Link>
          
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
