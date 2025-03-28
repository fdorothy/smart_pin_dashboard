import React from 'react';
import moment from 'moment';

const Timestamp = (props) => {
  const { dateString } = props;
  const ts = moment(dateString);
  const formatted = ts.format("MM/DD/YYYY h:mma");
  const ago = ts.from(moment());
  return <p>{formatted} ({ago})</p>;
};

export default Timestamp;
