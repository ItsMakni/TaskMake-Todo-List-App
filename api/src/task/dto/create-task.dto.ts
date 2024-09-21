import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/auth/schema/user.schema";


export class CreateTaskDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    readonly duedate: Date;

    readonly completed: boolean;

    @IsEmpty()
    readonly user: User;
}