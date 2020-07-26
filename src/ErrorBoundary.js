import React from 'react';
import './App/App.css';

export default function ErrorBoundary(props) {
  if(props.message) {
    return (
      <div className="error">{props.message}</div>
    );
  }

  return <></>
}