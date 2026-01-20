import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../contexts/AuthContext';
import { userAPI } from '../../services/api';
import Loader from '../../components/common/Loader/Loader';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userAPI.getProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      enqueueSnackbar(
        error.response?.data?.message || 'Failed to load profile',
        { variant: 'error' }
      );
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchProfile();
  }, [isAuthenticated, navigate, fetchProfile]);

  if (loading) {
    return <Loader />;
  }

  if (!profile) {
    return (
      <div className="profile-error">
        <i className="fa-solid fa-exclamation-circle"></i>
        <h2>Unable to load profile</h2>
        <Link to="/" className="btn-primary">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <i className="fa-solid fa-user-circle"></i>
          </div>
          <h1>{profile.name}</h1>
          <p className="profile-email">{profile.email}</p>
          {profile.isAdmin && (
            <span className="admin-badge">
              <i className="fa-solid fa-shield-halved"></i> Admin
            </span>
          )}
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>
              <i className="fa-solid fa-info-circle"></i>
              Account Information
            </h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                <p>{profile.name}</p>
              </div>
              <div className="info-item">
                <label>Email Address</label>
                <p>{profile.email}</p>
              </div>
              <div className="info-item">
                <label>Account Status</label>
                <p>
                  {profile.isVerified ? (
                    <span className="status-verified">
                      <i className="fa-solid fa-check-circle"></i> Verified
                    </span>
                  ) : (
                    <span className="status-unverified">
                      <i className="fa-solid fa-exclamation-circle"></i> Not Verified
                    </span>
                  )}
                </p>
              </div>
              <div className="info-item">
                <label>Member Since</label>
                <p>{new Date(profile.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/profile/edit" className="btn-edit">
              <i className="fa-solid fa-edit"></i>
              Edit Profile
            </Link>
            <Link to="/orders" className="btn-orders">
              <i className="fa-solid fa-box"></i>
              My Orders
            </Link>
          </div>
        </div>

        <div className="profile-footer">
          <Link to="/" className="back-link">
            <i className="fa-solid fa-arrow-left"></i>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
