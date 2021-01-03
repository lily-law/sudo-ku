import { Module } from '@nestjs/common'
import { GameController } from './game.controller'
import { GameService } from './game.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Game, GameSchema } from './schemas/game.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }])],
    controllers: [GameController],
    providers: [GameService]
})
export class GameModule {}
