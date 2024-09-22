import React, { useState,useEffect} from "react";
import UserMenu from '../../Components/UserMenu'
import axios from 'axios';
import {useAuth} from "../../Context/auth";
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async() => {
    try {
      const{data} = await axios.get(`http://localhost:5000/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }
 
  useEffect(() => {
    if(auth?.token) getOrders();  
  },[auth?.token]);
  return (
    <div>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
           <UserMenu/>
            </div>
            <div className='col-md-9'>
                <h1 className="text-center"> Allorders</h1>
                {
                  orders?.map((o,i) => {
                    return (
                      <div className="order shadow">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">No.</th>
                              <th scope="col">Status</th> 
                              <th scope="col">Buyer</th>
                              <th scope="col">Date</th>
                              <th scope="col">Payment</th>
                              <th scope="col">Quantity</th>
                            </tr>
                          </thead>
                             <tbody>
                              <tr>
                                <td>{i+1}</td>
                                <td>{o?.status}</td>
                                <td>{o?.buyer.name}</td>
                                <td>{moment(o.createAt).fromNow() }</td>
                                <td>{o?.payment.Success ? "Success" : "Failed"}</td>
                                <td>{o.product?.length}</td>
                              </tr>
                             </tbody>
                        </table>
                        <div className="container">
                        {o?.products?.map((p,i) => (
              <div className='row flex-row mb-2' key={p._id}>
                <div className='col-md-4'>
                  <img
                    src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                    className='card-img-top'
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className='col-md-8'>
                  <p>{p.name}</p>
                  <p>{p.description}</p>
                  <p>Price : {p.price}</p>
                 
                </div>
              </div>
            ))}
                        </div>
                      </div>
                    )
                  })
                }
            </div>
        </div>
      </div>
    </div>
  )
}

export default Orders;
