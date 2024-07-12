import { randomUUID } from 'crypto';
import { text } from 'drizzle-orm/sqlite-core';

export const idField = () =>
  text('id')
    .primaryKey()
    .$default(() => randomUUID());

export const dateField = (fieldName: string) => text(fieldName).$type<Date>();

export const dateRequiredField = (fieldName: string) =>
  dateField(fieldName).notNull();

export const dateWithDefaultField = (fieldName: string) =>
  dateField(fieldName).$default(() => new Date());

export const updateAtField = () =>
  dateField('updated_at').$onUpdate(() => new Date());

export const booleanField = (fieldName: string) =>
  text(fieldName)
    .$type<boolean>()
    .$default(() => false);

export const booleanDefTrueField = (fieldName: string) =>
  text(fieldName)
    .$type<boolean>()
    .$default(() => true);
