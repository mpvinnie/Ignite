import { Encrypter } from '@/domain/forum/application/cryptography/encrypter'
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'
import { BCryptHasher } from './bcrypt-hasher'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter
    },
    {
      provide: HashGenerator,
      useClass: BCryptHasher
    },
    {
      provide: HashComparer,
      useClass: BCryptHasher
    }
  ],
  exports: [Encrypter, HashComparer, HashGenerator]
})
export class CryptographyModule {}
