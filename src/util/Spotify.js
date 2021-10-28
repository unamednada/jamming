let userAccessToken = null;
const clientID = '4d6e372a4368407abc4362c693bc9957';
const redirectURI = 'http://localhost:3000/';

export const Spotify = {
  getAccessToken: () => {
    if (userAccessToken) {
      return userAccessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      userAccessToken = accessTokenMatch[1];
      const expiresIn = +expiresInMatch[1];

      window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken;
    }

    window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
  },
  search: (term) => {
    const userAccessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`
      }
    }).then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    });
  },
  savePlaylist(name, uris) {
    if (!name|| !uris) {
      return null;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userID;
    
    return fetch('https://api.spotify.com/v1/me', { headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers,
          method: 'POST',
          body: JSON.stringify({ name })
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
              headers,
              method: 'POST',
              body: JSON.stringify({ uris }),
            });
          });
      });
  }
};
