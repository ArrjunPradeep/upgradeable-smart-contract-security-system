import { Module } from '@nestjs/common';
import { FrontRunDefenseService } from './front-run-defense.service'; // Import the FrontRunDefenseService
import { CommonModule } from '@app/common/common.module'; // Import a common module used across the application
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule to interact with MongoDB
import { FrontRunDefenseLog, FrontRunDefenseLogSchema } from './front-run-defense.schema'; // Import the Mongoose schema and model

@Module({
  imports: [
    CommonModule, // Import the CommonModule which may contain shared services, utilities, etc.
    
    // Register the FrontRunDefenseLog schema with Mongoose for the 'front_run_defense_logs' collection in MongoDB
    MongooseModule.forFeature([{ name: FrontRunDefenseLog.name, schema: FrontRunDefenseLogSchema }]),
  ],
  
  controllers: [],
  
  // Provide the FrontRunDefenseService to be used within this module
  providers: [FrontRunDefenseService],
})
export class FrontRunDefenseModule {}