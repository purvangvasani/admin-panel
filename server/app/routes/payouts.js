const PayoutsController = require("../controller/payouts/payouts.controller");

module.exports = function (router) {
    /**
    * @swagger
    * /payouts/getAll:
    *   get:
    *     summary: Retrieve all payouts
    *     tags: [Payouts]
    *     responses:
    *       200:
    *         description: A list of payouts
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
    *                         example: "6712777cfc9bab15a53afa34"
    *                       accountNumber:
    *                         type: string
    *                         example: "12345"
    *                       amount:
    *                         type: number
    *                         example: 100
    *                       ifsc:
    *                         type: number
    *                         example: 0
    *                       accountName:
    *                         type: string
    *                         example: "Dummy"
    *                       status:
    *                         type: string
    *                         example: "Processing"
    *                       type:
    *                         type: string
    *                         example: "Withdrawal"
    *                       merchant_id:
    *                         type: string
    *                         example: "QQM_21"
    *                       dynamicFields:
    *                         type: object
    *                         properties:
    *                           ifsc:
    *                             type: number
    *                             example: 635802010014
    *                           upiId:
    *                             type: string
    *                             example: "purvang@12"
    *                       id:
    *                         type: string
    *                         example: "TRR_43"
    *                       createdAt:
    *                         type: string
    *                         format: date-time
    *                         example: "2024-10-18T14:58:04.039Z"
    *                       updatedAt:
    *                         type: string
    *                         format: date-time
    *                         example: "2024-10-18T14:58:04.039Z"
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

    router.get('/payouts/getAll', PayoutsController.getAll);
}
