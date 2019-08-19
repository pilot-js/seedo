## Capstone: Mask Off - Visual Design Challenges for Developers

### Live Presentation

https://youtu.be/b-0oE0HBIRc

### View live on Heroku

http://design-wars.herokuapp.com/#/

### Project Details

- Due: 6/25/19
- Description: A platform designed to help developers practice and learn HTML and CSS by reproducing images. We provide you with an image, and your task is to recreate it using HTML and CSS.

### Team Members

- Kristy Cheung
- Grant H. Horner
- Theo Manton
- Haoyu Yu

### How We Built It

- Node Express backend with Sequelize
- React frontend
- [Codemirror](https://github.com/codemirror/codemirror) - JS based text editor in the browser
- Puppeteer-Pixelmatch microservice
  - [Puppeteer microservice we built](https://github.com/pilot-js/puppeteer-api)
  - [Puppeteer](https://github.com/GoogleChrome/puppeteer)
  - [Pixel Match](https://github.com/mapbox/pixelmatch)
- Database model and api route unit tests
- ESLint and Prettier to keep clean code practices
- Continuous Integration using Circle CI with unit tests
- Deployed on Heroku

### Workflow

- Image generation and comparison
  - HTML and CSS sent to server from front end
  - Server updates userchallenge with html and css
  - Server sends html and css to Puppeteer server
  - Puppeteer server generates and manipulates html and css files
  - Puppeteer generates png image using those html and css files
  - (Optional) Puppeteer server reads buffers of both images into internal PNG format, compares pixels against one another
  - Sends back data and base64 encoded images to server
  - Server saves images to database
  - Server sends images to front end

### Challenges

- Puppeteer —> Image Comparison —> Database —> front end pipeline
- Heroku Puppeteer configuration
- Converting from monolith architecture to microservice
