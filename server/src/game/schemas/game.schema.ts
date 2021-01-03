import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
    @Prop()
    template: string

    @Prop()
    seed: string

    @Prop()
    difficulty: number

    @Prop()
    time: number

    @Prop()
    sparcity: number
}

export const GameSchema = SchemaFactory.createForClass(Game)