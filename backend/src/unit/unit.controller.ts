import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.create(createUnitDto);
  }

  @Get()
  findAll(@Query('compartment_id') compartment_id?: number) {
    if (compartment_id) {
      return this.unitService.findAllProductInfoByCompartmentId(compartment_id);
    } else {
      return this.unitService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitService.update(+id, updateUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitService.remove(+id);
  }
}
