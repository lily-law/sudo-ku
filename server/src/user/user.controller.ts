import {
    Controller,
    Post,
    Body,
    Get,
    Patch,
    Delete,
    Param,
    Put
} from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.model'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    addUser(@Body('name') name: string): User {
        const newUser = this.userService.addUser(name)
        return newUser
    }
    @Get(':id')
    getUser(@Param() params): User {
        const user = this.userService.getUser(params.id)
        return user
    }
    @Patch(':id')
    updateUser(@Param() params, @Body('update') update): User {
        const updatedUser = this.userService.updateUser(params.id, update)
        return updatedUser
    }
    @Delete(':id')
    removeUser(@Param() params) {
        const removedUserId = this.userService.removeUser(params.id)
        return removedUserId
    }
    @Post(':userId/game')
    saveGame(@Param() params, @Body('game') game) {
        const savedGame = this.userService.addSaveGame(params.userId, game)
        return savedGame
    }
    @Put(':userId/game')
    updateSaveGame(@Param() params, @Body('saveGame') saveGame) {
        const updatedSaveGame = this.userService.updateSaveGame(params.userId, saveGame)
        return updatedSaveGame
    }
}
