import React from "react";

const IssueBadge = ({ issue, children }) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  };

  if (issue) {
    return (
      <span style={{ 
        ...baseStyle,
        backgroundColor: '#fee2e2',
        color: '#b91c1c'
      }}>
        <svg style={{ marginRight: '4px', width: '8px', height: '8px' }} fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
        {children}
      </span>
    );
  }
  
  return (
    <span style={{ 
      ...baseStyle,
      backgroundColor: '#dcfce7',
      color: '#166534'
    }}>
      <svg style={{ marginRight: '4px', width: '8px', height: '8px' }} fill="currentColor" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" />
      </svg>
      {children}
    </span>
  );
};

export default IssueBadge;