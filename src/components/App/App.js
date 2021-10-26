import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import { Spotify } from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [],
      trackURIs: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const { id: currTrack } = track;
    const { playlistTracks } = this.state;
    if (playlistTracks.every(({ id }) => id !== currTrack)) {
      playlistTracks.push(track);
      this.setState({
        playlistTracks,
      });
    }
  }

  removeTrack(track) {
    const { id: currTrack } = track;
    this.setState((state) => ({
      playlistTracks: state.playlistTracks.filter(({ id }) => id !== currTrack),
    }));
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  savePlayList() {
    const { playlistTracks } = this.state;
    this.setState({
      trackURIs: playlistTracks.map(({uri}) => uri),
    });
  }

  search(term) {
    Spotify.search(term)
      .then((searchResults) => {
        this.setState({
          searchResults,
        });
      });
  }

  render() {
    const { searchResults, playlistName, playlistTracks } = this.state;
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={ this.search } />
          <div className="App-playlist">
            <SearchResults
              searchResults={ searchResults }
              onAdd={ this.addTrack }
            />
            <PlayList
              playlistName={ playlistName }
              playlistTracks= { playlistTracks }
              onRemove={ this.removeTrack }
              onNameChange={ this.updatePlaylistName }
              onSave={ this.savePlayList }
            />
          </div>
        </div>
      </div>  
    ); 
  }
}

export default App;
