import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class FrontRunDefenseLog extends Document {
  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
  contractAddress: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ required: true })
  data: string;
}

export const FrontRunDefenseLogSchema = SchemaFactory.createForClass(FrontRunDefenseLog);
