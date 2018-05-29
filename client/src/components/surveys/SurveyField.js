import React from 'react';
// automatically look into props and pull off the input property and assign it to input var
// input is gathering differnet event listner like onChange onFocus...
export default ({ input, label, meta: { error, touched } }) => (
  <div>
    <label>{label}</label>
    <input {...input} style={{ marginBottom: '5px' }} />
    <div className="red-text" style={{ marginBottom: '20px' }}>
      {touched && error}
    </div>
  </div>
);
