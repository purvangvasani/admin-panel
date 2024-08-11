const AccountDetailsService = require('../services/account-details.service')
module.exports = {
    add,
    update,
    getAccountDetails,
    deleteById,
    getAll
}

async function getAll(req, res, next) {
    try {
        let result = await AccountDetailsService.getAll(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}

async function getAccountDetails(req, res, next) {
    try {
        let result = await AccountDetailsService.getAccountDetails(req.body);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
}

async function deleteById(req, res, next) {
    try {
        if (req && req.body && req.body.accountId) {
            let criteria = req.body;
            let result = await AccountDetailsService.deleteById(criteria);
            res.json(result);
        } else {
            res.json({
                success: false,
                status: helper.error.status.InternalServerError,
                message: helper.error.message.insufficientData
            })
        }
    } catch (e) {
        res.json(e);
    }
}

async function add(req, res, next) {
    try {
        if (req && req.body && req.body.mode) {
            let criteria = req.body;
            criteria['userId'] = req.headers.userid;
            let result = await AccountDetailsService.add(criteria);
            res.json(result);
        } else {
            res.json({
                success: false,
                message: 'Please Provide Account Mode!'
            })
        }
    } catch (e) {
        res.json(e);
    }
}
// async function add(req, res, next) {
//     try {
//         // Extract file information and other fields
//         const image = req.file; // File information from multer
//         const { mode, upiId, accountName, accountNumber, ifsc } = req.body;

//         // Check for required data
//         if (!mode) {
//             return res.json({
//                 success: false,
//                 message: 'Please Provide Account mode!'
//             });
//         }

//         // Construct the criteria object
//         let criteria = {
//             mode,
//             upiId,
//             accountName,
//             accountNumber,
//             ifsc,
//             userId: req.headers.userid
//         };

//         // Include image path if available
//         if (image) {
//             criteria.imageUrl = image.path; // Save image path or URL in criteria
//         }
//         // Call the service to update account details
//         let result = await AccountDetailsService.add(criteria);
//         res.json(result);
//     } catch (e) {
//         res.status(500).json({ success: false, message: e.message });
//     }
// }

async function update(req, res, next) {
    try {
        if (req && req.body && req.body.mode) {
            let criteria = req.body;
            criteria['userId'] = req.headers.userid;
            let result = await AccountDetailsService.update(criteria);
            res.json(result);
        } else {
            res.json({
                success: false,
                message: 'Please Provide Account mode!'
            })
        }
    } catch (e) {
        res.json(e);
    }
}
// async function update(req, res, next) {
//     try {
//         // Extract file information and other fields
//         const image = req.file; // File information from multer
//         const { mode, accountId, upiId, accountName, accountNumber, ifsc } = req.body;

//         // Check for required data
//         if (!mode) {
//             return res.json({
//                 success: false,
//                 message: 'Please Provide Account mode!'
//             });
//         }

//         // Construct the criteria object
//         let criteria = {
//             mode,
//             upiId,
//             accountName,
//             accountNumber,
//             ifsc,
//             userId: req.headers.userid
//         };

//         // Include image path if available
//         if (image) {
//             criteria.imageUrl = image.path; // Save image path or URL in criteria
//         }
//         if (accountId) {
//             criteria.accountId = accountId; // Ensure accountId is included if provided
//         }
//         // Call the service to update account details
//         let result = await AccountDetailsService.update(criteria);
//         res.json(result);
//     } catch (e) {
//         res.status(500).json({ success: false, message: e.message });
//     }
// }