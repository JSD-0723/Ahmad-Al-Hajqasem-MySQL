import {Router} from 'express'
import express from 'express'
const bookController=require('../controllers/bookController');

const router: Router = express.Router();
router.post('/login',bookController.login)
router.post('/signUP',bookController.createUser)
router.post('/', bookController.createBook);
router.get('/rentby',bookController.allBookRentByUser);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.put('/', bookController.updateBook);
router.delete('/', bookController.deleteBook);
router.put('/rentby',bookController.rentByUser);
export default router;

