const express = require("express");
const router = express.Router();
const User = require("../models/User");
const nodemailer = require("nodemailer");
router.get("/", (req, res) => {
    res.send("Hello basu");
});

router.post("/api/adduser", async (req, res) => {
    const { name, email, phone, hobbies } = req.body;
    try {
        const user = new User({ name, email, phone, hobbies });
        await user.save();
        res.status(200).json({ msg: "User Created" });
    } catch (err) {
        res.status(422).json({ msg: "Something Went Wrong" });
    }

});

router.post("/api/updateuser", async (req, res) => {

    const { name, email, phone, hobbies } = req.body.user;
    const { id } = req.body;

    try {
        const isUpdated = await User.findByIdAndUpdate(id, { name, email, phone, hobbies });

        res.status(200).json({ msg: "User Updated" });
    } catch (err) {
        res.status(422).json({ msg: "Something Went Wrong" });
    }

});

router.delete("/api/deleteuser/:id", async (req, res) => {


    const { id } = req.params


    try {
        const isDeleted = await User.deleteOne({ _id: id });

        res.status(200).json({ msg: "User Deleted" });
    } catch (err) {
        res.status(422).json({ msg: "Something Went Wrong" });
    }

});
router.get("/api/getusers", async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (err) {
        res.status(422).json({ msg: "Something Went Wrong" });
    }

});


router.post('/api/senddata', async (req, res) => {
    const { dataToBeSend } = req.body;
    try {

        const output = `
        <h4> Data of the users </h4>
        <p>${dataToBeSend}
        </p>
        <br />
        <p>Thank you</p>
       `;

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "basu1735@gmail.com", // generated ethereal user
                pass: "hvcvcjbpbbslrgtm", // generated ethereal password
            },
        });
        let mailOption = {
            from: 'basu1735@gmail.com', // sender address
            to: `info@redpositive.in`, // list of receivers
            subject: "Data of the users", // Subject line
            text: "User's Data", // plain text body
            html: output, // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                res.json(error);
            } else {
                const data = info.messageId;
                res.status(200).json({ msg: "Sent", data });
            }
        });
    } catch (err) {
        res.status(422).json({ msg: "Sent Failed" });
    }
})

module.exports = router;