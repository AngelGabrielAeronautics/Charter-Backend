import { PartialType } from "@nestjs/mapped-types";
import { CreateBookingDto } from "./createBooking.dto";

export class UpdateBookingDto extends PartialType(CreateBookingDto){};