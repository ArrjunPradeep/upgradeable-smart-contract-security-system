import { Module } from '@nestjs/common';
import { PerformanceMonitoringService } from './performance-monitoring.service';
import { CommonModule } from '@app/common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DATABASE.HOST'),
        port: configService.getOrThrow<number>('DATABASE.PORT'),
        username: configService.getOrThrow<string>('DATABASE.USERNAME'),
        password: configService.getOrThrow<string>('DATABASE.PASSWORD'),
        database: configService.getOrThrow<string>('DATABASE.NAME'),
        autoLoadEntities: configService.getOrThrow<boolean>('DATABASE.AUTO_LOAD_ENTITIES'),
        synchronize: configService.getOrThrow<boolean>('DATABASE.SYNCHRONIZE')
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [],
  providers: [PerformanceMonitoringService],
})

export class PerformanceMonitoringModule {}