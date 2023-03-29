## Vite React/Typescript/PubNub App

### Getting Started

To get started with this template, clone the repository and install the dependencies using your preferred package manager:

    bash

    git clone https://github.com/akeco/tic-tac-toe-challenge

cd your-repo

### Add environment variables

Create `.env` file and add these variables with valid [PubNub](https://www.pubnub.com/ 'PubNub') credentials

    VITE_PUBLISH_KEY
    VITE_SUBSCRIBE_KEY
    VITE_USER_ID

### Install dependencies and run dev server

npm install # or yarn

Once the dependencies are installed, you can start the development server using the following command:

    bash

    npm run dev # or yarn dev

This will start the development server at http://localhost:5173.

### Building for Production

To build the app for production, run the following command:

    bash

    npm run build # or yarn build

This will create an optimized build of the app in the dist directory.

Testing

To run the tests for this app, run the following command:

    bash

    npm run test # or yarn test

This will run the test suite using Vitest.

License

This project is licensed under the MIT License. See the LICENSE file for details.
