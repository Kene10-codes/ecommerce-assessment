import { Module } from '@nestjs/common';
import { SeederService } from './service/seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/User.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [SeederService],
    controllers: []
})
export class SeederModule {
    constructor(private readonly seederService: SeederService) {}

  async onModuleInit() {
    // Call the run method on service to populate data
    await this.seederService.signup()
  }
}
