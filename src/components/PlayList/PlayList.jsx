import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    const { value } = event.target;
    const { onNameChange } = this.props;
    onNameChange(value);
  }

  render() {
    const { playlistTracks, onRemove, playlistName, onSave } = this.props;
    return (
      <div className="Playlist">
        <input
          defaultValue={ playlistName }
          onChange={ this.handleNameChange }
          value={ playlistName }
        />
        <TrackList
          tracks={ playlistTracks }
          onRemove={ onRemove }
          isRemoval={ true }
        />
        <button
          className="Playlist-save"
          onClick={ onSave }
        >SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default PlayList;