import { Schema, model, Document } from "mongoose";

export interface IClan extends Document {
  name: string;
  description: string;
  members: Schema.Types.ObjectId[];
  image: string; // ✅ имя файла
  type: "open" | "closed"; // ✅ нижний регистр
  level: number;
}

const ClanSchema = new Schema<IClan>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, enum: ["open", "closed"], required: true },
    level: { type: Number, default: 1 },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
      validate: {
        validator: function (members: any[]) {
          return members.length <= 50;
        },
        message: "Клан не может содержать более 50 участников.",
      },
    },
  },
  {
    collection: "clans",
    timestamps: true,
  }
);

export default model<IClan>("Clan", ClanSchema);
