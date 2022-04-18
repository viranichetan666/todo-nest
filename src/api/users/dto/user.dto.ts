import { IsAlphanumeric, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  readonly password: string;
}
