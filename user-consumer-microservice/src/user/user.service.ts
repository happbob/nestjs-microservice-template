import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { makeResponse } from 'common/function.utils';
import { RESPONSE } from 'config/response.utils';
import { UserInfo } from 'src/entity/user-info.entity';
import { createQueryBuilder, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
  ) {}

  async retrieveUsers() {
    try {
      const users = await createQueryBuilder(UserInfo)
        .select(['id', 'email', 'nickname', 'status'])
        .where('status = :status', { status: 'ACTIVE' })
        .getRawMany();

      const data = {
        users: users,
      };
      const result = makeResponse(RESPONSE.SUCCESS, data);

      return result;
    } catch (error) {
      return RESPONSE.ERROR;
    }
  }
}
