import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../users/user.entity';

@Schema({ collection: 'task-test' })
export class Task extends Document {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    enum: ['pending', 'started', 'completed', 'cancelled'],
    default: 'pending',
    required: true,
  })
  status: string;

  @Prop({ type: Date, required: true })
  dueDate: Date;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    ref: User.name,
  })
  user: MongooseSchema.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
