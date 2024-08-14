import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define a schema with Mongoose and enable automatic timestamps for creation and update
@Schema({ timestamps: true })
export class FrontRunDefenseLog extends Document { // Extend the Document class for type safety and MongoDB methods
  @Prop({ required: true }) // 'from' field is required, indicating the address of the sender
  from: string;

  @Prop({ required: true }) // 'reason' field is required, explaining why the front-run defense was triggered
  reason: string;

  @Prop({ required: true }) // 'amount' field is required, storing the transaction amount
  amount: string;

  @Prop({ required: true }) // 'contractAddress' field is required, indicating the smart contract involved
  contractAddress: string;

  @Prop({ required: true }) // 'hash' field is required, storing the transaction hash for reference
  hash: string;

  @Prop({ required: true }) // 'data' field is required, storing any additional data related to the event
  data: string;
}

// Create a Mongoose schema based on the FrontRunDefenseLog class
export const FrontRunDefenseLogSchema = SchemaFactory.createForClass(FrontRunDefenseLog);