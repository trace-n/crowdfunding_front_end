import React from 'react';
import fundlingLogoCol from '../../assets/fundling-website-favicon-color.png';
import './style.css';

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

// const containerStyles = {
//   height: 20,
//   width: '80%',
//   backgroundColor: '#e0e0de',
//   // background: 'linear-gradient(to right, #9FCAE6, #82BEE6)',
//   borderRadius: 50,
//   margin: '30px auto'
// }

// const labelStyles = {
//   padding: 5,
//   color: 'white',
//   fontWeight: 'bold'
// }

const fillerStyles = {
  height: '100%',
  width: `${completed}%`,
  backgroundColor: '#9FCAE6',
  borderRadius: 'inherit',
  textAlign: 'center',
  // display: 'flex',
  // justifyContent: 'center'
  // borderStyle: 'solid'
}


console.log("completed", completed, completed == 100);

  return (
    <div className='bar-container'>
     {/* style={containerStyles}> */}
      <div style={fillerStyles}>
        {/* <span style={labelStyles}> */}
        <span className='bar-label'>
          {`${completed}%`}
        </span>
        { (completed == 100 ) ? (
            // <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="star">
            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
          </svg>
          // </>
          ) : null }
      </div>
      { (completed == 100 ) ? (
        // <> 
          <p className='goal-text'>Goal Reached</p>
        // </>
         ) : null }
    </div>
  );
};

export default ProgressBar;