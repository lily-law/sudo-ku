import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class SaveGameService {
    addSaveGame(userId: string, game: Game) {
        const saveGame = new SaveGame(game)
        this.userDB[userId].savedGames[saveGame.id] = saveGame
        return { ...this.userDB[userId].savedGames[saveGame.id] }
    }
    getSaveGame(userId: string, gameId: string) {
        this.checkSaveGameExists(userId, gameId)
        const saveGame = this.userDB[userId].savedGames[gameId]
        return saveGame
    }
    updateSaveGame(userId: string, gameId: string, saveGame: SaveGame) {
        this.checkSaveGameExists(userId, gameId)
        this.userDB[userId].savedGames[gameId] = saveGame
        return { ...this.userDB[userId].savedGames[gameId] }
    }
    private checkSaveGameExists(userId, saveGameId) {
        if (!this.userDB[userId].savedGames[saveGameId]) {
            throw new NotFoundException(`Save game not found!`)
        }
    }
}
