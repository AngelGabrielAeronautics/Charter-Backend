import { IsNotEmpty, IsString } from "class-validator";
import { ESectionVettingStatus } from "../operator.model";

export class VetOperatorDto {
  @IsString()
  @IsNotEmpty()
  profileSection: string;

  @IsString()
  @IsNotEmpty()
  vettingAction: ESectionVettingStatus;

  @IsString()
  @IsNotEmpty()
  vettedByUserId: string;
}
