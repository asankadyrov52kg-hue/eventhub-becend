import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AccessTokenGuard } from 'src/auth/quard/acces-token.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(AccessTokenGuard) 
  create(@Body() createEventDto: CreateEventDto, @Req() req: any) {
    const userId = req.user.id; 
    console.log('=== ДЕБАГ КОНТРОЛЛЕРА ===');
  console.log('Юзер ID из гварда:', userId);
  console.log('Тело запроса (DTO):', createEventDto);
    return this.eventsService.create(createEventDto, userId);
  }

  @Get()
async findAll(@Query('categoryId') categoryId?: string) {
  return await this.eventsService.findAll(categoryId);
}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id); 
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard) 
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto); 
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard) 
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id); 
  }
}
