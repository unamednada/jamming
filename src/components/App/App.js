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
      ],
    };
  }

  render() {
    const { searchResults } = this.state;
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={ searchResults } />
            <PlayList />
          </div>
        </div>
      </div>  
    ); 
  }
}

export default App;
