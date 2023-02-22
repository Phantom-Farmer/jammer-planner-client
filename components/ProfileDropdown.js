/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function ProfileDropdown() {
  const { user } = useAuth();
  return (
    <div className="profileDropdown">
      <img src={user.image_url} alt={user.fbUser.displayName} />
      <h5>{user.displayName}</h5>
      <h6>{user.email}</h6>
    </div>
  );
}
