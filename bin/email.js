/**
 * Created by shahzaib on 2/24/15.
 */
var moment = require('moment');
const mailjet = require('node-mailjet')
    .connect('4c0868baa5e6d7d7dfada0146553e9f8', '662ecedd5df7f95ef77b5981a7ca2057')
const request = mailjet

var sendEmail = function () {
    console.log('Email send');
    request.post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": {
                        "Email": "iffi@aristostar.com",
                        "Name": "Advance Tech"
                    },
                    "To": [
                        {
                            "Email": "iftakhar167@gmail.com",
                            "Name": "Iftakhar Ahmed"
                        }
                    ],
                    "Subject": " Employees Attendece Report For "  + moment().format('LL'),
                    "TextPart": "",
                    "HTMLPart": "<h3>Please find the daily attendence report in attachments</h3>",
                    "CustomID": "AppGettingStartedTest",
                    // 'Attachments': [{
                    //     "Content-Type": "text-plain",
                    //     "Filename": "test.txt",
                    //     "Content": "VGhpcyBpcyB5b3VyIGF0dGFjaGVkIGZpbGUhISEK", // Base64 for "This is your attached file!!!"
                    //   }]
                }
            ]
        }).then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err)
        })

};
sendEmail();
module.exports = sendEmail;
