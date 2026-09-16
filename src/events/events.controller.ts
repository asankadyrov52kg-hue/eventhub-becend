import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
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
    return this.eventsService.create(createEventDto, userId);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
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
