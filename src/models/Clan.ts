import { Schema, model, Document } from 'mongoose';

export interface IClan extends Document {
  name: string;
  description: string;
  members: Schema.Types.ObjectId[]; // ссылки на пользователей
}

const ClanSchema = new Schema<IClan>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    members: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
      validate: {
        validator: function(members: any[]) {
          return members.length <= 20;
        },
        message: 'Клан не может содержать более 20 участников.'
      }
    }
  },
  {
    collection: 'clans',
    timestamps: true,
  }
);

const ClanModel = model<IClan>('Clan', ClanSchema);
export default ClanModel;
