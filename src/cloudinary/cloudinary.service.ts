import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: any): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'events_images' }, 
        (error, result) => {
          if (error) return reject(error);
          resolve(result!);
        },
      );

      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null); 

      stream.pipe(uploadStream);
    });
  }
}
