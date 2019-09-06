const mongoose = require('mongoose');
const { response, genFilename, bytesToSize } = require('@helpers');
const GridFsStorage = require('multer-gridfs-storage');
const ENV = require('@env');

const multer = require('multer');
const Grid = require('gridfs-stream');


Grid.mongo = mongoose.mongo;
let gfs;

mongoose.connection
    .once('open', _ => gfs = Grid(mongoose.connection.db, mongoose.mongo))


const storage = new GridFsStorage({
    url: ENV.DATABASE,
    file: (req, file) => {
        return {
            filename: genFilename(file.originalname),
            bucketName: req.local.bucketName
        };
    }
});
const FileUploader = multer({ storage }).single('file');
const ObjectId = mongoose.Types.ObjectId;

const fileService = {
    downloadFile: (req, res) => {
        try {
            const { bucket, fileid } = req.params;
            gfs.collection(bucket);
            gfs.files.find({ _id: ObjectId(fileid) }).toArray(function (err, files) {
                if (!files || files.length === 0) {
                    return res.status(422).json(response(false, 'File tidak ditemukan'));
                }
                var readstream = gfs.createReadStream({
                    filename: files[0].filename
                });

                res.set('Content-Type', files[0].contentType)
                return readstream.pipe(res);
            });
        } catch (error) {
            return res.status(422).json(response(false, 'Error happens while file processed', error));
        }
    },
    bucketList: async (req, res) => {
        try {
            const bucketName = req.params.bucket;
            const limit = req.query.limit ? parseInt(req.query.limit) : 5;
            const skip = req.query.skip ? parseInt(req.query.skip) : 0;

            await gfs.collection(bucketName);
            gfs.files.find().limit(limit).skip(skip).toArray((err, files) => {

                if (!files.length > 0) {
                    return res.status(204).json(response(true, 'Bucket was empty'));
                }
                return res.status(200).json(response(true, `List file in bucket : ${bucketName} `, { data: files }));

            });
        } catch (error) {
            return res.status(422).json(response(false, 'Bucket tidak ditemukan..', error));
        }

    },
    uploadFile: (req, res) => {
        try {
            FileUploader(req, res, async err => {
                if (err) {
                    return res.status(422).json(response(false, err));
                }

                const metadata = {
                    id: req.file.id,
                    filename: req.file.filename,
                    file_size: bytesToSize(req.file.size),
                    file_url: `${ENV.BASE_URL}/${ENV.API_VERSION}/download-file/${req.file.bucketName}/${req.file.id}`,
                    bucketName: req.file.bucketName
                }

                return res.status(200).json(response(true, 'File berhasil diupload', { metadata }));
            });
        } catch (error) {
            return res.status(422).json(response(false, 'File gagal diupload..'));
        }

    },
    deleteFile: (req, res) => {
        try {
            const { bucket, fileid } = req.params;

            gfs.collection(bucket);
            gfs.remove({ _id: ObjectId(fileid), root: bucket });
            return res.status(200).json(response(true, 'File berhasil dihapus'));
        } catch (error) {
            return res.status(422).json(response(false, 'Error happens while file processing', error));
        }
    }
};

module.exports = fileService;
