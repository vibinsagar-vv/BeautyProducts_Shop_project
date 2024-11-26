const userModel = require("../../models/userModel");
const { EncryptData } = require("../../common/bcrypt"); // Custom encryption function
const jwt = require("jsonwebtoken");

async function newPasswordCntrl(req, res) {
  try {
    console.log(req.body);
    const {email}=req.body
    const { Password, confirmPassword } = req.body.data;

    // Check if Password matches confirmPassword
    if (Password !== confirmPassword) {
      return res.json({
        success: false,
        error: true,
        message: "Passwords do not match. Please check and try again.",
      });
    }

    // Encrypt the password
    const encryptedPassword = await EncryptData(Password);
    console.log("Encrypted Password:", encryptedPassword);

    // Update the user's password
    const updatedUser = await userModel.findOneAndUpdate(
      { email }, // Find the user by email
      { password: encryptedPassword }, // Update password
      { new: true } // Return the updated document
    );

    // If no user found with the given email
    if (!updatedUser) {
      return res.json({
        success: false,
        error: true,
        message: "No user found with the given email.",
      });
    }

    console.log("Updated User:", updatedUser);

    // Successful response
    return res.json({
      data: updatedUser,
      success: true,
      error: false,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Error in newPasswordCntrl:", error);
    return res.json({
      success: false,
      error: true,
      message: error.message || "An error occurred while changing the password.",
    });
  }
}

module.exports = newPasswordCntrl;
