import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TimeEntrySchema } from "src/schemas/timeEntry.schema";
import { TimeEntryController } from "./timeEntry.controller";
import { TimeEntryService } from "./timeEntry.service";


@Module({
    imports:[MongooseModule.forFeature([{name : 'TimeEntry', schema : TimeEntrySchema}])],
    controllers:[TimeEntryController],
    providers:[TimeEntryService]

})
export class TimeEntryModule{
    
}