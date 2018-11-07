# PR Dashboard

Accumulates pull requests across multiple Bitbucket instances into a UI for a wall-mounted display.

## Usage

```shell
# Fetch the config file.
$ wget -O config.yaml https://raw.githubusercontent.com/HeathWallace/pr-dashboard/master/example.config.yaml

# Edit the config file to add your instance addresses and auth tokens.
$ vim config.yaml

# Run the app.
$ docker run -d -P -v $(pwd)/config.yaml:/usr/src/app/config.yaml dan1elhughes/pr-dashboard
```

## Semi-permanent usage (i.e. on a dedicated machine)

```shell
$ docker run -d -p 30000:3000 -v $(pwd)/config.yaml:/usr/src/app/config.yaml --name pr-dashboard --restart always pr-dashboard
```

## Local development

```shell
# Clone the repository
$ git clone https://github.com/HeathWallace/pr-dashboard
$ cd pr-dashboard

# Install dependencies
$ npm i

# Start the server
$ npm run server

# Run the Parcel compiler
$ npm start
```

Then open `localhost:3000` in the browser.

## Tests

Not yet implemented.

### Coding style

Code style is checked using ESLint/Prettier.

```
$ npm run lint
```

## Authors

Maintained by [@peasandwell](https://github.com/peasandwell).

See also the list of [contributors](https://github.com/heathwallace/pr-dashboard/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
