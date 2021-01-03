import { v4 as uuidv4 } from 'uuid'
import { Game } from '../game/game.model'

export class SaveGame {
    id: string
    moves: any[]
    timePlayed: number
    startDate: string
    lastPlayed: string
    progress: number
    constructor(public game: Game) {
        this.id = uuidv4()
        this.startDate = Date.now().toString()
    }
}

export class User {
    id: string
    avatar: string
    savedGames: { [id: string]: SaveGame } = {}
    settings: null
    constructor(public name: string) {
        this.id = uuidv4()
    }
}
