import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserByEmail,
} from '../controllers/userController';

const router: Router = Router();

// Создание пользователя
router.post('/CreateUser', createUser);

// Получение списка пользователей
router.get('/GetUsers', getUsers);

// Получение пользователя по id
router.get('/GetUser/:id', getUser);

// Обновление пользователя по id
router.put('/UpdateUser/:id', updateUser);

// Удаление пользователя по id
router.delete('/DeleteUser/:id', deleteUser);

// Получение пользователя по email
router.get('/GetUserByEmail/:email', getUserByEmail);

export default router;
