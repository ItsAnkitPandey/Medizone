import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../contexts/AuthContext';
import { orderAPI } from '../../services/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchOrders();
  }, [isAuthenticated, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getOrders();
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      enqueueSnackbar(
        error.response?.data?.message || 'Failed to load orders',
        { variant: 'error' }
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'Pending': 'status-pending',
      'Processing': 'status-processing',
      'Shipped': 'status-shipped',
      'Delivered': 'status-delivered',
      'Cancelled': 'status-cancelled'
    };
    return statusColors[status] || 'status-pending';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Pending': 'fa-clock',
      'Processing': 'fa-spinner',
      'Shipped': 'fa-truck',
      'Delivered': 'fa-check-circle',
      'Cancelled': 'fa-times-circle'
    };
    return icons[status] || 'fa-clock';
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <i className="fa-solid fa-spinner fa-spin fa-3x"></i>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-wrapper">
      <div className="orders-container">
        <div className="orders-header">
          <h1>
            <i className="fa-solid fa-box"></i>
            My Orders
          </h1>
          <p>Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <i className="fa-solid fa-shopping-bag fa-4x"></i>
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders. Start shopping now!</p>
            <Link to="/allmedicines" className="btn-shop">
              <i className="fa-solid fa-pills"></i>
              Browse Medicines
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header-section">
                  <div className="order-info">
                    <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                    <p className="order-date">
                      <i className="fa-solid fa-calendar"></i>
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className={`order-status ${getStatusColor(order.status)}`}>
                    <i className={`fa-solid ${getStatusIcon(order.status)}`}></i>
                    {order.status}
                  </div>
                </div>

                <div className="order-items">
                  <h4>Items ({order.items.length})</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-details">
                        <p className="item-name">{item.medicine?.name || 'Product'}</p>
                        <p className="item-qty">Qty: {item.quantity}</p>
                      </div>
                      <p className="item-price">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <div className="order-footer-section">
                  <div className="order-address">
                    <h4>
                      <i className="fa-solid fa-location-dot"></i>
                      Delivery Address
                    </h4>
                    <p>{order.shippingAddress?.name}</p>
                    <p>{order.shippingAddress?.street}</p>
                    <p>
                      {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
                    </p>
                    <p>{order.shippingAddress?.phoneNumber}</p>
                  </div>

                  <div className="order-payment">
                    <h4>
                      <i className="fa-solid fa-credit-card"></i>
                      Payment
                    </h4>
                    <p className="payment-mode">{order.paymentMode}</p>
                    <p className="total-amount">Total: ₹{order.totalAmount?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="orders-footer">
          <Link to="/profile" className="back-link">
            <i className="fa-solid fa-arrow-left"></i>
            Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orders;
