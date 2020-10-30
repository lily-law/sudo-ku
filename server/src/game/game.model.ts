import { v4 as uuidv4 } from 'uuid'

export class Game {
    id: string
    constructor(
        public template: string,
        public seed: string,
        public difficulty: number,
        public time: number,
        public sparcity: number
    ) {
        this.id = uuidv4()
    }
}
