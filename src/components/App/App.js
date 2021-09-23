import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { id: 1, name: 'hey', artist: 'ann', album: 'ho' },
        { id: 2, name: 'yay', artist: 'mary', album: 'yoohoo' },
        { id: 3, name: 'bloob', artist: 'meerk', album: 'borp' },
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        { id: 1, name: 'hey', artist: 'ann', album: 'ho' },
        { id: 2, name: 'yay', artist: 'mary', album: 'yoohoo' },
      ]
    };
    this.addTrack = this.addTrack.bind(this);
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

  render() {
    const { searchResults, playlistName, playlistTracks } = this.state;
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={ searchResults }
              onAdd={ this.addTrack }
            />
            <PlayList
              playlistName={ playlistName }
              playlistTracks= { playlistTracks }
            />
          </div>
        </div>
      </div>  
    ); 
  }
}

export default App;
