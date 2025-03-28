import React from 'react';

const gmapsUrl = (lat, long) => {
  return `http://maps.google.com/maps?q=${lat},${long}`;
}

const Position = (props) => {
  const { lat, long } = props;
  return <a href={gmapsUrl(lat,long)} target="_blank">{lat},{long}</a>;
};

export default Position;
