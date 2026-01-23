import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useAuth } from '../../contexts/AuthContext';
import { userAPI } from '../../services/api';
import { validateEmail, sanitizeInput } from '../../utils/validation';
import './Profile.css';
import GlobalLoader from '../../components/GlobalLoader';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [errors, setErrors] = useState({});
  const { updateUser, isAuthenticated } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userAPI.getProfile();
      setFormData({
        name: response.data.name,
        email: response.data.email,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      enqueueSnackbar('Failed to load profile', { variant: 'error' });
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 5) {
      newErrors.newPassword = 'Password must be at least 5 characters';
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSaving(true);
    setErrors({});

    try {
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
      };

      const response = await userAPI.updateProfile(sanitizedData);
      
      // Update auth context with new user data
      if (response.data.user) {
        updateUser(response.data.user);
      }

      enqueueSnackbar('Profile updated successfully!', { variant: 'success' });
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = 
        error.response?.data?.message || 
        'Failed to update profile. Please try again.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;

    setChangingPassword(true);
    setErrors({});

    try {
      await userAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      enqueueSnackbar('Password changed successfully!', { variant: 'success' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowPasswordSection(false);
    } catch (error) {
      console.error('Error changing password:', error);
      const errorMessage = 
        error.response?.data?.message || 
        'Failed to change password. Please try again.';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-container edit-profile">
        <div className="profile-header">
          <h1>
            <i className="fa-solid fa-user-edit"></i>
            Edit Profile
          </h1>
          <p>Update your account information</p>
        </div>

        <div className="profile-content">
          {/* Profile Information Form */}
          <div className="profile-section">
            <h2>
              <i className="fa-solid fa-info-circle"></i>
              Personal Information
            </h2>
            <form onSubmit={handleUpdateProfile} className="edit-form">
              <div className="form-group">
                <label htmlFor="name">
                  Full Name <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    disabled={saving}
                  />
                </div>
                {errors.name && <span className="error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    disabled={saving}
                  />
                </div>
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <button type="submit" className="btn-save" disabled={saving}>
                {saving ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-check"></i>
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Password Change Section */}
          <div className="profile-section">
            <h2>
              <i className="fa-solid fa-lock"></i>
              Security Settings
            </h2>
            
            {!showPasswordSection ? (
              <button
                className="btn-change-password"
                onClick={() => setShowPasswordSection(true)}
              >
                <i className="fa-solid fa-key"></i>
                Change Password
              </button>
            ) : (
              <form onSubmit={handleChangePassword} className="edit-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">
                    Current Password <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-lock"></i>
                    <input
                      type="password"
                      id="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                      disabled={changingPassword}
                    />
                  </div>
                  {errors.currentPassword && <span className="error">{errors.currentPassword}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">
                    New Password <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-key"></i>
                    <input
                      type="password"
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      disabled={changingPassword}
                    />
                  </div>
                  {errors.newPassword && <span className="error">{errors.newPassword}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    Confirm New Password <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <i className="fa-solid fa-key"></i>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                      disabled={changingPassword}
                    />
                  </div>
                  {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>

                <div className="password-actions">
                  <button type="submit" className="btn-save" disabled={changingPassword}>
                    {changingPassword ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        Changing...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-check"></i>
                        Update Password
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => {
                      setShowPasswordSection(false);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      });
                      setErrors({});
                    }}
                    disabled={changingPassword}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="profile-footer">
          <Link to="/profile" className="back-link">
            <i className="fa-solid fa-arrow-left"></i>
            Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
