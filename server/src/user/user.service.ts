import { Injectable, NotFoundException } from '@nestjs/common'
import { User, SaveGame } from './user.model'
import { Game } from '../game/game.model'

@Injectable()
export class UserService {
    userDB: { [userId: string]: User } = {}
    addUser(name) {
        const newUser = new User(name)
        this.userDB[newUser.id] = newUser
        return this.getUser(newUser.id)
    }
    getUser(id: string) {
        return this.userDB[id] ? { ...this.userDB[id] } : undefined
    }
    updateUser(id: string, update) {
        this.checkUserExists(id)
        delete update.id
        const updatedUser = { ...this.userDB[id], ...update }
        this.userDB[id] = updatedUser
        return this.getUser(id)
    }
    removeUser(id: string) {
        this.checkUserExists(id)
        delete this.userDB[id]
        return !this.userDB[id] ? id : false
    }
    addSaveGame(userId: string, game: Game) {
        this.checkUserExists(userId)
        const saveGame = new SaveGame(game)
        this.userDB[userId].savedGames[saveGame.id] = saveGame
        return { ...this.userDB[userId].savedGames[saveGame.id] }
    }
    updateSaveGame(userId: string, saveGame: SaveGame) {
        this.checkSaveGameExists(userId, saveGame.id)
        this.userDB[userId].savedGames[saveGame.id] = saveGame
        return { ...this.userDB[userId].savedGames[saveGame.id] }
    }
    private checkUserExists(id) {
        if (!this.userDB[id]) {
            throw new NotFoundException(`User not found!`)
        }
    }
    private checkSaveGameExists(userId, saveGameId) {
        this.checkUserExists(userId)
        if (!this.userDB[userId].savedGames[saveGameId]) {
            throw new NotFoundException(`Save game not found!`)
        }
    }
}
