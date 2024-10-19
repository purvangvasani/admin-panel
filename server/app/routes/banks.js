const BankController = require("../controller/banks/banks.controller");
const helper = require('../utility');

module.exports = function (router) {
    /**
     * @swagger
     * /banks/getAll:
     *   post:
     *     summary: Retrieve all banks
     *     tags: [Banks]
     *     responses:
     *       200:
     *         description: Success!
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                   description: Indicates the retrieval was successful
     *                 bankId:
     *                   type: string
     *                   example: "QQB_XXX"
     *                   description: Unique identifier for the bank
     *                 bankName:
     *                   type: string
     *                   example: "BOBXX"
     *                   description: Name of the bank
     *                 active:
     *                   type: boolean
     *                   example: true
     *                   description: Indicates if the bank is active
     *                 ref:
     *                   type: string
     *                   example: "QQM_XXX"
     *                   description: Reference for the bank
     *                 _id:
     *                   type: string
     *                   example: "123"
     *                   description: Unique internal ID for the bank
     *                 createdAt:
     *                   type: string
     *                   format: date-time
     *                   example: "2024-10-09T22:30:50.238Z"
     *                   description: Date and time when the bank record was created
     *                 updatedAt:
     *                   type: string
     *                   format: date-time
     *                   example: "2024-10-11T12:56:42.134Z"
     *                   description: Date and time when the bank record was last updated
     *                 uploadDetails:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       uploadName:
     *                         type: string
     *                         description: Name of the uploaded document
     *                       uploadValue:
     *                         type: string
     *                         description: URL or value of the uploaded document
     *                 userId:
     *                   type: string
     *                   example: "123"
     *                   description: ID of the user associated with the bank
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
     *         description: Bank not found - The provided bankName does not exist
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                   description: Indicates the bank was not found
     *                 message:
     *                   type: string
     *                   example: "Bank not found"
     */




    router.post('/banks/getAll', helper.util.authenticationMiddleware, BankController.getAll);

    /**
    * @swagger
    * /banks/getBankID:
    *   post:
    *     summary: Get bank ID
    *     tags: [Banks]
    *     security:
    *       - bearerAuth: []
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               bankName:
    *                 type: string
    *                 description: The name of the bank for which to retrieve the ID
    *     responses:
    *       200:
    *         description: Success!
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: true
    *                   description: Indicates the retrieval was successful
    *                 ref:
    *                   type: string
    *                   example: "xyz"
    *                   description: Reference for the bank
    *                 _id:
    *                   type: string
    *                   example: "123"
    *                   description: Unique internal ID for the bank
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
    *         description: Bank not found - The provided bankName does not exist
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                   description: Indicates the bank was not found
    *                 message:
    *                   type: string
    *                   example: "Bank not found"
    */


    router.post('/banks/getBankID', helper.util.authenticationMiddleware, BankController.getBankID);

    /**
     * @swagger
     * /banks/getById:
     *   post:
     *     summary: Retrieve a bank by ID
     *     tags: [Banks]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               bankName:
     *                 type: string
     *                 description: The name of the bank for which to retrieve the ID
     *     responses:
     *       200:
     *         description: Success!
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                   description: Indicates the retrieval was successful
     *                 bankId:
     *                   type: string
     *                   example: "unique_bank_id_123"
     *                   description: Unique identifier for the bank
     *                 bankName:
     *                   type: string
     *                   example: "Example Bank"
     *                   description: Name of the bank
     *                 active:
     *                   type: boolean
     *                   example: true
     *                   description: Indicates if the bank is active
     *                 ref:
     *                   type: string
     *                   example: "bank_reference_001"
     *                   description: Reference ID for the bank
     *                 uploadDetails:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       uploadName:
     *                         type: string
     *                         example: "ID Proof"
     *                         description: Name of the uploaded document
     *                       uploadValue:
     *                         type: string
     *                         example: "id_proof_url"
     *                         description: URL or value of the uploaded document
     *                 deposits:
     *                   type: object
     *                   properties:
     *                     typeId:
     *                       type: string
     *                       example: "TTY_25"
     *                       description: Type ID for the deposit
     *                     type:
     *                       type: string
     *                       example: "deposit"
     *                       description: Type of transaction
     *                     typeDetails:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           required:
     *                             type: boolean
     *                             example: false
     *                             description: Indicates if the field is required
     *                           _id:
     *                             type: string
     *                             example: "66bb74371b919e4a2f22fe06"
     *                             description: Unique ID for the field
     *                           fieldName:
     *                             type: string
     *                             example: "Phone Number"
     *                             description: Name of the field
     *                           displayMode:
     *                             type: string
     *                             example: "input"
     *                             description: Mode of display
     *                           fieldType:
     *                             type: string
     *                             example: "number"
     *                             description: Type of the field
     *                           placeHolder:
     *                             type: string
     *                             example: "Enter your Phone Number"
     *                     userId:
     *                       type: string
     *                       example: "QQU57"
     *                       description: ID of the user associated with the deposit
     *                     createdAt:
     *                       type: string
     *                       format: date-time
     *                       example: "2024-08-12T17:02:08.843Z"
     *                       description: Date and time when the deposit type was created
     *                     updatedAt:
     *                       type: string
     *                       format: date-time
     *                       example: "2024-08-13T14:56:55.893Z"
     *                       description: Date and time when the deposit type was last updated
     *                 withdrawals:
     *                   type: object
     *                   properties:
     *                     typeId:
     *                       type: string
     *                       example: "TTY_26"
     *                       description: Type ID for the withdrawal
     *                     type:
     *                       type: string
     *                       example: "withdrawal"
     *                       description: Type of transaction
     *                     typeDetails:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           required:
     *                             type: boolean
     *                             example: false
     *                             description: Indicates if the field is required
     *                           _id:
     *                             type: string
     *                             example: "66bb74371b919e4a2f22fe08"
     *                             description: Unique ID for the field
     *                           fieldName:
     *                             type: string
     *                             example: "Withdrawal Amount"
     *                             description: Name of the field
     *                           displayMode:
     *                             type: string
     *                             example: "input"
     *                             description: Mode of display
     *                           fieldType:
     *                             type: string
     *                             example: "number"
     *                             description: Type of the field
     *                           placeHolder:
     *                             type: string
     *                             example: "Enter amount to withdraw"
     *                     userId:
     *                       type: string
     *                       example: "QQU57"
     *                       description: ID of the user associated with the withdrawal
     *                     createdAt:
     *                       type: string
     *                       format: date-time
     *                       example: "2024-08-12T17:02:08.843Z"
     *                       description: Date and time when the withdrawal type was created
     *                     updatedAt:
     *                       type: string
     *                       format: date-time
     *                       example: "2024-08-13T14:56:55.893Z"
     *                       description: Date and time when the withdrawal type was last updated
     *                 userId:
     *                   type: string
     *                   example: "QQU57"
     *                   description: ID of the user associated with the bank
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
     *         description: Bank not found - The provided bankName does not exist
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                   description: Indicates the bank was not found
     *                 message:
     *                   type: string
     *                   example: "Bank not found"
     */


    router.post('/banks/getById', helper.util.authenticationMiddleware, BankController.getById);

    /**
   * @swagger
   * /banks/add:
   *   post:
   *     summary: Add a new bank
   *     tags: [Banks]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               bankId:
   *                 type: string
   *                 description: Unique identifier for the bank
   *                 example: "unique_bank_id_123"
   *               bankName:
   *                 type: string
   *                 description: Name of the bank
   *                 example: "Example Bank"
   *               active:
   *                 type: boolean
   *                 description: Indicates if the bank is active
   *                 example: true
   *               ref:
   *                 type: string
   *                 description: Reference ID for the bank
   *                 example: "bank_reference_001"
   *               uploadDetails:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     uploadName:
   *                       type: string
   *                       description: Name of the uploaded document
   *                       example: "ID Proof"
   *                     uploadValue:
   *                       type: string
   *                       description: URL or value of the uploaded document
   *                       example: "id_proof_url"
   *               deposits:
   *                 type: object
   *                 properties:
   *                   typeId:
   *                     type: string
   *                     example: "TTY_25"
   *                     description: Type ID for the deposit
   *                   type:
   *                     type: string
   *                     example: "deposit"
   *                     description: Type of transaction
   *                   typeDetails:
   *                     type: array
   *                     items:
   *                       type: object
   *                       properties:
   *                         required:
   *                           type: boolean
   *                           example: false
   *                           description: Indicates if the field is required
   *                         _id:
   *                           type: string
   *                           example: "66bb74371b919e4a2f22fe06"
   *                           description: Unique ID for the field
   *                         fieldName:
   *                           type: string
   *                           example: "Phone Number"
   *                           description: Name of the field
   *                         displayMode:
   *                           type: string
   *                           example: "input"
   *                           description: Mode of display
   *                         fieldType:
   *                           type: string
   *                           example: "number"
   *                           description: Type of the field
   *                         placeHolder:
   *                           type: string
   *                           example: "Enter your Phone Number"
   *                   userId:
   *                     type: string
   *                     example: "QQU57"
   *                     description: ID of the user associated with the deposit
   *                   createdAt:
   *                     type: string
   *                     format: date-time
   *                     example: "2024-08-12T17:02:08.843Z"
   *                     description: Date and time when the deposit type was created
   *                   updatedAt:
   *                     type: string
   *                     format: date-time
   *                     example: "2024-08-13T14:56:55.893Z"
   *                     description: Date and time when the deposit type was last updated
   *               withdrawals:
   *                 type: object
   *                 properties:
   *                   typeId:
   *                     type: string
   *                     example: "TTY_26"
   *                     description: Type ID for the withdrawal
   *                   type:
   *                     type: string
   *                     example: "withdrawal"
   *                     description: Type of transaction
   *                   typeDetails:
   *                     type: array
   *                     items:
   *                       type: object
   *                       properties:
   *                         required:
   *                           type: boolean
   *                           example: false
   *                           description: Indicates if the field is required
   *                         _id:
   *                           type: string
   *                           example: "66bb74371b919e4a2f22fe08"
   *                           description: Unique ID for the field
   *                         fieldName:
   *                           type: string
   *                           example: "Withdrawal Amount"
   *                           description: Name of the field
   *                         displayMode:
   *                           type: string
   *                           example: "input"
   *                           description: Mode of display
   *                         fieldType:
   *                           type: string
   *                           example: "number"
   *                           description: Type of the field
   *                         placeHolder:
   *                           type: string
   *                           example: "Enter amount to withdraw"
   *                   userId:
   *                     type: string
   *                     example: "QQU57"
   *                     description: ID of the user associated with the withdrawal
   *                   createdAt:
   *                     type: string
   *                     format: date-time
   *                     example: "2024-08-12T17:02:08.843Z"
   *                     description: Date and time when the withdrawal type was created
   *                   updatedAt:
   *                     type: string
   *                     format: date-time
   *                     example: "2024-08-13T14:56:55.893Z"
   *                     description: Date and time when the withdrawal type was last updated
   *               userId:
   *                 type: string
   *                 example: "QQU57"
   *                 description: ID of the user associated with the bank
   *     responses:
   *       201:
   *         description: Bank saved successfully!
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                   description: Indicates the bank was saved successfully
   *                 message:
   *                   type: string
   *                   example: "Bank saved successfully!"
   *                 bankId:
   *                   type: string
   *                   example: "unique_bank_id_123"
   *                   description: Unique identifier for the bank
   *       400:
   *         description: Bank already exists
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                   description: Indicates that the bank already exists
   *                 message:
   *                   type: string
   *                   example: "Bank already exists"
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

    router.post('/banks/add', helper.util.authenticationMiddleware, BankController.add);

    /**
    * @swagger
    * /banks/update:
    *   post:
    *     summary: Update bank details
    *     tags: [Banks]
    *     security:
    *       - bearerAuth: []
    *     parameters:
    *       - name: bankId
    *         in: query
    *         required: true
    *         description: The ID of the bank to be updated
    *         schema:
    *           type: string
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               bankId:
    *                 type: string
    *                 description: Unique identifier for the bank
    *                 example: "unique_bank_id_123"
    *               bankName:
    *                 type: string
    *                 description: Name of the bank
    *                 example: "Example Bank"
    *               ref:
    *                 type: string
    *                 description: Reference ID for the bank
    *                 example: "bank_reference_001"
    *               userId:
    *                 type: string
    *                 description: ID of the user associated with the bank
    *                 example: "QQU57"
    *               active:
    *                 type: boolean
    *                 description: Indicates if the bank is active
    *                 example: true
    *               uploadDetails:
    *                 type: array
    *                 items:
    *                   type: object
    *                   properties:
    *                     uploadName:
    *                       type: string
    *                       description: Name of the uploaded document
    *                       example: "ID Proof"
    *                     uploadValue:
    *                       type: string
    *                       description: URL or value of the uploaded document
    *                       example: "id_proof_url"
    *               deposits:
    *                 type: object
    *                 properties:
    *                   typeId:
    *                     type: string
    *                     example: "TTY_25"
    *                     description: Type ID for the deposit
    *                   type:
    *                     type: string
    *                     example: "deposit"
    *                     description: Type of transaction
    *                   typeDetails:
    *                     type: array
    *                     items:
    *                       type: object
    *                       properties:
    *                         required:
    *                           type: boolean
    *                           example: false
    *                           description: Indicates if the field is required
    *                         _id:
    *                           type: string
    *                           example: "66bb74371b919e4a2f22fe06"
    *                           description: Unique ID for the field
    *                         fieldName:
    *                           type: string
    *                           example: "Phone Number"
    *                           description: Name of the field
    *                         displayMode:
    *                           type: string
    *                           example: "input"
    *                           description: Mode of display
    *                         fieldType:
    *                           type: string
    *                           example: "number"
    *                           description: Type of the field
    *                         placeHolder:
    *                           type: string
    *                           example: "Enter your Phone Number"
    *                   userId:
    *                     type: string
    *                     example: "QQU57"
    *                     description: ID of the user associated with the deposit
    *                   createdAt:
    *                     type: string
    *                     format: date-time
    *                     example: "2024-08-12T17:02:08.843Z"
    *                     description: Date and time when the deposit type was created
    *                   updatedAt:
    *                     type: string
    *                     format: date-time
    *                     example: "2024-08-13T14:56:55.893Z"
    *                     description: Date and time when the deposit type was last updated
    *               withdrawals:
    *                 type: object
    *                 properties:
    *                   typeId:
    *                     type: string
    *                     example: "TTY_26"
    *                     description: Type ID for the withdrawal
    *                   type:
    *                     type: string
    *                     example: "withdrawal"
    *                     description: Type of transaction
    *                   typeDetails:
    *                     type: array
    *                     items:
    *                       type: object
    *                       properties:
    *                         required:
    *                           type: boolean
    *                           example: false
    *                           description: Indicates if the field is required
    *                         _id:
    *                           type: string
    *                           example: "66bb74371b919e4a2f22fe08"
    *                           description: Unique ID for the field
    *                         fieldName:
    *                           type: string
    *                           example: "Withdrawal Amount"
    *                           description: Name of the field
    *                         displayMode:
    *                           type: string
    *                           example: "input"
    *                           description: Mode of display
    *                         fieldType:
    *                           type: string
    *                           example: "number"
    *                           description: Type of the field
    *                         placeHolder:
    *                           type: string
    *                           example: "Enter amount to withdraw"
    *                   userId:
    *                     type: string
    *                     example: "QQU57"
    *                     description: ID of the user associated with the withdrawal
    *                   createdAt:
    *                     type: string
    *                     format: date-time
    *                     example: "2024-08-12T17:02:08.843Z"
    *                     description: Date and time when the withdrawal type was created
    *                   updatedAt:
    *                     type: string
    *                     format: date-time
    *                     example: "2024-08-13T14:56:55.893Z"
    *                     description: Date and time when the withdrawal type was last updated
    *     responses:
    *       200:
    *         description: Bank updated successfully!
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: true
    *                   description: Indicates the bank was updated successfully
    *                 message:
    *                   type: string
    *                   example: "Bank updated successfully!"
    *                 bankId:
    *                   type: string
    *                   example: "unique_bank_id_123"
    *                   description: Unique identifier for the bank
    *                 bankName:
    *                   type: string
    *                   example: "Example Bank"
    *                   description: Updated name of the bank
    *                 active:
    *                   type: boolean
    *                   example: true
    *                   description: Indicates if the bank is active
    *                 ref:
    *                   type: string
    *                   example: "bank_reference_001"
    *                   description: Updated reference ID for the bank
    *                 uploadDetails:
    *                   type: array
    *                   items:
    *                     type: object
    *                     properties:
    *                       uploadName:
    *                         type: string
    *                         example: "ID Proof"
    *                         description: Name of the uploaded document
    *                       uploadValue:
    *                         type: string
    *                         example: "id_proof_url"
    *                         description: URL or value of the uploaded document
    *                 deposits:
    *                   type: object
    *                   properties:
    *                     typeId:
    *                       type: string
    *                       example: "TTY_25"
    *                       description: Type ID for the deposit
    *                     type:
    *                       type: string
    *                       example: "deposit"
    *                       description: Type of transaction
    *                     typeDetails:
    *                       type: array
    *                       items:
    *                         type: object
    *                         properties:
    *                           required:
    *                             type: boolean
    *                             example: false
    *                             description: Indicates if the field is required
    *                           _id:
    *                             type: string
    *                             example: "66bb74371b919e4a2f22fe06"
    *                             description: Unique ID for the field
    *                           fieldName:
    *                             type: string
    *                             example: "Phone Number"
    *                             description: Name of the field
    *                           displayMode:
    *                             type: string
    *                             example: "input"
    *                             description: Mode of display
    *                           fieldType:
    *                             type: string
    *                             example: "number"
    *                             description: Type of the field
    *                           placeHolder:
    *                             type: string
    *                             example: "Enter your Phone Number"
    *                     userId:
    *                       type: string
    *                       example: "QQU57"
    *                       description: ID of the user associated with the deposit
    *                     createdAt:
    *                       type: string
    *                       format: date-time
    *                       example: "2024-08-12T17:02:08.843Z"
    *                       description: Date and time when the deposit type was created
    *                     updatedAt:
    *                       type: string
    *                       format: date-time
    *                       example: "2024-08-13T14:56:55.893Z"
    *                       description: Date and time when the deposit type was last updated
    *                 withdrawals:
    *                   type: object
    *                   properties:
    *                     typeId:
    *                       type: string
    *                       example: "TTY_26"
    *                       description: Type ID for the withdrawal
    *                     type:
    *                       type: string
    *                       example: "withdrawal"
    *                       description: Type of transaction
    *                     typeDetails:
    *                       type: array
    *                       items:
    *                         type: object
    *                         properties:
    *                           required:
    *                             type: boolean
    *                             example: false
    *                             description: Indicates if the field is required
    *                           _id:
    *                             type: string
    *                             example: "66bb74371b919e4a2f22fe08"
    *                             description: Unique ID for the field
    *                           fieldName:
    *                             type: string
    *                             example: "Withdrawal Amount"
    *                             description: Name of the field
    *                           displayMode:
    *                             type: string
    *                             example: "input"
    *                             description: Mode of display
    *                           fieldType:
    *                             type: string
    *                             example: "number"
    *                             description: Type of the field
    *                           placeHolder:
    *                             type: string
    *                             example: "Enter amount to withdraw"
    *                     userId:
    *                       type: string
    *                       example: "QQU57"
    *                       description: ID of the user associated with the withdrawal
    *                     createdAt:
    *                       type: string
    *                       format: date-time
    *                       example: "2024-08-12T17:02:08.843Z"
    *                       description: Date and time when the withdrawal type was created
    *                     updatedAt:
    *                       type: string
    *                       format: date-time
    *                       example: "2024-08-13T14:56:55.893Z"
    *                       description: Date and time when the withdrawal type was last updated
    *                 userId:
    *                   type: string
    *                   example: "QQU57"
    *                   description: ID of the user associated with the bank
    *       400:
    *         description: Bad request or Bank already exists
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                   description: Indicates a bad request or that the bank already exists
    *                 message:
    *                   type: string
    *                   example: "Bad request or Bank already exists"
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
    *         description: Bank not found - The provided bankId does not exist
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 success:
    *                   type: boolean
    *                   example: false
    *                   description: Indicates the bank was not found
    *                 message:
    *                   type: string
    *                   example: "Bank not found"
    */



    router.post('/banks/update', helper.util.authenticationMiddleware, BankController.update);
    /**
 * @swagger
 * /banks/delete:
 *   post:
 *     summary: Delete a bank by ID
 *     tags: [Banks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the bank to be deleted
 *     responses:
 *       204:
 *         description: Bank deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates the bank was deleted successfully
 *                 message:
 *                   type: string
 *                   example: "Bank deleted successfully!"
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
 *         description: Bank not found - The provided ID does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                   description: Indicates the bank was not found
 *                 message:
 *                   type: string
 *                   example: "Bank not found"
 */


    router.post('/banks/delete', helper.util.authenticationMiddleware, BankController.deleteById);
}
