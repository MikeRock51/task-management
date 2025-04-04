import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                // type: configService.getOrThrow('DB_TYPE') as any,
                host: configService.getOrThrow('DB_HOST'),
                port: configService.getOrThrow('DB_PORT'),
                username: configService.getOrThrow('DB_USER'),
                password: configService.getOrThrow('DB_PASSWORD'),
                database: configService.getOrThrow('DB_NAME'),
                entities: [__dirname + '/../**/*.entity.{js,ts}'],
                synchronize: configService.getOrThrow('DB_SYNCHRONIZE') === 'true',
            }),
            inject: [ConfigService]
        })
    ],
})
export class DatabaseModule {}
