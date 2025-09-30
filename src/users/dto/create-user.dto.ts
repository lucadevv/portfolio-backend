import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "src/common/enums/role";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    userName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password:string

    @IsOptional()
    @IsEnum(Role)
    role: Role

}
