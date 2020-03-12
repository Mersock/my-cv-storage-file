import multer from 'multer';
import path from 'path';
import {
  responseWithCustomError,
  responseCollection,
  responseValidateError
} from '../../utils/response';
import fs from 'fs'

const profileDir = path.join(__dirname, '../../../public/images/profile');

if(!fs.existsSync(profileDir)){
  fs.mkdirSync(profileDir,{recursive:true})
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../../public/images/profile'));
  },
  filename: function(req, file, cb) {
    const type = file.mimetype.split('/');
    cb(null, `posts-${Date.now()}.${type[1]}`);
  }
});

var upload = multer({ storage: storage }).single('file');

export const create = async (req, res) => {
  try {
    upload(req, res, function(err) {
      if (!req.file) {
        const invalidReq = {
          file: ['file must be require']
        };
        return res
          .status(422)
          .send(responseValidateError(422, 'Unprocessable Entity', invalidReq));
      }
      if (err) {
        const errReq = {
          file: ['Invalid IMAGE Type']
        };
        return res
          .status(422)
          .send(responseValidateError(422, 'Unprocessable Entity', errReq));
      }
      const imagesPath = `${process.env.APP_HOST}/images/profile/${req.file.filename}`;
      res.status(201).send(responseCollection({ imagesPath }));
    });
  } catch (error) {
    res.status(400).send(responseWithCustomError('Bad Request.', 400));
  }
};
