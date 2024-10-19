const AccountDetailController = require("../controller/account-details.controller");
const helper = require('../utility');
const upload = require('../../config/multerConfig');

module.exports = function (router) {
    /**
     * @swagger
     * /account/getAccountDetails:
     *   post:
     *     summary: Get account details
     *     tags: [Account]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               accountId:
     *                 type: string
     *                 description: The ID of the account to retrieve details for
     *     responses:
     *       200:
     *         description: Success! Account details retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                   description: Indicates the retrieval was successful
     *                 data:
     *                   type: object
     *                   properties:
     *                     accountId:
     *                       type: string
     *                       description: Unique identifier for the account
     *                     accountName:
     *                       type: string
     *                       description: Name of the account holder
     *                     email:
     *                       type: string
     *                       description: Email associated with the account
     *                     createdAt:
     *                       type: string
     *                       format: date-time
     *                       description: Timestamp when the account was created
     *       400:
     *         description: Bad request (e.g., missing required fields)
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                   description: Indicates a failure in the request
     *                 message:
     *                   type: string
     *                   example: "Bad request: AccountId is not provided"
     *       401:
     *         description: Unauthorized - Invalid or missing authentication token
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                   description: Indicates unauthorized access
     *                 message:
     *                   type: string
     *                   example: "Some unhandled server error has occurred"
     *       404:
     *         description: Account not found - The provided accountId does not exist
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                   description: Indicates the account was not found
     *                 message:
     *                   type: string
     *                   example: "Account not found"
     */



    router.post('/account/getAccountDetails', helper.util.authenticationMiddleware, AccountDetailController.getAccountDetails);

    /**
 * @swagger
 * /account/add:
 *   post:
 *     summary: Add a new account
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountName:
 *                 type: string
 *                 description: The name of the account
 *               accountNumber:
 *                 type: string
 *                 description: The account number
 *               ifsc:
 *                 type: string
 *                 description: The IFSC code of the bank
 *               mode:
 *                 type: string
 *                 description: The mode of the account (e.g., savings, current)
 *               upiId:
 *                 type: string
 *                 description: The UPI ID associated with the account (optional)
 *               userId:
 *                 type: string
 *                 description: The ID of the user making the request
 *               accountId:
 *                 type: string
 *                 description: The ID of the account to be added (optional)
 *               qrcode:
 *                 type: string
 *                 description: The QR code for the account (optional)
 *     responses:
 *       201:
 *         description: Account Details Saved Successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates the account was added successfully
 *                 message:
 *                   type: string
 *                   example: "Account details saved successfully"
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates a failure in the request
 *                 message:
 *                   type: string
 *                   example: "Bad request: Required fields missing or invalid"
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates unauthorized access
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 */


    router.post('/account/add', helper.util.authenticationMiddleware, AccountDetailController.add);
    /**
  * @swagger
  * /account/getAll:
  *   post:
  *     summary: Get all accounts
  *     tags: [Account]
  *     security:
  *       - bearerAuth: []
  *     responses:
  *       200:
  *         description: List of accounts retrieved successfully
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   example: true
  *                   description: Indicates the retrieval was successful
  *                 data:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       accountId:
  *                         type: string
  *                         description: Unique identifier for the account
  *                       mode:
  *                         type: string
  *                         description: Mode of the account (e.g., Savings, Current)
  *                       upiId:
  *                         type: string
  *                         description: UPI ID associated with the account
  *                       accountName:
  *                         type: string
  *                         description: Name of the account holder
  *                       accountNumber:
  *                         type: string
  *                         description: Account number of the account
  *                       ifsc:
  *                         type: string
  *                         description: IFSC code of the bank
  *                       userId:
  *                         type: string
  *                         description: ID of the user associated with the account
  *                       qrcode:
  *                         type: string
  *                         description: URL or data for the QR code associated with the account
  *                       createdAt:
  *                         type: string
  *                         format: date-time
  *                         description: Timestamp when the account was created
  *                       updatedAt:
  *                         type: string
  *                         format: date-time
  *                         description: Timestamp when the account was last updated
  *                 example:
  *                   success: true
  *                   data:
  *                     - accountId: "acc_123456"
  *                       mode: "Savings"
  *                       upiId: "example@upi"
  *                       accountName: "John Doe"
  *                       accountNumber: "123456789012"
  *                       ifsc: "EXMP0001234"
  *                       userId: "user_001"
  *                       qrcode: "https://example.com/qrcode.png"
  *                       createdAt: "2024-08-12T17:02:08.843Z"
  *                       updatedAt: "2024-08-13T14:56:55.893Z"
  *                     - accountId: "acc_654321"
  *                       mode: "Current"
  *                       upiId: "example2@upi"
  *                       accountName: "Jane Smith"
  *                       accountNumber: "987654321098"
  *                       ifsc: "EXMP0005678"
  *                       userId: "user_002"
  *                       qrcode: "https://example.com/qrcode2.png"
  *                       createdAt: "2024-08-12T17:02:08.843Z"
  *                       updatedAt: "2024-08-13T14:56:55.893Z"
  *       401:
  *         description: Unauthorized - Invalid or missing authentication token
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   example: false
  *                   description: Indicates unauthorized access
  *                 message:
  *                   type: string
  *                   example: "Unauthorized access"
  */




    router.post('/account/getAll', helper.util.authenticationMiddleware, AccountDetailController.getAll);

    /**
    * @swagger
    * /account/deleteById:
    *   post:
    *     summary: Delete an account by ID
    *     tags: [Account]
    *     security:
    *       - bearerAuth: []
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               accountId:
    *                 type: string
    *                 description: The ID of the account to be deleted
    *     responses:
    *       204:
    *         description: Account deleted successfully
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: true
    *                   description: Indicates the account was deleted successfully
    *                 message:
    *                   type: string
    *                   example: "Account deleted successfully"
    *       401:
    *         description: Unauthorized - Invalid or missing authentication token
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                   description: Indicates unauthorized access
    *                 message:
    *                   type: string
    *                   example: "Unauthorized access"
    *       404:
    *         description: Account not found - The provided accountId does not exist
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                   description: Indicates the account was not found
    *                 message:
    *                   type: string
    *                   example: "Account not found"
    */

    router.post('/account/deleteById', helper.util.authenticationMiddleware, AccountDetailController.deleteById);

    /**
  * @swagger
  * /account/update:
  *   post:
  *     summary: Update an account
  *     tags: [Account]
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - name: accountId
  *         in: query
  *         required: true
  *         description: The ID of the account to be updated
  *         schema:
  *           type: string
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               accountName:
  *                 type: string
  *                 description: The name of the account
  *               accountNumber:
  *                 type: string
  *                 description: The account number
  *               ifsc:
  *                 type: string
  *                 description: The IFSC code of the bank
  *               mode:
  *                 type: string
  *                 description: The mode of the account (e.g., savings, current)
  *               upiId:
  *                 type: string
  *                 description: The UPI ID associated with the account
  *               userId:
  *                 type: string
  *                 description: The ID of the user making the update request
  *               qrcode:
  *                 type: string
  *                 description: The QR code for the account (optional)
  *     responses:
  *       200:
  *         description: Account updated successfully!
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   example: true
  *                   description: Indicates whether the update was successful
  *                 message:
  *                   type: string
  *                   example: "Account updated successfully"
  *       400:
  *         description: Bad request (e.g., missing required fields)
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   example: false
  *                   description: Indicates a failure in the request
  *                 message:
  *                   type: string
  *                   example: "Bad request: Required fields missing"
  *       401:
  *         description: Unauthorized (invalid or missing token)
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   example: false
  *                   description: Indicates unauthorized access
  *                 message:
  *                   type: string
  *                   example: "Unauthorized access"
  *       404:
  *         description: Account not found (e.g., invalid accountId)
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   example: false
  *                   description: Indicates the account was not found
  *                 message:
  *                   type: string
  *                   example: "Account not found"
  */

    router.post('/account/update', helper.util.authenticationMiddleware, AccountDetailController.update);
}
