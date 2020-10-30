import { Test, TestingModule } from '@nestjs/testing'
import { GameController } from './game.controller'
import { GameService } from './game.service'

describe('GameController', () => {
    let moduleController: GameController
    const anyUUID = expect.stringMatching(
        /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
    )
    const anyGame = {
        id: anyUUID,
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

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [GameController],
            providers: [GameService]
        }).compile()

        moduleController = moduleRef.get<GameController>(GameController)
    })

    describe('Add game', () => {
        it('should return newly registered game object', async () => {
            const game = await moduleController.addGame({
                template: '1234',
                seed: '1234',
                ...testGameSpec1
            })
            expect(game).toEqual(expect.objectContaining(anyGame))
        })
    })
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
    })
})
