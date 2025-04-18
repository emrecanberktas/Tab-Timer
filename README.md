﻿# Tab Timer Chrome Extension

A Chrome extension that tracks how long each tab has been open in your browser. It displays the duration of all open tabs in a popup interface

## Features

- **Tab Duration Tracking**: Monitors how long each tab has been open in real-time.
- **All Tabs Listing**: Displays a list of all open tabs with their titles and durations in the popup.
- **Popover on Hover**: Shows the duration of a tab in a popover when you hover over it in the popup list.
- **Local Storage**: Stores tab information locally using Chrome's storage API for persistence.
- **Lightweight & Simple**: Built with vanilla JavaScript for a fast and minimal user experience.

## Usage (For Now)

Follow these steps to set up and use the extension locally:

1. **Clone the Repository**: Clone the project to your local machine using the command:`git clone https://github.com/emrecanberktas/Tab-Timer`
2. **Navigate to the Project Directory**: Move into the project folder: `cd Tab-Timer`
3. **Install Dependencies**: Install the required dependencies by running: `npm install `
4. **Build the Extension**: Create a production-ready build of the extension: `npm run build `
5. **Add the Extension to Chrome**: Load the extension in Chrome by following these steps: - Open Chrome and go to the Extensions page by typing `chrome://extensions/` in the address bar or navigating via Menu > Extensions > Manage Extensions. - Enable **Developer mode** by toggling the switch in the top-right corner. - Click the **Load unpacked** button. - Select the `dist` folder (or wherever your build output is located) from the project directory and click **Open**. - The extension should now appear in your Chrome extensions list and be ready to use!
