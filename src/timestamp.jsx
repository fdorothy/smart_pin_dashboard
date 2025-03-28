import React from 'react';
import moment from 'moment';

const Timestamp = (props) => {
  const { dateString } = props;
  const ts = moment(dateString);
  if (ts.isValid()) {
    const formatted = ts.format("MM/DD/YYYY h:mma");
    const ago = ts.from(moment());
    return <p>{formatted} ({ago})</p>;
  } else {
    return <p></p>;
  }
};

export default Timestamp;
