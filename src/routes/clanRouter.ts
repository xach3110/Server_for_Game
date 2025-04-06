import { Router } from 'express';
import { createClan, getClans, getClan, updateClan, deleteClan, getClanByName, getClanMembersWithRating} from '../controllers/clanController';

const router: Router = Router();

// Создание клана
router.post('/CreateClan', createClan);

// Получение всех кланов
router.get('/GetClans', getClans);

// Получение клана по имени
router.get('/GetClanByName/:name', getClanByName);

// Получение участников клана с рейтингом
router.get('/GetClanMembers/:name', getClanMembersWithRating);
// Получение клана по ID
router.get('/GetClan/:id', getClan);

// Обновление клана по ID
router.put('/UpdateClan/:id', updateClan);

// Удаление клана по ID
router.delete('/DeleteClan/:id', deleteClan);

export default router;
