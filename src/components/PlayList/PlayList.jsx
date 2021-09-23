import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
  render() {
    const { playlistTracks, onRemove, playlistName } = this.props;
    return (
      <div className="Playlist">
        <input defaultValue={ playlistName }/>
        <TrackList
          tracks={ playlistTracks }
          onRemove={ onRemove }
          isRemoval={ true }
        />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default PlayList;