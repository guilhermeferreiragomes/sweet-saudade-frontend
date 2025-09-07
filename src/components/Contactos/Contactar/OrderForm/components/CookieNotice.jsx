import React from 'react';

const CookieNotice = ({ onAccept }) => {
  return (
    <div style={{
      backgroundColor: '#ffebee',
      border: '1px solid #f44336',
      borderRadius: '5px',
      padding: '20px',
      margin: '20px 0',
      color: '#d32f2f',
      textAlign: 'center'
    }}>
      <strong>Aceite as cookies para utilizar o formulário</strong>
      <button
        type="button"
        onClick={onAccept}
        style={{
          backgroundColor: '#EBB104',
          color: '#262724',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '5px',
          fontWeight: '600',
          cursor: 'pointer',
          fontSize: '0.9rem',
          transition: 'background-color 0.3s',
          marginTop: '10px'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#d4a004'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#EBB104'}
      >
        🍪 Aceitar Cookies
      </button>
    </div>
  );
};

export default CookieNotice;