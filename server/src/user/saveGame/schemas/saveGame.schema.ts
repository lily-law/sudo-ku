import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Game } from '../../../game/schemas/game.schema'
import { Document } from 'mongoose';

export type SaveGameDocument = SaveGame & Document;

@Schema()
export class SaveGame {
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

export const saveGameSchema = SchemaFactory.createForClass(SaveGame)