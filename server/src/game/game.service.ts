import { Injectable, NotFoundException } from '@nestjs/common'
import { Game } from './game.model'

@Injectable()
export class GameService {
    private gameDB: { [gameId: string]: Game } = {}
    getGamesByQuery({
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
        const gamesList = []
        const filter = { difficulty, time, sparcity }
        Object.values(this.gameDB).forEach(game => {
            if (gamesList.length < offset + limit) {
                const qualifies = Object.entries(filter).every(
                    ([key, value]) => !value || game[key] === value
                )
                if (qualifies) {
                    gamesList.push({ ...game })
                }
            }
        })
        return gamesList.slice(offset)
    }
    getGameById(id: string) {
        return this.gameDB[id] ? { ...this.gameDB[id] } : undefined
    }
    addGame({ template, seed, difficulty, time, sparcity }) {
        const newGame = new Game(template, seed, difficulty, time, sparcity)
        this.gameDB[newGame.id] = newGame
        return this.getGameById(newGame.id)
    }
}
