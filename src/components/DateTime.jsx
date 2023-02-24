import React, { memo } from "react";

function DateTime({ dateTime }) {
  const date = new Date(dateTime);
  const currentDate = new Date();
  const calculateDay = () => {
    if (date.getDate() === currentDate.getDate()) {
      return `Today`;
    } else {
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
  };
  return (
    <div>
      {calculateDay()}, {`${date.getHours()}:${date.getMinutes()}`}
    </div>
  );
}

export default memo(DateTime);
