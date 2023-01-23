import { Database } from './database.types';

// https://stackoverflow.com/questions/60269936/typescript-convert-generic-object-from-snake-to-camel-case
export type SnakeToCamelCase<S extends string> =
  S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamelCase<U>>}` : S

type Db = Database['public']['Tables'];

type ProfileRow = Db['profile']['Row'];

export type PartialProfile = {[K in keyof Partial<ProfileRow> as SnakeToCamelCase<K>]: Partial<ProfileRow>[K]}
export type Profile = {[K in keyof ProfileRow as SnakeToCamelCase<K>]: ProfileRow[K]}
export type CustomProfile = Pick<Profile, 'firstName' | 'lastName' | 'age'>;
