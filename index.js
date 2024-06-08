const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mrrobot34404@gmail.com',
        pass: 'mrjphbiazhbnkahg'
    }
});
//  let emailList = [];
//  let emailResponses = [];
//  app.post('/bulk-mail', (req, res) => {
//     const { message } = req.body;
//     emailList = message; // Assign the array directly, not as an object
//     sendEmails(0);
//     res.status(201).json(infoRes);
// });
let emailList = [
    'fawadanxari31@gmail.com', 
    'mahnoorfayyaz001@gmail.com',   
    'mahnoor001@gmail.com',   
    'fayyaz001@gmail.com',   
    'fawadansari312@gmail.com', 
    'fawad12@gmail.com', 
    'fawadansari312@gmail.com', 
    'doctorfawad31@gmail.com',
    'doctorfawad1@gmail.com',
];

let batchSize = 5; // Set the batch size
let emailCount = 0;

function sendEmails(startIndex) {
    console.log("function calls");
    // Calculate the end index for the current batch
    let endIndex = Math.min(startIndex + batchSize, emailList.length);

    // Loop through the current batch
    for (let i = startIndex; i < endIndex; i++) {
        let mailOptions = {
                from: '"Prebid House" <mrrobot34404@gmail.com>',
                to: emailList[i],
                // cc: 'mrrobot34404@gmail.com',
                subject: 'Fawad Developer',
                html: `<h1>Welcome to prebid Construction</h1><p>we will respond you quickly</p>`,
                attachments: [
                    // {
                    //     filename: 'image.png',
                    //     path: './Files/thumbnail.png'
                    // }
                    // {
                    //     filename: 'Document.doc',
                    //     path: './Files/doc.docx'
                    // },
                    // {
                    //     filename: 'HtmlPDF.pdf',
                    //     path: './Files/fee.pdf'
                    // }
                ]
        
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Mail not sent to: ' + mailOptions.to);
            } else {
                console.log('Email sent to: ' + mailOptions.to, info.response);
                emailCount++;
                emailResponses.push({ email: mailOptions.to, response: info.response });
            }

            // Check if all emails are sent before displaying the count
            if (emailCount === emailList.length) {
                console.log('Total emails sent: ' + emailCount);
            }
        });
    }

    // Introduce a pause between batches (e.g., 2 seconds)
    setTimeout(() => {
        // Continue with the next batch
        if (endIndex < emailList.length) {
            sendEmails(endIndex);
            console.log("Pause !!!!!!!!!!!");
        }
    }, 20000);
}
sendEmails(0);
// Start sending emails with the first batch



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});