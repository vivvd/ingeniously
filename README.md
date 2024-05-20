# Ingeniously

Ingeniously is a React-based web application that provides you with a random song from Spotify.

## How It Works

1. **Random Word Generation**: The application starts by requesting a random word from [Random Word API](http://random-word-api.herokuapp.com/). This word serves as the basis for the song search.

2. **Spotify Web API Integration**: The random word is then passed to the Spotify Web API, which searches for a song based on the provided word. You can find more about the Spotify Web API [here](https://developer.spotify.com/).

3. **Displaying Song Information**: The application displays various details about the selected song, including its name, artist, album, and album cover.

## Features

- Fetches a random song from Spotify based on a randomly generated word.
- Displays detailed information about the selected song, including its name, artist, album, and album cover.

## Usage

To run the application locally:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install` or `yarn install`.
4. Start the development server with `npm start` or `yarn start`.
5. Open your browser and go to `http://localhost:3000` to view the application.

## Technologies Used

- React
- JavaScript
- Spotify Web API
- Random Word API

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any suggestions, feature requests, or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
