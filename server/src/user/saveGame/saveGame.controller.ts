import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    HostParam,
    Put
} from '@nestjs/common'
import { SaveGameService } from './saveGame.service'

@Controller(':userId/game')
export class SaveGameController {
    constructor(private readonly saveGameService: SaveGameService) {}
    @Post()
    saveGame(@HostParam('userId') userId, @Body('game') game) {
        const savedGame = this.saveGameService.addSaveGame(userId, game)
        return savedGame
    }
    @Get(':gameId')
    getSaveGame(@HostParam('userId') userId, @Param() params) {
        const saveGame = this.saveGameService.getSaveGame(
            userId,
            params.gameId
        )
        return saveGame
    }
    @Put(':gameId')
    updateSaveGame(@HostParam('userId') userId, @Param() params, @Body('saveGame') saveGame) {
        const updatedSaveGame = this.saveGameService.updateSaveGame(
            userId,
            params.gameId,
            saveGame
        )
        return updatedSaveGame
    }
}
