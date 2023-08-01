import React from 'react';

const Footer = ({ backgroundImage }) => {
  return (
    <footer
      className="px-6 py-3 flex justify-center  py-4 text-white  bg-gray-800"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="containermx-auto text-center">
        <hr
          style={{
            width: '916px',
            height: '0.852px',
            background: '#E4E4E4',
            marginBottom: '20px', 
          }}
        />
        <p>&copy; {new Date().getFullYear()} Zyldyz AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
