import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { GameService } from './game.service'

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}
    @Get()
    getListOfGames(
        @Query() query: { offset; limit; difficulty?; time?; sparcity? }
    ) {
        const gamesList = this.gameService.getByQuery(query)
        return gamesList
    }
    @Get(':id')
    getGameById(@Param() params) {
        const game = this.gameService.getById(params.id)
        return game
    }
    @Post()
    addGame(@Body('gameData') gameData) {
        const newGame = this.gameService.create(gameData)
        return newGame
    }
}
