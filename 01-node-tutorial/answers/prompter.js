const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let title = "Discover Your Color!!";
let buttonTitle = "Discover your color";
let color1;
let color2;
let color3;
let color4;
let gradient = true;

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body style="display: flex;justify-content: center;align-items: center; flex-direction: column; background: ${
gradient ? `radial-gradient(hsl(${color1},100%,80%), hsl(${color2},100%,70%), hsl(${color3},100%,50%), hsl(${color4},100%,40%))"`:`hsl(0,0%,100%)"`}>

    <h1>${title}</h1>

    <h3>Enter your date of birth</h3>
    <form style="display: flex;flex-direction: column;"method="POST">
      <div style="display: flex;flex-direction: row;padding-bottom: 20px;font-weight: bold;" "="">
        <div style="display: flex;flex-direction: column;margin: 20px;font-weight: bold;">
          <label for="month">month (mm):</label>
          <input type="number" id="month" name="month" min="0" max="12" required>
        </div>
        <div style="display: flex;flex-direction: column;margin: 20px;font-weight: bold;">
          <label style="" for="day">day (dd):</label>
          <input type="number" id="day" name="day" min="0" max="31" required>
        </div>
        <div style="display: flex;flex-direction: column;margin: 20px;">
          <label for="year">year (yyyy):</label>
          <input type="number" id="year" name="year" min="0" max="2024" required>
        </div>
      </div>
      <button type="submit" style="height: 40px;background: linear-gradient(135deg, #77befc, #6610f2, #00aaff);color: white;font-weight: bold;">${buttonTitle}</button>
    </form>
  </body>`;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic

      const colors = birthdayColorMix(body["year"], body["month"],body["day"]);

      color1 = colors[0];
      color2 = colors[1];
      color3 = colors[2];
      color4 = colors[3];

      title = "Enjoy your color";
      buttonTitle = "Discover another color";
      
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

function birthdayColorMix(year, month, day){

  if(month.length < 2){
    month = '0' + month;
  }
  if(day.length < 2){
    day = '0' + day;
  }

  //always less than 360
  let color4 = year.substr(0,1) + month.substr(0,1) + day.substr(0,1);

  let color3 = day.substr(1,1) + month.substr(1,1) + year.substr(1,1);
  let tmp = (parseInt(day) - parseInt(month));
  if(tmp < 0){
    tmp = tmp * -1;
  }

  let color2 = year.substr(2,2) + tmp;
  let color1 = day.substr(1,1) + month.substr(1,1);

  if(parseInt(color3) >  360){
    color3 = parseInt(color3) % 360;
  }

  if(parseInt(color2) >  360){
    color2 = parseInt(color2) % 360;
  }

  return [color1, color2, color3, color4];
}

server.on("request", (req) => {  
  console.log("event received: ", req.method, req.url);  
}); 

server.listen(3000);

console.log("The server is listening on port 3000.");
