import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'

describe('UserController', () => {
    let moduleController: UserController
    const anyUUID = expect.stringMatching(
        /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
    )
    const anyUser = {
        name: expect.any(String),
        id: anyUUID
    }
    const nonExistantUser = {
        id: '12345678-1234-1234-123456789abc'
    }
    const anySaveGame = {
        id: anyUUID
    }

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService]
        }).compile()

        moduleController = moduleRef.get<UserController>(UserController)
    })

    describe('Add user', () => {
        it('should return newly registered user object', async () => {
            const user = await moduleController.addUser('test_user')
            expect(user).toEqual(expect.objectContaining(anyUser))
        })
    })
    describe('Get user', () => {
        it('should return user object', async () => {
            const user = await moduleController.addUser('test_user')
            expect(moduleController.getUser({ id: user.id })).toEqual(user)
        })
    })
    describe('Get non existant user', () => {
        it('should return undefined', async () => {
            expect(
                moduleController.getUser({ id: nonExistantUser.id })
            ).toEqual(undefined)
        })
    })
    describe('Update user name', () => {
        it('should return updated user object', async () => {
            const user = await moduleController.addUser('test_user')
            const updateUser = await moduleController.updateUser(
                { id: user.id },
                { name: 'test_user-updated' }
            )
            expect(updateUser).toEqual(
                expect.objectContaining({
                    ...anyUser,
                    name: 'test_user-updated'
                })
            )
        })
    })
    describe('Update non existant user name', () => {
        it('should throw exception', async () => {
            expect(() =>
                moduleController.updateUser(
                    { id: nonExistantUser.id },
                    { name: 'test_user-updated' }
                )
            ).toThrow()
        })
    })
    describe('Update user id', () => {
        it('should not change id and return unchanged user object', async () => {
            const user = await moduleController.addUser('test_user')
            const updateUser = await moduleController.updateUser(
                { id: user.id },
                { id: 'test_user-updated' }
            )
            expect(updateUser).toEqual(
                expect.objectContaining({ ...anyUser, id: user.id })
            )
        })
    })
    describe('Delete user', () => {
        it('should return deleted user id', async () => {
            const user = await moduleController.addUser('test_user')
            expect(moduleController.removeUser({ id: user.id })).toBe(user.id)
        })
    })
    describe('Save dummy game', () => {
        it('should return new save game object', async () => {
            const user = await moduleController.addUser('test_user')
            const savedGame = await moduleController.saveGame(
                { userId: user.id },
                { test: 'dummyGame' }
            )
            expect(savedGame).toEqual(expect.objectContaining(anySaveGame))
        })
    })
    describe('Update dummy save game', () => {
        it('should return updated save game object', async () => {
            const user = await moduleController.addUser('test_user')
            const savedGame = await moduleController.saveGame(
                { userId: user.id },
                { test: 'dummyGame' }
            )
            const newSaveGameData = { test: 'dummyGameUpdated' }
            const updatedSaveGame = await moduleController.updateSaveGame(
                { userId: user.id },
                { ...savedGame, game: newSaveGameData }
            )
            expect(updatedSaveGame).toEqual(
                expect.objectContaining({ game: newSaveGameData })
            )
        })
    })
})
