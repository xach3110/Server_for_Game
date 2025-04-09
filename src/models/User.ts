import { Schema, model, Document } from 'mongoose';

// 1. Определяем интерфейс, описывающий поля пользователя.
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    raiting: number;
    score: number;
    createdAt: Date;
}

// 2. Создаём схему Mongoose, соответствующую интерфейсу.
const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    raiting:{ type: Number, default: 0, required: true },
    score:{ type: Number, default: 0, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    // Дополнительные настройки схемы (например, коллекция, временные метки и т.д.)
    collection: 'users',
  }
);

// 3. Создаём и экспортируем модель
const UserModel = model<IUser>('User', UserSchema);
export default UserModel;
