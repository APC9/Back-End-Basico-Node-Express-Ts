import { Router } from 'express';
import { getUsers, putUsers, postUsers, deleteUSers, patchUsers } from '../controllers/users';

const router: Router = Router();

router.get('/', getUsers);

router.put('/:id', putUsers);

router.post('/', postUsers);

router.delete('/', deleteUSers);

router.patch('/', patchUsers);


export default router;