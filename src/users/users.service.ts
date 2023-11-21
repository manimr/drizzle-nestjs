import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from 'src/utils/constants';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';
import { NewUser, User } from '../database/schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private connection: NodePgDatabase<typeof schema>,
  ) {}

  async create(userData: NewUser): Promise<Pick<User, 'id'>[]> {
    return await this.connection
      .insert(schema.users)
      .values(userData)
      .returning({ id: schema.users.id });
  }

  async findAll(): Promise<User[]> {
    return await this.connection.select().from(schema.users);
  }

  async findOne(id: string): Promise<User> {
    return await this.connection.query.users.findFirst({
      where: eq(schema.users.id, id),
    });
  }

  async update(id: string, userData: Partial<User>) {
    return await this.connection
      .update(schema.users)
      .set(userData)
      .where(eq(schema.users.id, id))
      .returning({ id: schema.users.id });
  }

  async remove(id: string) {
    return this.connection.delete(schema.users).where(eq(schema.users.id, id));
  }
}
