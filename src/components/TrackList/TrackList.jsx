import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    const { tracks, onAdd, isRemoval, onRemove } = this.props;
    return (
      <div className="TrackList">
        { tracks.map((track) => <Track
          track={ track }
          key={ track.id }
          onAdd={ onAdd }
          onRemove={ onRemove }
          isRemoval={ isRemoval }
        />) }
      </div>
    );
  }
}

export default TrackList;