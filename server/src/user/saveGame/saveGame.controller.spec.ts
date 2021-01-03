import { Test, TestingModule } from '@nestjs/testing'
import { SaveGameController } from './saveGame.controller'
import { SaveGameService } from './saveGame.service'

describe('SaveGameController', () => {
    let moduleController: SaveGameController
    const anyUUID = expect.stringMatching(
        /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
    )
    const anySaveGame = {
        name: expect.any(String),
        id: anyUUID
    }
    const nonExistantSaveGame = {
        id: '12345678-1234-1234-123456789abc'
    }
    const anySaveGame = {
        id: anyUUID
    }

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [SaveGameController],
            providers: [SaveGameService]
        }).compile()

        moduleController = moduleRef.get<SaveGameController>(SaveGameController)
    })

    describe('Add saveGame', () => {
        it('should return newly registered saveGame object', async () => {
            const saveGame = await moduleController.addSaveGame('test_saveGame')
            expect(saveGame).toEqual(expect.objectContaining(anySaveGame))
        })
    })
    describe('Get saveGame', () => {
        it('should return saveGame object', async () => {
            const saveGame = await moduleController.addSaveGame('test_saveGame')
            expect(moduleController.getSaveGame({ id: saveGame.id })).toEqual(saveGame)
        })
    })
    describe('Get non existant saveGame', () => {
        it('should throw exception', async () => {
            expect(() =>
                moduleController.getSaveGame({ id: nonExistantSaveGame.id })
            ).toThrow()
        })
    })
    describe('Update saveGame name', () => {
        it('should return updated saveGame object', async () => {
            const saveGame = await moduleController.addSaveGame('test_saveGame')
            const updateSaveGame = await moduleController.updateSaveGame(
                { id: saveGame.id },
                { name: 'test_saveGame-updated' }
            )
            expect(updateSaveGame).toEqual(
                expect.objectContaining({
                    ...anySaveGame,
                    name: 'test_saveGame-updated'
                })
            )
        })
    })
    describe('Update non existant saveGame name', () => {
        it('should throw exception', async () => {
            expect(() =>
                moduleController.updateSaveGame(
                    { id: nonExistantSaveGame.id },
                    { name: 'test_saveGame-updated' }
                )
            ).toThrow()
        })
    })
    describe('Update saveGame id', () => {
        it('should not change id and return unchanged saveGame object', async () => {
            const saveGame = await moduleController.addSaveGame('test_saveGame')
            const updateSaveGame = await moduleController.updateSaveGame(
                { id: saveGame.id },
                { id: 'test_saveGame-updated' }
            )
            expect(updateSaveGame).toEqual(
                expect.objectContaining({ ...anySaveGame, id: saveGame.id })
            )
        })
    })
    describe('Delete saveGame', () => {
        it('should return deleted saveGame id', async () => {
            const saveGame = await moduleController.addSaveGame('test_saveGame')
            expect(moduleController.removeSaveGame({ id: saveGame.id })).toBe(saveGame.id)
        })
    })
    describe('Save dummy game', () => {
        it('should return new save game object', async () => {
            const saveGame = await moduleController.addSaveGame('test_saveGame')
            const savedGame = await moduleController.saveGame(
                { saveGameId: saveGame.id },
                { test: 'dummyGame' }
            )
            expect(savedGame).toEqual(expect.objectContaining(anySaveGame))
        })
    })
    describe('Update dummy save game', () => {
        it('should return updated save game object', async () => {
            const saveGame = await moduleController.addSaveGame('test_saveGame')
            const savedGame = await moduleController.saveGame(
                { saveGameId: saveGame.id },
                { test: 'dummyGame' }
            )
            const newSaveGameData = { test: 'dummyGameUpdated' }
            const updatedSaveGame = await moduleController.updateSaveGame(
                { saveGameId: saveGame.id },
                { ...savedGame, game: newSaveGameData }
            )
            expect(updatedSaveGame).toEqual(
                expect.objectContaining({ game: newSaveGameData })
            )
        })
    })
})
