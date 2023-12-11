import React, { useEffect, useState } from 'react';

function Checkbox({ setChecklist }) {
  const [alcohol, setAlcohol] = useState(false);
  const [coffee, setCoffee] = useState(false);
  const [seats, setSeats] = useState(false);

  useEffect(() => {
    setChecklist({ alcohol, coffee, seats });
  }, [alcohol, coffee, seats]);

  return (
    <div className="checkbox-container">
      <div>
        <input type="checkbox" value={alcohol} onChange={() => setAlcohol(!alcohol)} />
        <label>술</label>
      </div>
      <div>
        <input type="checkbox" value={coffee} onChange={() => setCoffee(!coffee)} />
        <label>커피</label>
      </div>
      <div>
        <input type="checkbox" value={seats} onChange={() => setSeats(!seats)} />
        <label>좌석</label>
      </div>
    </div>
  );
}

export default Checkbox;
