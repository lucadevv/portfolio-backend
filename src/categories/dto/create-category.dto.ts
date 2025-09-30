import { IsHexColor, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;
    @IsOptional()
    @IsString()
    description: string;
    @IsOptional()
    @IsString()
    icon: string;
    @IsOptional()
    @IsHexColor()
    color?: string;
}
