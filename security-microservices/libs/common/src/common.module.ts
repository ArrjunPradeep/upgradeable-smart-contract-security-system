import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';

@Global() // Marks the module as global so that its providers are available across the entire application
@Module({
  imports: [
    // ConfigModule loads configuration files and makes them available throughout the application
    ConfigModule.forRoot({
      // Paths to environment variable files
      envFilePath: ['env/app.env', 'env/database.env', 'env/blockchain.env', 'env/email.env'],
      // Loads configuration from the specified files
      load: config,
      // Caches the configuration for performance
      cache: true,
      // Expands environment variables in the configuration files
      expandVariables: true,
      // Makes the configuration module global
      isGlobal: true,
    }),
    // MongooseModule for MongoDB connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to access configuration
      useFactory: async (configService: ConfigService) => ({
        // MongoDB connection URI obtained from configuration
        uri: configService.getOrThrow<string>('DATABASE.MONGO_URL'),
        // Use new URL parser for MongoDB
        useNewUrlParser: true,
        // Use unified topology for MongoDB
        useUnifiedTopology: true,
        // Enable SSL for MongoDB connection
        ssl: true,
        // Enable retryable writes
        retryWrites: true,
      }),
      // Inject ConfigService to access configuration values
      inject: [ConfigService],
    }),
  ],
  // Providers are empty as this module primarily provides global configuration
  providers: [],
  // Exports ConfigModule so that it can be used in other modules
  exports: [ConfigModule],
})
export class CommonModule {}