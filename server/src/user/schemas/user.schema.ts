import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Game } from '../../game/schemas/game.schema'
import { Document } from 'mongoose';

export type UserDocument = User & Document;

class SaveGame {
    @Prop()
    game: Game

    @Prop()
    id: string

    @Prop([])
    moves: any[]

    @Prop()
    timePlayed: number

    @Prop()
    startDate: string

    @Prop()
    lastPlayed: string

    @Prop()
    progress: number
}

@Schema()
export class User {
    @Prop()
    name: string

    @Prop()
    id: string

    @Prop()
    avatar: string

    @Prop()
    savedGames: { [id: string]: SaveGame }

    @Prop()
    settings: null
}

export const UserSchema = SchemaFactory.createForClass(User)