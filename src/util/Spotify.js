const userAccessToken = null;

export const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }
  }
};
