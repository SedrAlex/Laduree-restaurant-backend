const FCM = require("fcm-node");

var serverKey = require("../laduree-3c9af-firebase-adminsdk-vv5j2-3af05c4c6c.json"); //put the generated private key path here

require("dotenv").config();

// process.env.SERVER_KEY;

//

const sendNotification = (title, body, send_to,callback) => {
  try {
    var fcm = new FCM(serverKey);
    let message = {
      // to: "token",
      // /topics/-----------------------------------------------------------
      to: `/topics/${send_to}`,
      notification: {
        title: title,
        body: body,
        sound: "default",
      },
    };
    console.log(message);
    fcm.send(message, (err, response) => {
      callback(err, response);
    });
  } catch (e) {}
};

module.exports = {
  sendNotification,
};
