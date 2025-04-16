import { Request, Response } from 'express';
import UserModel, { IUser } from '../models/User';

// Создание нового пользователя
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, raiting } = req.body;
    const newUser: IUser = new UserModel({
      username,
      email,
      password,
      raiting: raiting || 0, // Если рейтинг не передан, установится 0
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании пользователя', error });
  }
};
// Получение пользователей по рейтингу (score)
export const getUsersByScore = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find().sort({ raiting: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении пользователей по score', error });
  }
};
// Получение пользователя по email
export const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.params; // или можно использовать req.query.email, если передаёте как query-параметр
      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(404).json({ message: 'Пользователь с таким email не найден' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении пользователя по email', error });
    }
  };

// Получение всех пользователей
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении пользователей', error });
  }
};

// Получение пользователя по id
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении пользователя', error });
  }
};

// Обновление данных пользователя
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении пользователя', error });
  }
};

// Удаление пользователя
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }
    res.status(200).json({ message: 'Пользователь успешно удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении пользователя', error });
  }
};
