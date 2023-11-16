import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from 'src/utils/constants';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private connection: NodePgDatabase<typeof schema>,
  ) {}
  async findAll() {
    return await this.connection.select().from(schema.users);
  }

  async findOne(id: number) {
    return await this.connection
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
