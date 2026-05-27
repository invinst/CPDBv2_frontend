import React from 'react';
import ReactDOM from 'react-dom';

const Collapsible =()=>{
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      <button onClick={ toggle }>toggle</button>
      {open && (
        <div className='toggle'>
          <h4>toggle</h4>
        </div>
      )}
    </div>
  );
};

export default Collapsible;
