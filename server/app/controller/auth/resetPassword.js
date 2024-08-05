const { matchedData } = require('express-validator')
const {
  findForgotPassword,
  findUserToResetPassword,
  updatePassword,
  markResetPasswordAsUsed,
} = require('./helpers')
const { handleError } = require('../../middleware/utils')
const bcrypt = require('bcrypt');
const helper = require('../../utility');
const UserCollection = require('../../models/user');

/**
 * Reset password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const resetPassword = async (req, res) => {
  try {
    const user = await findUserToResetPassword(req.body.email)
    let randomPass = helper.util.passwordGenerator();
    const hashPassword = await bcrypt.hash(
      randomPass,
      10,
    );
    user['password'] = hashPassword;
    user['isPasswordChanged'] = true;
    await UserCollection.findOneAndUpdate({ userId: user.userId }, user, { upsert: false }).exec();
    let mailParams = {
      from: helper.mail.mailId.notification,
      email: user.email,
      subject: helper.mail.subject.forgotPassword,
      userName: user.firstname,
      newpass: randomPass
    };
    helper.mail.sendMail(helper.mail.template.forgotPassword, mailParams,
      function () {
        console.info(new Date(), 'password : Success in sending mail');
      },
      function () {
        console.warn(new Date(), 'password : Failure in sending mail');
      }
    );
    res.status(200).json({ success: true })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { resetPassword }