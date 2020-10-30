import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { GameService } from './game.service'

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}
    @Get()
    getListOfGames(
        @Query() query: { offset; limit; difficulty?; time?; sparcity? }
    ) {
        const gamesList = this.gameService.getGamesByQuery(query)
        return gamesList
    }
    @Get(':id')
    getGameById(@Param() params) {
        const game = this.gameService.getGameById(params.id)
        return game
    }
    @Post()
    addGame(@Body('gameData') gameData) {
        const newGame = this.gameService.addGame(gameData)
        return newGame
    }
}
