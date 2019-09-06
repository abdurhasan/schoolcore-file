const express = require('express');
const router = express.Router();
const { serviceV1 } = require('@services');
const { auth } = require('@helpers');


router.post('/upload-file', auth, serviceV1.uploadFile);
router.delete('/delete-file/:bucket/:fileid',auth, serviceV1.deleteFile);
router.get('/bucket-list/:bucket', serviceV1.bucketList);

router.get('/download-file/:bucket/:fileid', serviceV1.downloadFile);



module.exports = router;