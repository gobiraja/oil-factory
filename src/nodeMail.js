const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");


const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});


app.post("/sendMail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "gobikrishnan1044@gmail.com",
      pass: "GobiMahesh@441"
    }
  });

  let mailOptions = {

    from: "gobikrishnan1044@gmail.com", // sender address
    to: "gobikrishnan1044@gmail.com", // list of receivers
    subject: "Wellcome to OilStore", // Subject line
    html: `<h3>customerName: ${user.customerName}</h3>
    <h3>DeliverAddress: ${user.deliveryAddress}</h3>
    <h3>MobileNumber ${user.mobileNumber}</h3><br
    <h3>ProductName ${user.cart[0].productionName}</h3>
    <h3>ProductAmount ${user.cart[0].amount}</h3>
    <h3>ProductCount ${user.cart[0].count}</h3>
    `
    
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}