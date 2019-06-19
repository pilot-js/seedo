const solutionsSeed = [
  {
    html: `<!DOCTYPE html>
      <html>
        <head>
          <title>Circle</title>
        </head>
        <body>
          <div id='circle'></div>
        </body>
      </html>`,
    css: `#circle {
        width: 100px;
        height: 100px;
        background-color: red;
        border-radius: 50%;
      }`,
    js: '',
  },
  {
    html: `<!DOCTYPE html>
      <html>
        <head>
          <title>Square</title>
        </head>
        <body>
          <div id='square'></div>
        </body>
      </html>`,
    css: `#square {
        width: 100px;
        height: 100px;
        background-color: blue;
      }`,
    js: '',
  },
  {
    html: `<!DOCTYPE html>
      <html>
        <head>
          <title>Rectangle</title>
        </head>
        <body>
          <div id='rectangle'></div>
        </body>
      </html>`,
    css: `#rectangle {
        width: 200px;
        height: 100px;
        background-color: yellow;
      }`,
    js: ''
  },
  {
    html: `<div class="clock">
        <div class="wrap">
        <span class="hour"></span>
        <span class="minute"></span>
        <span class="second"></span>
        <span class="dot"></span>
        </div>
      </div>`,
    css: `body {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: #D9D7DD;
    }
    
    .clock {
      border-radius: 100%;
      background: #ffffff;
      font-family: "Montserrat";
      border: 5px solid white;
      box-shadow: inset 2px 3px 8px 0 rgba(0, 0, 0, 0.1);
    }
    
    .wrap {
      overflow: hidden;
      position: relative;
      width: 350px;
      height: 350px;
      border-radius: 100%;
    }
    
    .minute,
    .hour {
      position: absolute;
      height: 100px;
      width: 6px;
      margin: auto;
      top: -27%;
      left: 0;
      bottom: 0;
      right: 0;
      background: black;
      transform-origin: bottom center;
      transform: rotate(0deg);
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
      z-index: 1;
    }
    
    .minute {
      position: absolute;
      height: 130px;
      width: 4px;
      top: -38%;
      left: 0;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
      transform: rotate(90deg);
    }
    
    .second {
      position: absolute;
      height: 90px;
      width: 2px;
      margin: auto;
      top: -26%;
      left: 0;
      bottom: 0;
      right: 0;
      border-radius: 4px;
      background: #FF4B3E;
      transform-origin: bottom center;
      transform: rotate(180deg);
      z-index: 1;
    }
    
    .dot {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 12px;
      height: 12px;
      border-radius: 100px;
      background: white;
      border: 2px solid #1b1b1b;
      border-radius: 100px;
      margin: auto;
      z-index: 1;
    }`,
    js: ''
  },
  {
    html: `
      <div>
        <ul class="navbar">
          <li>Home Page</li>
          <li>Musings</li>
          <li>My town</li>
          <li>Links</li>
        </ul>
        <h1>My page</h1>
      
        <p>Welcome to my styled page!</p>
        
        <p>It lacks images, but at least it has style.
        And it has links, even if they don't go
        anywhere;</p>
        
        <p>There should be more here, but I don't know
        what yet.</p>
  
        <span>Made 19 Jun 2019 by myself.</span>
      </div>`,
    css: `body {
        padding-left: 11em;
        font-family: Georgia, "Times New Roman",
              Times, serif;
        color: purple;
        background-color: #d8da3d }
        ul.navbar {
        position: absolute;
        top: 2em;
        left: 1em;
        width: 9em }
        h1 {
          font-family: Helvetica, Geneva, Arial,
              SunSans-Regular, sans-serif }`,
    js: '',
  },
  {
    html: `<table>
      <tr>
          <td class="red"></td>
          <td class="yellow"></td>
          <td class="orange"></td>
          <td class="blue"></td>
      <tr>
      </table>`,
    css: `table{
        border-collapse: collapse;
        }
        td{    
            padding:40px;
            border:10px solid black;
        }
        .red{
            background-color:#F15E66;
        }
        .yellow{
            background-color:#FFDB64;
        }
        .orange{
            background-color:#F58326;
        }
        .blue{
            background-color:#85B1DE;
        }`,
    js: '',
  },
];

module.exports = {
  solutionsSeed,
};
