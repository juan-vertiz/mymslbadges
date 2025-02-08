# MyMSLTranscript

Lightweight, single-endpoint API that generates a dynamic, visually appealing image summarizing real-time statistics from a specified Microsoft Learn profile. The generated image is perfect for embedding in your GitHub profile README, turning it into a live showcase of your learning achievements.

## Features

- Retrieves and visualizes Microsoft Learn statistics in real time
- Generates a shareable image from the provided transcript ID
- Simple API with minimal setup
- Suitable for GitHub profiles, personal websites, and dashboards

## Usage

Follow these steps to generate an image of your Microsoft Learn transcript:

1. **Obtain Your Microsoft Learn Transcript Link**
   - Go to your [Microsoft Learn transcript page](https://learn.microsoft.com/en-us/users/)
   - Sign in if necessary
   - Click **Share link > Create link**
   - Copy the generated link, which will be in the following format:
     ```
     https://learn.microsoft.com/en-us/users/your-username/transcript/d46gh5zermp0no7
     ```

2. **Enable Module Sharing**
   - Open **Transcript settings**
   - Ensure **Show completed modules** is enabled under **Settings for Sharing**

3. **Extract Your Transcript ID**
   - The last part of the copied URL (e.g., `d46gh5zermp0no7`) is your transcript ID

4. **Generate the Image**
   - Append the transcript ID to the API endpoint:
     ```
     https://mymsltranscript.bajatta.com/transcript/
     ```
   - Example:
     ```
     https://mymsltranscript.bajatta.com/transcript/d46gh5zermp0no7
     ```

5. **Embed the Image in GitHub README**
   Add this markdown snippet to your GitHub README to display the generated image:
   ```md
   ![My MSL Transcript](https://mymsltranscript.bajatta.com/transcript/d46gh5zermp0no7)
   ```

### Installation

To run MyMSLTranscript locally, follow these steps:

### Prerequisites

- Node.js (v20 or later)
- npm

### Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/juan-vertiz/mymsltranscript.git
   cd mymsltranscript
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

4. **Start the server**
   ```sh
   npm start
   ```

5. **Access the API**
   The server should be running at `http://localhost:3000`.

### License

GNU General Public License v3.0 or later

See [COPYING](./COPYING) to see the full text.
