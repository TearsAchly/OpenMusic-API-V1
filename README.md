# OpenMusic API-V1

OpenMusic API is a RESTful API project for managing albums and songs using Hapi.js, PostgreSQL, and ESLint for code linting. 


## Precondition

Before running this project, make sure you have installed:

- Node.js
- PostgreSQL

## Steps to Execute the Project

1. **Clone this repository**:

    ```sh
    git clone https://github.com/TearsAchly/OpenMusic-API-V1.git
    cd openmusic-api
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Database configuration**:

    Make sure PostgreSQL is running and create a database named `AlbumsAndSongs`. Then adjust the `.env` file to your database settings:

    ```plaintext
    PGUSER=<YOUR_DB_USER>
    PGPASSWORD=<YOUR_DB_PASSWORD>
    PGDATABASE=AlbumsAndSongs
    PGHOST=localhost
    PGPORT=5432
    ```

4. **Run database migration**:

    ```sh
    npm run migrate up || npx run migrate up
    ```

5. **Run server**:

    ```sh
    npm start
    ```

6. **Linting code**:

    To ensure your code is free from linting issues, run:

    ```sh
    npx eslint .
    ```

## Directory Structure

- **eslint.config.mjs**: ESLint configuration.
- **migrations**: Directory for database migration scripts.
- **package.json**: Npm configuration file.
- **src/api**: Directory containing handlers, indexes, and routes for albums and songs.
- **src/exceptions**: Directory containing custom error classes.
- **src/server.js**: The main file for running the Hapi.js server.
- **src/services**: Directory containing services for interacting with the PostgreSQL database.
- **src/validator**: Directory containing validation schemes using Joi.

## Endpoints

- **Albums**
    - `POST /albums`: Adds a new album.
    - `GET /albums`: Gets a list of albums.
    - `GET /albums/{albumId}`: Gets album details.
    - `PUT /albums/{albumId}`: Updates the album.
    - `DELETE /albums/{albumId}`: Deletes an album.

- **Song**
    - `POST /songs`: Adds new songs.
    - `GET /songs`: Gets a list of songs.
    - `GET /songs/{songId}`: Gets song details.
    - `PUT /songs/{songId}`: Updates songs.
    - `DELETE /songs/{songId}`: Delete a song.

## Contribution

Please open a pull request or submit an issue to contribute to this project.

## Licence

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more information.
```
