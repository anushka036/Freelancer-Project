import React from 'react'

const jobIcon = ({ icon, text }) => {
  return (
    <div className="job-icon">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default jobIcon