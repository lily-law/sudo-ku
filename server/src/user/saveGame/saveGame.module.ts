import { Module } from '@nestjs/common'
import { UserController } from './saveGame.controller'
import { UserService } from './saveGame.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemas/saveGame.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
