import { sql } from 'drizzle-orm';
import {
  bigint,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const advocates = pgTable(
  'advocates',
  {
    id: serial('id').primaryKey(),
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    city: text('city').notNull(),
    degree: text('degree').notNull(),
    specialties: jsonb('payload').default([]).notNull(),
    yearsOfExperience: integer('years_of_experience').notNull(),
    phoneNumber: bigint('phone_number', { mode: 'number' }).notNull(),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    cityIdx: index('city_idx').on(table.city),
    nameIdx: index('name_idx').on(table.firstName, table.lastName),
    specialtiesIdx: index('specialties_gin_idx').using(
      'gin',
      table.specialties,
    ),
  }),
);
