import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ObjectIdPipe implements PipeTransform<string, ObjectId> {
  transform(value: string, metadata): ObjectId {
    try {
      return new ObjectId(value);
    } catch (error) {
      throw new BadRequestException(`${metadata.data} contains invalid ObjectId`);
    }
  }
}
