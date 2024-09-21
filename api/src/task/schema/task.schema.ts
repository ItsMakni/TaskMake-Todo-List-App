import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Schema({
    timestamps: true,
})
export class Task {
    @Prop()
    title: string;

    @Prop()
    duedate: Date;

    @Prop()
    completed: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
