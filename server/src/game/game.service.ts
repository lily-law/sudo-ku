import { Injectable, NotFoundException } from '@nestjs/common'
import { Game, GameDocument } from './schemas/game.schema'
import { CreateGameDto } from './dto/create-game.dto'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GameService {
    constructor(@InjectModel(Game.name) private readonly gameModel: Model<GameDocument>) {}
    async getByQuery({
        offset = 0,
        limit,
        difficulty,
        time,
        sparcity
    }: {
        offset: number
        limit: number
        difficulty?: number
        time?: number
        sparcity?: number
    }) {
        return this.gameModel.find({difficulty, time, sparcity}, null, {skip: offset, limit}).exec()
    }
    async getById(id: string) {
        return this.gameModel.findById(id).exec()
    }
    async create(createGameDto: CreateGameDto): Promise<Game> {
        const newGame = new this.gameModel(createGameDto)
        return newGame
    }
}
