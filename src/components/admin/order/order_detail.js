import React, { useEffect } from "react";
import "./order_detail.css";
import Profile from "../../../images/user.jpg";
import { AiOutlineFileText } from "react-icons/ai";
import { BsTelephoneFill, BsFillEnvelopeFill } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
const OrderDetail = () => {
  const[order,setOrder]=useState([]);
  let orderid = localStorage.getItem("orderid")
  useEffect(()=>{
    axios.get(`http://192.168.29.108:5000/order_deteils?id=${orderid}`).then((response) => {
      let data = response.data;
      setOrder(data);
      console.log("______uuuuu_____"+JSON.stringify(response.data))
      // setapicall(false)
    }).catch(function (error) {
      console.log(error);
    });
  },[])
  return (
    <div className="order_detail_page">
      <div className="order_detail">
        <h2>Orders Detail</h2>
        <div className="row">
          <div className="col-lg-8">
            <div className="left_side">
              <div className="top_bar d-flex justify-content-between text-center">
                <div className="order_id d-flex flex-column">
                  <div className="order_info_heading">
                    <span>#</span>Order Id
                  </div>
                  <div>
                    {/* {order.map((orderdata)=>{
                      return( */}
                        {/* <span>{orderdata.ref_no}</span> */}
                        <span>yyyy</span>
                      {/* )
                    })} */}
                    
                  </div>
                </div>
                <div className="d-flex flex-column text-center">
                  <div className="order_info_heading">Payment</div>
                  <div className="badge bg-success">Paid</div>
                </div>
                <div className="d-flex flex-column text-center">
                  <div className="order_info_heading">Order Status</div>
                  {/* {order.map(orderdata=>{
                    return( */}
                      <div  className="badge bg-warning">pending</div>
                    {/* )
                  
                  })} */}
                 
                </div>
                <div className="d-flex flex-column text-center">
                  <div className="order_info_heading">Order Date & Time</div>
                  <div className="date_time">
                    06.10.22 <span className="">at 10:40 am</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="product_img_price">
              <div className="product_image_price"></div>

{order.map(orderdata=>{
                    return(

              <div className="d-flex justify-content-between mb-3 align-items-center">

                <div className="product_img d-flex">
                  <img src="" alt="apnaorganic"/>
                  <div className="product_name_detial ps-3">
                    <h6>T-Shirt Blue</h6>
                    <p>color:blue</p>
                    <p>size: M</p>
                  </div>
                </div>

                <div className="product_price">{orderdata.price}</div>
                <div className="product_quantity">{orderdata.quantity}</div>
                <div className="total_amount">{orderdata.price*orderdata.quantity}</div>
              </div>

    )
                  
                  })} 
              
              {/* <div className="d-flex justify-content-between align-items-center">
                <div className="product_img d-flex">
                  <img src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5a60fd99-2c3a-44d3-91bb-62a47224e322/sportswear-heritage-86-adjustable-cap-7g0hKX.png" alt="apnaorganic"/>
                  <div className="product_name_detial ps-3">
                    <h6>Cap Blue</h6>
                    <p>color:blue</p>
                    <p>size: 10cm</p>
                  </div>
                </div>
                <div className="product_price">$122.00</div>
                <div className="product_quantity">2</div>
                <div className="total_amount">$244.00</div>
              </div> */}
            </div>

            <div className="delivery_charges">
              <h5 className="pb-3">Delivery</h5>
              {/* <div className="d-flex justify-content-between align-items-center">
                <div className="delivery_img d-flex ">
                  <img src="https://media.istockphoto.com/vectors/express-delivery-symbol-vector-id1175078000?b=1&k=20&m=1175078000&s=612x612&w=0&h=2Y5FLXleVSLyaEfZztp2Mhf2pVV6BbqNYkXYs1KHpik=" alt="apnaorganic"/>
                  <div className="delivery_componay ps-3">
                    <h6>E-Kart</h6>
                    <p>Speed post package</p>
                  </div>
                </div>
                <div className="delivery_payment">$20.00</div>
              </div> */}
            </div>
            <div className="payment_summary">
              <h5 className="pb-3">Payment Summary</h5>
              <div className="payment_summary_total d-flex justify-content-between align-items-center">
                <div className="Subtotal">
                  <p>
                    Subtotal<span>(2 items)</span>
                  </p>
                </div>
                <div className="">$400.00</div>
              </div>
              <div className="payment_summary_total d-flex justify-content-between align-items-center">
                <div className="Subtotal">
                  <p>Delivery Charges</p>
                </div>
                <div className="">$20.00</div>
              </div>
              <div className="payment_summary_total d-flex justify-content-between align-items-center">
                <div className="Subtotal">
                  <p>Tax</p>
                </div>
                <div className="">$0.00</div>
              </div>
              <div className="payment_summary_total d-flex justify-content-between align-items-center">
                <div className="Subtotal">
                  <p>
                    <strong>Total paid by customer</strong>
                  </p>
                </div>
                <div className="">
                  <strong>$420.00</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="right_side">
              <div className="customer_name_address">
                <div className="customer_info">
                  <div className="customer">Customer</div>
                  <div className="customer_name_img d-flex py-3">
                    <img src={Profile} alt={'apnaorganic'}/>
                    <div className="customer_name ps-4 my-auto">
                      Gourav Choudhary
                    </div>
                  </div>
                  <div className="customer_orders d-flex py-3">
                    <AiOutlineFileText className="order_icon p-1" />
                    <div className="customer_orders_no ps-4 my-auto">
                      2 Order
                    </div>
                  </div>
                </div>
                <div className="contact py-3">
                  <div className="contact_heading pb-3">
                    <h5>Contact Info</h5>
                  </div>
                  <div className="email py-2">
                    <BsFillEnvelopeFill />
                    <span>text159@gamil.com</span>
                  </div>
                  <div className="number py-2">
                    <BsTelephoneFill />
                    <span> +91 987654321</span>
                  </div>
                </div>
                <div className="ship_Address py-3">
                  <h5>Ship Address</h5>
                  <div className="address">
                    <p>Gourav Choudhary</p>
                    <p>45 Universal Tower</p>
                    <p>2nd Floor Scheme 54 PU4</p>
                    <p>Indore Madhya Pradesh</p>
                    <p>Pin:452001</p>
                    <p>+91 9876543210</p>
                  </div>
                </div>
                <div className="bill_Address py-3">
                  <h5>Bill Address</h5>
                  <div className="address">
                    <p>Gourav Choudhary</p>
                    <p>45 Universal Tower</p>
                    <p>2nd Floor Scheme 54 PU4</p>
                    <p>Indore Madhya Pradesh</p>
                    <p>Pin:452001</p>
                    <p>+91 9876543210</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;
