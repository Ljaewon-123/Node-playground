import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mongoose, { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop([String])
  name: string;

  @Prop([Number])
  age: number;

  @Prop([String])
  breed: string;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
  // owners: Owner[];
}

export const CatSchema = SchemaFactory.createForClass(Cat);