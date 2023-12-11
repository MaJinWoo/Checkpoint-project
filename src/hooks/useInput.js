import React, { useState } from 'react';

function useInput() {
  const [value, setValue] = useState('');

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };
  return [value, onChangeHandler, setValue];
}

export default useInput;
