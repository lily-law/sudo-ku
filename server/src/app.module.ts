import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { GameModule } from './game/game.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
        UserModule,
        GameModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI')
            }),
            inject: [ConfigService]
        }),
        ConfigModule.forRoot()
    ]
})
export class AppModule {}
