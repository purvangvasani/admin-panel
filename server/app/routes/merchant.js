const MerchantController = require("../controller/merchant.controller");
const helper = require('../utility');

module.exports = function (router) {
    /**
   * @swagger
   * /merchant/getAll:
   *   post:
   *     summary: Retrieve all merchants
   *     tags: [Merchant]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: A list of merchants
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                   description: Indicates the retrieval was successful
   *                 message:
   *                   type: string
   *                   example: "Merchants retrieved successfully!"
   *                   description: Message confirming successful retrieval
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       accountId:
   *                         type: string
   *                         example: "QQAD_XX"
   *                         description: Unique identifier for the merchant's account
   *                       createdAt:
   *                         type: string
   *                         format: date-time
   *                         example: "2024-08-13T15:01:52.611Z"
   *                         description: Timestamp when the account was created
   *                       depositURL:
   *                         type: string
   *                         example: "/deposit-add;id=XXX"
   *                         description: URL for adding deposits
   *                       merchantId:
   *                         type: string
   *                         example: "QQM_XXX"
   *                         description: Unique identifier for the merchant
   *                       merchantStatusURL:
   *                         type: string
   *                         example: "/merchant-summary;id=XXX"
   *                         description: URL for viewing merchant status
   *                       merchantname:
   *                         type: string
   *                         example: "KuberKey"
   *                         description: Name of the merchant
   *                       mode:
   *                         type: string
   *                         example: "upi"
   *                         description: Payment mode (e.g., UPI)
   *                       updatedAt:
   *                         type: string
   *                         format: date-time
   *                         example: "2024-08-13T15:01:52.611Z"
   *                         description: Timestamp when the account was last updated
   *                       url:
   *                         type: string
   *                         example: "XXXXX"
   *                         description: Merchant's URL
   *                       userId:
   *                         type: string
   *                         example: "QQUXX"
   *                         description: Unique identifier for the user associated with the merchant
   *                       withdrawalURL:
   *                         type: string
   *                         example: "/withdrawal-add;id=XXXX"
   *                         description: URL for adding withdrawals
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
   *                   description: Message explaining unauthorized access
   */

    router.post('/merchant/getAll', helper.util.authenticationMiddleware, MerchantController.getAll);

    /**
    * @swagger
    * /merchant/getById:
    *   post:
    *     summary: Retrieve a merchant by ID
    *     tags: [Merchant]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               id:
    *                 type: string
    *                 description: The ID of the merchant to retrieve
    *     responses:
    *       200:
    *         description: Merchant details retrieved successfully
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: true
    *                   description: Indicates the retrieval was successful
    *                 message:
    *                   type: string
    *                   example: "success!"
    *                   description: Success message
    *                 data:
    *                   type: object
    *                   properties:
    *                     _id:
    *                       type: string
    *                       example: "66c8572c8b84f04f71f4d745"
    *                       description: Unique identifier for the merchant
    *                     merchantname:
    *                       type: string
    *                       example: "KuberKey - BOI"
    *                       description: Name of the merchant
    *                     accountId:
    *                       type: string
    *                       example: "QQAD_27"
    *                       description: Unique identifier for the account
    *                     depositFields:
    *                       type: object
    *                       properties:
    *                         _id:
    *                           type: string
    *                           example: "66bb76151b919e4a2f22fec0"
    *                         active:
    *                           type: boolean
    *                           example: true
    *                         bankName:
    *                           type: string
    *                           example: "BOI"
    *                         ref:
    *                           type: string
    *                           example: "QQM_21"
    *                         userId:
    *                           type: string
    *                           example: "QQU57"
    *                         bankId:
    *                           type: string
    *                           example: "QQB_27"
    *                         uploadDetails:
    *                           type: array
    *                           items:
    *                             type: object
    *                         deposits:
    *                           type: array
    *                           items:
    *                             type: object
    *                             properties:
    *                               _id:
    *                                 type: string
    *                                 example: "66bb76151b919e4a2f22fec2"
    *                               typeId:
    *                                 type: string
    *                                 example: "TTY_30"
    *                               type:
    *                                 type: string
    *                                 example: "deposit"
    *                               typeDetails:
    *                                 type: array
    *                                 items:
    *                                   type: object
    *                                   properties:
    *                                     required:
    *                                       type: boolean
    *                                       example: false
    *                                     _id:
    *                                       type: string
    *                                       example: "670fdfe18b84f04f71f4e270"
    *                                     fieldName:
    *                                       type: string
    *                                       example: "Phone Number"
    *                                     displayMode:
    *                                       type: string
    *                                       example: "input"
    *                                     fieldType:
    *                                       type: string
    *                                       example: "text"
    *                                     placeHolder:
    *                                       type: string
    *                                       example: "Enter your Phone Number"
    *                         withdrawals:
    *                           type: array
    *                           items:
    *                             type: object
    *                             properties:
    *                               _id:
    *                                 type: string
    *                                 example: "66bb76151b919e4a2f22fec6"
    *                               typeId:
    *                                 type: string
    *                                 example: "TTY_31"
    *                               type:
    *                                 type: string
    *                                 example: "withdrawal"
    *                               typeDetails:
    *                                 type: array
    *                                 items:
    *                                   type: object
    *                                   properties:
    *                                     required:
    *                                       type: boolean
    *                                       example: false
    *                                     _id:
    *                                       type: string
    *                                       example: "670fdfe28b84f04f71f4e273"
    *                                     fieldName:
    *                                       type: string
    *                                       example: "Email Address"
    *                                     displayMode:
    *                                       type: string
    *                                       example: "input"
    *                                     fieldType:
    *                                       type: string
    *                                       example: "text"
    *                                     placeHolder:
    *                                       type: string
    *                                       example: "Enter your Phone Number"
    *                         createdAt:
    *                           type: string
    *                           format: date-time
    *                           example: "2024-08-13T15:04:53.314Z"
    *                         updatedAt:
    *                           type: string
    *                           format: date-time
    *                           example: "2024-10-16T15:46:42.115Z"
    *                     accountDetails:
    *                       type: object
    *                       properties:
    *                         _id:
    *                           type: string
    *                           example: "66c856f28b84f04f71f4d716"
    *                         accountName:
    *                           type: string
    *                           example: null
    *                         accountNumber:
    *                           type: string
    *                           example: null
    *                         ifsc:
    *                           type: string
    *                           example: null
    *                         mode:
    *                           type: string
    *                           example: "upi"
    *                         upiId:
    *                           type: string
    *                           example: "boim-010503841008@boi"
    *                         userId:
    *                           type: string
    *                           example: "QQU70"
    *                         accountId:
    *                           type: string
    *                           example: "QQAD_27"
    *                         qrcode:
    *                           type: string
    *                           example: "XXXX"
    *                         createdAt:
    *                           type: string
    *                           format: date-time
    *                           example: "2024-08-23T09:31:30.356Z"
    *                         updatedAt:
    *                           type: string
    *                           format: date-time
    *                           example: "2024-08-23T09:34:54.066Z"
    *       404:
    *         description: Merchant not found
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                   description: Indicates the merchant was not found
    *                 message:
    *                   type: string
    *                   example: "Merchant not found"
    *                   description: Message indicating the merchant could not be found
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
    *                   description: Message explaining unauthorized access
    */

    router.post('/merchant/getById', MerchantController.getById);

    /**
  * @swagger
  * /merchant/add:
  *   post:
  *     summary: Add a new merchant
  *     tags: [Merchant]
  *     security:
  *       - bearerAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               merchantCode:
  *                 type: string
  *                 description: A unique code for the merchant
  *                 example: "MKD_001"
  *               merchantname:
  *                 type: string
  *                 description: The name of the merchant
  *                 example: "KuberKey - BOI"
  *               userId:
  *                 type: string
  *                 description: The ID of the user associated with the merchant
  *                 example: "QQUXX"
  *               accountId:
  *                 type: string
  *                 description: The ID of the associated account
  *                 example: "QQAD_27"
  *               mode:
  *                 type: string
  *                 description: The mode of the merchant (e.g., UPI, card, etc.)
  *                 example: "upi"
  *     responses:
  *       201:
  *         description: Merchant added successfully
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   example: true
  *                   description: Indicates the merchant was added successfully
  *                 message:
  *                   type: string
  *                   example: "Merchant added successfully"
  *       400:
  *         description: Bad request
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   example: false
  *                   description: Indicates a bad request error
  *                 message:
  *                   type: string
  *                   example: "Bad request"
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

    router.post('/merchant/add', helper.util.authenticationMiddleware, MerchantController.add);

    /**
 * @swagger
 * /merchant/update:
 *   post:
 *     summary: Update merchant details
 *     tags: [Merchant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: merchantId
 *         in: query
 *         required: true
 *         description: The unique ID of the merchant to be updated
 *         schema:
 *           type: string
 *           example: "66c8572c8b84f04f71f4d745"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               merchantName:
 *                 type: string
 *                 description: The updated name of the merchant
 *                 example: "KuberKey - Updated"
 *               merchantCode:
 *                 type: string
 *                 description: A unique code for the merchant
 *                 example: "MKD_001"
 *               userId:
 *                 type: string
 *                 description: The ID of the user associated with the merchant
 *                 example: "QQUXX"
 *               accountId:
 *                 type: string
 *                 description: The ID of the associated account
 *                 example: "QQAD_27"
 *               mode:
 *                 type: string
 *                 description: The mode of the merchant (e.g., UPI, card, etc.)
 *                 example: "upi"
 *     responses:
 *       200:
 *         description: Merchant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates the merchant was updated successfully
 *                 message:
 *                   type: string
 *                   example: "Merchant updated successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates a bad request error
 *                 message:
 *                   type: string
 *                   example: "Bad request"
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
 *         description: Merchant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates the merchant was not found
 *                 message:
 *                   type: string
 *                   example: "Merchant not found"
 */

    router.post('/merchant/update', helper.util.authenticationMiddleware, MerchantController.update);
    /**
     * @swagger
     * /merchant/deleteById:
     *   post:
     *     summary: Delete a merchant by ID
     *     tags: [Merchant]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - name: merchantId
     *         in: query
     *         required: true
     *         description: The unique ID of the merchant to be deleted
     *         schema:
     *           type: string
     *           example: "66c8572c8b84f04f71f4d745"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: string
     *                 description: The ID of the merchant to be deleted
     *     responses:
     *       204:
     *         description: Merchant deleted successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                   description: Indicates the merchant was deleted successfully
     *                 message:
     *                   type: string
     *                   example: "Merchant deleted successfully!"
     *       404:
     *         description: Merchant not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                   description: Indicates the merchant was not found
     *                 message:
     *                   type: string
     *                   example: "Merchant not found"
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


    router.post('/merchant/deleteById', helper.util.authenticationMiddleware, MerchantController.deleteById);

    /**
   * @swagger
   * /merchant/getMerchantSummaryById:
   *   post:
   *     summary: Get merchant summary by ID
   *     tags: [Merchant]
   *     parameters:
   *       - name: merchantId
   *         in: query
   *         required: true
   *         description: The unique ID of the merchant to retrieve the summary for
   *         schema:
   *           type: string
   *           example: "QQM_20"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               merchantId:
   *                 type: string
   *     responses:
   *       200:
   *         description: Merchant summary retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                   description: Indicates the operation was successful
   *                 message:
   *                   type: string
   *                   example: "success!"
   *                 data:
   *                   type: object
   *                   properties:
   *                     merchant:
   *                       type: object
   *                       properties:
   *                         _id:
   *                           type: string
   *                           example: "66bb75601b919e4a2f22fe84"
   *                         merchantname:
   *                           type: string
   *                           example: "KuberKey"
   *                         userId:
   *                           type: string
   *                           example: "QQU57"
   *                         merchantId:
   *                           type: string
   *                           example: "QQM_20"
   *                         accountId:
   *                           type: string
   *                           example: "QQAD_26"
   *                         mode:
   *                           type: string
   *                           example: "upi"
   *                         url:
   *                           type: string
   *                           example: "$2b$04$KCtwIm.HGJBgW7ZE5HSPqeaJTGD6NvGpBqR5SrOlUwtvIgB5C.KVe"
   *                         createdAt:
   *                           type: string
   *                           format: date-time
   *                           example: "2024-08-13T15:01:52.611Z"
   *                         updatedAt:
   *                           type: string
   *                           format: date-time
   *                           example: "2024-08-13T15:01:52.611Z"
   *                         __v:
   *                           type: integer
   *                           example: 0
   *                     depositAmountTotal:
   *                       type: number
   *                       example: 0
   *                     withdrawalAmountTotal:
   *                       type: number
   *                       example: 0
   *                     depositApprovedCount:
   *                       type: integer
   *                       example: 0
   *                     depositRejectedCount:
   *                       type: integer
   *                       example: 0
   *                     withdrawalApprovedCount:
   *                       type: integer
   *                       example: 0
   *                     withdrawalRejectedCount:
   *                       type: integer
   *                       example: 0
   *                     depositProcessingCount:
   *                       type: integer
   *                       example: 0
   *                     withdrawalProcessingCount:
   *                       type: integer
   *                       example: 0
   *       404:
   *         description: Merchant not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                   description: Indicates the merchant was not found
   *                 message:
   *                   type: string
   *                   example: "Merchant not found"
   *       400:
   *         description: Merchant Id is not provided
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                   description: Indicates the request was malformed
   *                 message:
   *                   type: string
   *                   example: "Merchant Id is not provided"
   *       500:
   *         description: Some unhandled server error has occurred
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                   description: Indicates an internal server error
   *                 message:
   *                   type: string
   *                   example: "Some unhandled server error has occurred"
   */

    router.post('/merchant/getMerchantSummaryById', MerchantController.getMerchantSummaryById);

    /**
   * @swagger
   * /merchant/getMerchantForAccounts:
   *   post:
   *     summary: Get merchants for accounts
   *     tags: [Merchant]
   *     responses:
   *       200:
   *         description: List of merchants for accounts retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                   description: Indicates the operation was successful
   *                 message:
   *                   type: string
   *                   example: "success!"
   *                   description: Success message
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       _id:
   *                         type: string
   *                         example: "66bb75601b919e4a2f22fe84"
   *                       merchantname:
   *                         type: string
   *                         example: "KuberKey"
   *                       userId:
   *                         type: string
   *                         example: "QQU57"
   *                       merchantId:
   *                         type: string
   *                         example: "QQM_20"
   *                       accountId:
   *                         type: string
   *                         example: "QQAD_26"
   *                       mode:
   *                         type: string
   *                         example: "upi"
   *                       url:
   *                         type: string
   *                         example: "$2b$04$KCtwIm.HGJBgW7ZE5HSPqeaJTGD6NvGpBqR5SrOlUwtvIgB5C.KVe"
   *                       createdAt:
   *                         type: string
   *                         format: date-time
   *                         example: "2024-08-13T15:01:52.611Z"
   *                       updatedAt:
   *                         type: string
   *                         format: date-time
   *                         example: "2024-08-13T15:01:52.611Z"
   *                       __v:
   *                         type: integer
   *                         example: 0
   *       401:
   *         description: Unauthorized
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

    router.post('/merchant/getMerchantForAccounts', MerchantController.getMerchantForAccounts);

    /**
     * @swagger
     * /merchant/{id}:
     *   get:
     *     summary: Retrieve payment details for a merchant
     *     tags: [Merchant]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Merchant payment details retrieved successfully
     *       404:
     *         description: Merchant not found
     */
    router.get('/merchant/:id', MerchantController.getMerchantPaymentDetails);
}
    