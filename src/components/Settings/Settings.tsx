import React from 'react';
import APIKeySettings from './APIKeySettings';
import Login from './Login';

function Settings() {

  return (
    <div className="Settings">
        <APIKeySettings />
        <hr/>
        <Login />
    </div>
  )
}

export default Settings