const TransactionController = require("../controller/transactionRequest/transactionRequest.controller");
const helper = require('../utility');

module.exports = function (router) {
    /**
 * @swagger
 * /transactionRequest/getAll:
 *   post:
 *     summary: Retrieve all transactions
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of transactions
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
 *                   example: "Transaction Requests fetch successfully."
 *                   description: Success message
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "66c884c18b84f04f71f4d8ec"
 *                       accountNumber:
 *                         type: string
 *                         example: "0"
 *                       amount:
 *                         type: number
 *                         example: 500
 *                       ifsc:
 *                         type: number
 *                         example: 0
 *                       status:
 *                         type: string
 *                         example: "Approved"
 *                       type:
 *                         type: string
 *                         example: "Deposit"
 *                       merchant_id:
 *                         type: string
 *                         example: "QQM_21"
 *                       transaction_id:
 *                         type: string
 *                         example: "657890987655"
 *                       dynamicFields:
 *                         type: object
 *                         properties:
 *                           Phone Number:
 *                             type: string
 *                             example: "876658766577"
 *                       id:
 *                         type: string
 *                         example: "TRR_37"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-08-23T12:46:57.960Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-10-19T12:30:26.239Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
 *                       merchantInfo:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "66c8572c8b84f04f71f4d745"
 *                           merchantname:
 *                             type: string
 *                             example: "KuberKey - BOI"
 *                           userId:
 *                             type: string
 *                             example: "QQU70"
 *                           merchantId:
 *                             type: string
 *                             example: "QQM_21"
 *                           accountId:
 *                             type: string
 *                             example: "QQAD_27"
 *                           mode:
 *                             type: string
 *                             example: "upi"
 *                           url:
 *                             type: string
 *                             example: "$2b$04$rB4.zteuE4M96VRKp1ifbeiVBDvic4jPCs/wW5Z2ja/mVBVLYjhvq"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-23T09:32:28.867Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-08-23T09:35:08.235Z"
 *                           __v:
 *                             type: integer
 *                             example: 0
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

    router.post('/transactionRequest/getAll', helper.util.authenticationMiddleware, TransactionController.getAll);

    /**
  * @swagger
  * /transactionRequest/addTransaction:
  *   post:
  *     summary: Add a new transaction
  *     tags: [Transaction]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               amount:
  *                 type: number
  *                 description: The amount for the transaction
  *               merchantId:
  *                 type: string
  *                 description: The ID of the merchant
  *               description:
  *                 type: string
  *                 description: Description of the transaction
  *               merchantname:
  *                 type: string
  *                 example: "KuberKey"
  *               userId:
  *                 type: string
  *                 example: "QQU57"
  *               accountId:
  *                 type: string
  *                 example: "QQAD_26"
  *               mode:
  *                 type: string
  *                 example: "upi"
  *               url:
  *                 type: string
  *                 example: "$2b$04$KCtwIm.HGJBgW7ZE5HSPqeaJTGD6NvGpBqR5SrOlUwtvIgB5C.KVe"
  *     responses:
  *       201:
  *         description: Transaction added successfully
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
  *                   example: "Merchant Saved Successfully!"
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
  *                   description: Indicates the operation failed
  *                 message:
  *                   type: string
  *                   example: "Some unhandled server error has occurred"
  *       409:
  *         description: Duplicate UTR Id detected
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                   example: false
  *                   description: Indicates a conflict occurred
  *                 message:
  *                   type: string
  *                   example: "Duplicate UTR Id detected."
  */


    router.post('/transactionRequest/addTransaction', TransactionController.addTransaction);

    /**
    * @swagger
    * /transactionRequest/updateTransaction:
    *   post:
    *     summary: Update an existing transaction
    *     tags: [Transaction]
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - in: query
    *         name: _id
    *         required: true
    *         schema:
    *           type: string
    *         description: The unique identifier of the transaction
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               transactionId:
    *                 type: string
    *                 description: The ID of the transaction
    *               amount:
    *                 type: number
    *                 description: The updated amount for the transaction
    *               description:
    *                 type: string
    *                 description: Updated description of the transaction
    *               merchantname:
    *                 type: string
    *                 example: "KuberKey"
    *               userId:
    *                 type: string
    *                 example: "QQU57"
    *               accountId:
    *                 type: string
    *                 example: "QQAD_26"
    *               mode:
    *                 type: string
    *                 example: "upi"
    *               url:
    *                 type: string
    *                 example: "$2b$04$KCtwIm.HGJBgW7ZE5HSPqeaJTGD6NvGpBqR5SrOlUwtvIgB5C.KVe"
    *     responses:
    *       200:
    *         description: Transaction updated successfully
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
    *                   example: "Transaction updated successfully"
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
    *                   description: Indicates the operation failed
    *                 message:
    *                   type: string
    *                   example: "Some unhandled server error has occurred"
    *       404:
    *         description: Transaction not found
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                   description: Indicates the transaction was not found
    *                 message:
    *                   type: string
    *                   example: "Transaction not found"
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

    router.post('/transactionRequest/updateTransaction', helper.util.authenticationMiddleware, TransactionController.updateTransaction);

    /**
     * @swagger
     * /transactionRequest/getbyMerchantId:
     *   post:
     *     summary: Retrieve Merchants By Id
     *     tags: [Transaction]
     *     security:
     *       - bearerAuth: [] 
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               type:
     *                 type: string
     *                 example: "Deposit"
     *     responses:
     *       200:
     *         description: A list of transactions
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
     *                   example: "Transaction Requests fetch successfully."
     *                   description: Success message
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       _id:
     *                         type: string
     *                         example: "66c884c18b84f04f71f4d8ec"
     *                       accountNumber:
     *                         type: string
     *                         example: "0"
     *                       amount:
     *                         type: number
     *                         example: 500
     *                       ifsc:
     *                         type: number
     *                         example: 0
     *                       status:
     *                         type: string
     *                         example: "Approved"
     *                       type:
     *                         type: string
     *                         example: "Deposit"
     *                       merchant_id:
     *                         type: string
     *                         example: "QQM_21"
     *                       transaction_id:
     *                         type: string
     *                         example: "657890987655"
     *                       dynamicFields:
     *                         type: object
     *                         properties:
     *                           Phone Number:
     *                             type: string
     *                             example: "876658766577"
     *                       id:
     *                         type: string
     *                         example: "TRR_37"
     *                       createdAt:
     *                         type: string
     *                         format: date-time
     *                         example: "2024-08-23T12:46:57.960Z"
     *                       updatedAt:
     *                         type: string
     *                         format: date-time
     *                         example: "2024-10-19T12:30:26.239Z"
     *                       __v:
     *                         type: integer
     *                         example: 0
     *                       merchantInfo:
     *                         type: object
     *                         properties:
     *                           _id:
     *                             type: string
     *                             example: "66c8572c8b84f04f71f4d745"
     *                           merchantname:
     *                             type: string
     *                             example: "KuberKey - BOI"
     *                           userId:
     *                             type: string
     *                             example: "QQU70"
     *                           merchantId:
     *                             type: string
     *                             example: "QQM_21"
     *                           accountId:
     *                             type: string
     *                             example: "QQAD_27"
     *                           mode:
     *                             type: string
     *                             example: "upi"
     *                           url:
     *                             type: string
     *                             example: "$2b$04$rB4.zteuE4M96VRKp1ifbeiVBDvic4jPCs/wW5Z2ja/mVBVLYjhvq"
     *                           createdAt:
     *                             type: string
     *                             format: date-time
     *                             example: "2024-08-23T09:32:28.867Z"
     *                           updatedAt:
     *                             type: string
     *                             format: date-time
     *                             example: "2024-08-23T09:35:08.235Z"
     *                           __v:
     *                             type: integer
     *                             example: 0
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

    router.post('/transactionRequest/getbyMerchantId', TransactionController.getAll);
}
