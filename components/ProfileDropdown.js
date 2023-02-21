/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function ProfileDropdown() {
  const { user } = useAuth();
  return (
    <div className="profileDropdown">
      <h5>{user.displayName}</h5>
    </div>
  );
}
