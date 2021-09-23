import React from 'react';
import './Track.css';

class Track extends React.Component {
  render() {
    const { isRemoval, track: { name, artist, album } } = this.props;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{ name }</h3>
          <p>{ `${ artist } | ${ album }` }</p>
        </div>
        <button className="Track-action">{ isRemoval ? '-' : '+' }</button>
      </div>
    );
  }
}

export default Track;