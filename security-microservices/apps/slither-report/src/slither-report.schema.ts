import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define a Mongoose schema for SlitherResult with timestamps
@Schema({ timestamps: true })
export class SlitherResult extends Document {
  // Unique identifier for the Slither result
  @Prop({ required: true })
  id: string;

  // Description of the result
  @Prop({ required: true })
  description: string;

  // The specific check or rule that was applied in Slither
  @Prop({ required: true })
  check: string;

  // Potential impact of the result
  @Prop({ required: true })
  impact: string;

  // Confidence level of the result
  @Prop({ required: true })
  confidence: string;
}

// Create a Mongoose schema from the SlitherResult class
export const SlitherResultSchema = SchemaFactory.createForClass(SlitherResult);