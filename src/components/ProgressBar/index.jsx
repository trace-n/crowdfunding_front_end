import React from 'react';

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

const containerStyles = {
  height: 20,
  width: '100%',
  backgroundColor: "#e0e0de",
  borderRadius: 50,
  margin: 50
}

const labelStyles = {
  padding: 5,
  color: 'white',
  fontWeight: 'bold'
}

const fillerStyles = {
  height: '100%',
  width: `${completed}%`,
  // width: '30%',
  backgroundColor: '#000000',
  borderRadius: 'inherit',
  textAlign: 'right'
}

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;