import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SlitherResult extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  check: string;

  @Prop({ required: true })
  impact: string;

  @Prop({ required: true })
  confidence: string;
}

export const SlitherResultSchema = SchemaFactory.createForClass(SlitherResult);
