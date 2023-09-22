import {Router} from 'express'
import express from 'express'
const bookController=require('../controllers/bookController');

const router: Router = express.Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.put('/', bookController.updateBook);
router.delete('/', bookController.deleteBook);

export default router;

