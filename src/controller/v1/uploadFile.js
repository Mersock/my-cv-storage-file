import _ from 'lodash';
import {
  responseWithCustomError,
  responseCollection
} from '../../utils/response';

export const create = async (req, res) => {
  try {
    res.status(201).send(responseCollection(req.file));
  } catch (error) {
    res.status(400).send(responseWithCustomError('Bad Request.', 400));
  }
};
