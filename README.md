# Test MongoDB + JS

## Installation

This code requires [Node.js](https://nodejs.org/) v16+ to run.

First clone this repository from [GitHub](https://github.com/prazeodium/mongo_test.git)

```sh
git clone https://github.com/prazeodium/mongo_test.git
cd mongo_test
```

Create `.env ` file and set your MongoDB URI

```sh
MONGO_URI=your-mongodb-uri
```

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm start
```

The data from the [given](https://paper.dropbox.com/doc/Test-MongoDB-JS-nZFhdJ6qjvMqXwcryLRmj) JSON objects will be in `test.firts` and `test.seconds` collections respectively to JSON files.

The result will be in `test.third` collection

## License

MIT
