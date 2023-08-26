import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
  controllers: [CreateAccountController],
  providers: [PrismaService],
  exports: []
})
export class AppModule {}
