import React,{ Fragment,useEffect } from 'react';
import SideBar from './SideBar';
import MetaData from '../layout/MetaData';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { adminProducts } from '../../actions/productActions';
import Loader from '../layout/Loader';
import { allOrdersAdmin } from '../../actions/orderActions';
import { getAllUsers } from '../../actions/userActions';

const Dashboard = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products);
    const { orders,loading,totalAmount } = useSelector( state => state.allOrders);
    const { users } = useSelector(state => state.allUsers);

    useEffect(()=>{
        dispatch(adminProducts());
        dispatch(allOrdersAdmin());
        dispatch(getAllUsers());
    },[dispatch]);

    let outOfstock = 0;

    products && products.forEach(product => {
        if(product.stock ===0 ){
            outOfstock += 1;
        }
    });
  return (
    <Fragment>
        <MetaData title="Dashboard" />
       <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>
                           {
                            loading ? <Loader />
                                    : (
                                        <Fragment>
                                            <div className="row pr-4">
                                                <div className="col-xl-12 col-sm-12 mb-3">
                                                    <div className="card text-white bg-primary o-hidden h-100">
                                                        <div className="card-body">
                                                            <div className="text-center card-font-size">Total Amount<br /> <b>${ totalAmount && totalAmount }</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row pr-4">
                                                <div className="col-xl-3 col-sm-6 mb-3">
                                                    <div className="card text-white bg-success o-hidden h-100">
                                                        <div className="card-body">
                                                            <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                                                        </div>
                                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                                            <span className="float-left">View Details</span>
                                                            <span className="float-right">
                                                                <i className="fa fa-angle-right"></i>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>


                                                <div className="col-xl-3 col-sm-6 mb-3">
                                                    <div className="card text-white bg-danger o-hidden h-100">
                                                        <div className="card-body">
                                                            <div className="text-center card-font-size">Orders<br /> <b>{ orders && orders.length }</b></div>
                                                        </div>
                                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                                            <span className="float-left">View Details</span>
                                                            <span className="float-right">
                                                                <i className="fa fa-angle-right"></i>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>


                                                <div className="col-xl-3 col-sm-6 mb-3">
                                                    <div className="card text-white bg-info o-hidden h-100">
                                                        <div className="card-body">
                                                            <div className="text-center card-font-size">Users<br /> <b>{ users && users.length }</b></div>
                                                        </div>
                                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                                            <span className="float-left">View Details</span>
                                                            <span className="float-right">
                                                                <i className="fa fa-angle-right"></i>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>


                                                <div className="col-xl-3 col-sm-6 mb-3">
                                                    <div className="card text-white bg-warning o-hidden h-100">
                                                        <div className="card-body">
                                                            <div className="text-center card-font-size">Out of Stock<br /> <b>{ outOfstock }</b></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )
                           }
                            
                </div>
            </div>
    </Fragment>
  )
}

export default Dashboard
