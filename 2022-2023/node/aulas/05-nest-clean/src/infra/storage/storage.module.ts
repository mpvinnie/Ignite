import { Uploader } from '@/domain/forum/application/storage/uploader'
import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { DiskStorage } from './disk-storage'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Uploader,
      useClass: DiskStorage
    }
  ],
  exports: [Uploader]
})
export class StorageModule {}
