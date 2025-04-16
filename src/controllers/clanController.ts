import { Request, Response } from 'express';
import ClanModel from '../models/Clan';

// Создание нового клана
export const createClan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, image, type, level, members } = req.body;
    const clan = new ClanModel({ name, description, image, type, level, members });
    await clan.save();
    res.status(201).json(clan);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании клана', error });
  }
};

// Получение списка всех кланов
export const getClans = async (req: Request, res: Response): Promise<void> => {
  try {
    const clans = await ClanModel.find();
    res.status(200).json(clans);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении кланов', error });
  }
};

// Получение клана по ID
export const getClan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const clan = await ClanModel.findById(id);
    if (!clan) {
      res.status(404).json({ message: 'Клан не найден' });
      return;
    }
    res.status(200).json(clan);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении клана', error });
  }
};

// Получение участников клана с рейтингом
export const getClanMembersWithRating = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.params;
    const clan = await ClanModel.findOne({ name }).populate('members', 'username raiting');
    if (!clan) {
      res.status(404).json({ message: `Клан с именем ${name} не найден` });
      return;
    }
    res.status(200).json({
      clanName: clan.name,
      members: clan.members,
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении участников клана', error });
  }
};

// Получение клана по имени
export const getClanByName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.params;
    const regex = new RegExp(name.trim(), 'i'); // ищет в любом месте, без ^

    const clans = await ClanModel.find({ name: { $regex: regex } });

    if (!clans.length) {
      res.status(404).json({ message: `Клан с именем ${name} не найден` });
      return;
    }

    res.status(200).json(clans); // отдаём массив подходящих кланов
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении клана по имени', error });
  }
};

// Обновление данных клана
export const updateClan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedClan = await ClanModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedClan) {
      res.status(404).json({ message: 'Клан не найден' });
      return;
    }
    res.status(200).json(updatedClan);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении клана', error });
  }
};

// Удаление клана
export const deleteClan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedClan = await ClanModel.findByIdAndDelete(id);
    if (!deletedClan) {
      res.status(404).json({ message: 'Клан не найден' });
      return;
    }
    res.status(200).json({ message: 'Клан успешно удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении клана', error });
  }
};
