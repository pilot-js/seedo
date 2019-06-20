const solutionsSeed = [
  {
    html: `<!DOCTYPE html>
      <html>
        <head>
          <title>Sun Rising From The Sea</title>
        </head>
        <body>
          <div id='sun'></div>
          <div id='sea'></div>
        </body>
      </html>`,
    css: `#sun {
          width: 200px;
          height: 200px;
          background-color: orange;
          border-radius: 50%;
          margin: 20px auto;
        }
        
        #sea {
          width: 100%;
          height: 50px;
          position: absolute;
          bottom: 0px;
          background-color: blue;
        }
        
        body {
          margin: 0;
      }`,
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
        width: 200px;
        height: 200px;
        background-color: blue;
      }`,
    js: '',
  },
  {
    html: `<!DOCTYPE html>
      <html>
        <head>
          <title>Circle With Border</title>
        </head>
        <body>
          <div id='circle'></div>
        </body>
      </html>`,
    css: `#circle {
        width: 250px;
        height: 250px;
        background-color: yellow;
        border: 5px solid blue;
        border-radius: 50%;
        margin-right: auto;
        margin-left:auto
      }`,
    js: '',
  },
  {
    html: `<!DOCTYPE html>
      <html>
        <head>
          <title>Circle and Two Rectangles</title>
        </head>
        <body>
          <div id='circle'></div>
          <div id='rectangle'></div>
          <div id='square'></div>
        </body>
      </html>`,
    css: `#circle {
        width: 100px;
        height: 100px;
        background-color: blue;
        border-radius: 50%;
      }
      
      #rectangle {
        width: 200px;
        height: 100px;
        background-color: purple;
        margin-right: auto;
        margin-left:auto
      }
      
      #square {
        width: 150px;
        height: 150px;
        background-color: green;
        position: absolute;
        bottom: 20px;
        right: 30px;
      }`,
    js: '',
  },
  {
    html: `
      <div class="centered">
        <p>I'm centered</p>
      </div>`,
    css: `body {
        margin: 0;
      }
      
      p {
        font-size: 30px;
        border: 2px solid blue;
        padding: 20px;
        background: yellow;
      }
      
      .centered {
        display: flex;
        justify-content: center;
        align-items: center;
      
        height: 100vh;
      }`,
    js: '',
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
    js: '',
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
        background-color: yellow }
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
];

module.exports = {
  solutionsSeed,
};
