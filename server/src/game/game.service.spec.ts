import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import {GameController} from './game.controller'
import { GameService } from './game.service'
import { GameSchema, Game } from './schemas/game.schema'

const newGameData = { 
    template: '2050314161810212226282031333437383142444054565751626364666073757670838485878-93629482763213645967741962453176439826',
    seed: '',
    difficulty: 2,
    time: 4,
    sparcity: 43
 }
 const anyMongoID = expect.stringMatching(
    /\b[0-9a-f]{24}\b/
)
// 5fa95f5995cc6c585fb4e8b2
const anyGame = {
    id: anyMongoID,
    template: expect.any(String),
    seed: expect.any(String),
    difficulty: expect.any(Number),
    time: expect.any(Number),
    sparcity: expect.any(Number)
}
const nonExistantGame = {
    id: '12345678-1234-1234-123456789abc'
}
const testGameSpec1 = {
    difficulty: 1,
    sparcity: 1,
    time: 1
}

describe('GameController', () => {
    let module: TestingModule
    let moduleController: GameController
    beforeEach(async () => {
        module = await Test.createTestingModule({
        imports: [
            MongooseModule.forRoot(process.env.MONGO_URL),
            MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }])
        ],
        controllers: [GameController],
        providers: [
            GameService,
        ],
        }).compile();

        moduleController = module.get<GameController>(GameController)
    })

    afterEach(async () => {
        module.close()
    })

    it('should be defined', async () => {
        expect(moduleController).toBeDefined();
    });
    describe('addGame', () => {
        it('should return newly registered game object', async () => {
            const game = await moduleController.addGame({
                template: '1234',
                seed: '1234',
                ...testGameSpec1
            })
            expect(game).toEqual(expect.objectContaining(anyGame))
        })
    })
    /*
    describe('Get game by id', () => {
        it('should return game object', async () => {
            const game = await moduleController.addGame('test_game')
            expect(moduleController.getGameById({ id: game.id })).toEqual(game)
        })
    })
    describe('Get non existant game', () => {
        it('should throw exception', async () => {
            expect(() =>
                moduleController.getGameById({ id: nonExistantGame.id })
            ).toThrow()
        })
    })
    describe('Get list of games', () => {
        it('should return empty array', async () => {
            expect(
                moduleController.getListOfGames({ offset: 0, limit: 0 })
            ).toEqual([])
        })
        it('should return array with games matching filter', async () => {
            await moduleController.addGame({
                template: '1234',
                seed: '1234',
                ...testGameSpec1
            })
            await moduleController.addGame({
                template: '1234',
                seed: '1234',
                ...testGameSpec1
            })
            await moduleController.addGame({
                template: '1234',
                seed: '1234',
                ...testGameSpec1
            })
            expect(
                moduleController.getListOfGames({
                    offset: 0,
                    limit: 3,
                    ...testGameSpec1
                })
            ).toEqual([
                { ...anyGame, ...testGameSpec1 },
                { ...anyGame, ...testGameSpec1 },
                { ...anyGame, ...testGameSpec1 }
            ])
        })
    }) */
})