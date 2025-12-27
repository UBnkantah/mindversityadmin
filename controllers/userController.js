const { sendEmail } = require("../sendEmail");
const { Contact, User } = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendTelegramNotification } = require("../sendTelegramNotification");

require("dotenv").config();


const signInToken = (id) => {
  return jwt.sign({ id }, "my-secret-key", {
    expiresIn: "90d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signInToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  return res.status(statusCode).json({ token });
};



async function createContact(req, res) {
  const { firstname, lastname, email, address, city, state, phoneno, altphoneno, message } = req.body;

  try {
    // 1️⃣ Save contact to DB
    const newcontact = await Contact.create({
      firstname,
      lastname,
      email,
      address,
      city,
      state,
      phoneno,
      altphoneno,
      message
    });

    // 2️⃣ Prepare email options
    const mailOptions = {
      email, // user's email for reply-to
      subject: "You have a new Order",
      html: `
        <h3>New Contact Submission</h3>
        <p><b>First Name:</b> ${firstname}</p>
        <p><b>Last Name:</b> ${lastname}</p>
        <p><b>Email Address:</b> ${email}</p>
        <p><b>Address:</b> ${address}</p>
        <p><b>City:</b> ${city}</p>
        <p><b>State:</b> ${state}</p>
        <p><b>Phone No:</b> ${phoneno}</p>
        <p><b>Alt Phone No:</b> ${altphoneno}</p>
        <p><b>Message:</b> ${message}</p>
      `
    };

    // 3️⃣ Send email
    const emailResult = await sendEmail(mailOptions);
    if (!emailResult.success) {
      console.log("Failed to send email:", emailResult.error);
    }

    // 4️⃣ Prepare nicely formatted Telegram message (HTML supported)
    const telegramMessage = `
<b>New Contact Submission</b>

<b>First Name:</b> ${firstname}
<b>Last Name:</b> ${lastname}
<b>Email Address:</b> ${email}
<b>Address:</b> ${address}
<b>City:</b> ${city}
<b>State:</b> ${state}
<b>Phone No:</b> ${phoneno}
<b>Alt Phone No:</b> ${altphoneno}
<b>Message:</b>
${message}
    `;

    // 5️⃣ Send Telegram notification to admin
    await sendTelegramNotification(telegramMessage);

    // 6️⃣ Respond to frontend
    res.json({
      message: "successful",
      newcontact,
      emailSent: emailResult.success
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Internal server error ${err}` });
  }
}


async function registeruser(req, res) {
  // console.log("Hello")
  try {
    const { fullname, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = await User.create({
      fullname,
      password: hashedPassword,
      email,
    });
    res.json({
      message: "successful",
      newuser,
    });

  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err}` });
  }
}

async function loginuser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // res.status(200).json({ message: "Login successful!" });
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err}` });
  }
}

async function createUser(req, res) {
  try {
    const { fullname, email, company, city, state, number, postalcode, order, address } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);   
    const newuser = await User.create({
      fullname,
      email,
      company,
      city,
      state,
      number,
      postalcode,
      order,
      address
    });
    res.json({
      message: "successful",
      newuser,
    });
  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err}` });
  }
};

const getSingleUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "no user" });
  }
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  // console.log("checked");

  try {
    const updateUserInfo = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: updateUserInfo,
    });
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      users
    })
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }

}

module.exports = { createContact, registeruser, loginuser, getSingleUser, updateUser, getAllUsers, updateUser, createUser };