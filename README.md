# Smart Pins Dashboard

This project aims to allow viewing and editing areas and assets for Smart Pins.

There is a live site running at [Smart Pins Dashboard](https://fdorothy.github.io/smart_pin_dashboard/).

## Using the Site

### Settings

There are three settings that need configured. First, you need to know the Fermata API Base URL of the environment you are wishing to use. You also need to know the API Key.

Next you need to have a Personal Access Token. To get this, log into the web dashboard of the workspace you want to use and go to Settings -> Security and create a new Personal Access Token.

Once you have all 3 pieces of information filled in click 'Save' and the Smart Pins Dashboad will try to log into the environment with your personal access token. This information is saved in local storage so that you only have to enter it once.

### Areas

Areas contain assets (Smart Pins). The Dashboard will allow you to view a paginated list of areas. You can click on any of the actions on the right-side of the table to manipulate the areas or see their child assets.

### Assets

Assets, also known as Smart Pins, represent a physical device at some lat,long position. Assets have other metadata, such as a description, serial number, model number, and error information.

## Building the Code

This project is a single-page React app and we use nodejs to serve it for development.

I am using npm 11.2.0 and nodejs v23.0.0 for development on this project.

Check out the code and run `npm install` to install dependencies, then `npm start` to host it locally. Then navigate to `localhost:8080` in a web browser.

To make a build run `npm run build`. This will deploy a `bundle.js` to the `docs` folder, so that the Github Pages can serve it.
