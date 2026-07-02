import { storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export class StorageService {
  static async uploadFile(fileBuffer: Buffer, mimetype: string, folder: string): Promise<string> {
    const bucket = storage.bucket();
    const extension = mimetype.split('/')[1];
    const filename = `${folder}/${uuidv4()}.${extension}`;
    const file = bucket.file(filename);

    await file.save(fileBuffer, {
      metadata: { contentType: mimetype },
      public: true, // Requires bucket to be public, or use signed URLs
    });

    // Make the file publicly accessible
    await file.makePublic();

    // Return the public download URL
    return `https://storage.googleapis.com/${bucket.name}/${filename}`;
  }

  static async uploadImage(fileBuffer: Buffer, mimetype: string): Promise<string> {
    return this.uploadFile(fileBuffer, mimetype, 'images');
  }

  static async uploadVoice(fileBuffer: Buffer, mimetype: string): Promise<string> {
    return this.uploadFile(fileBuffer, mimetype, 'voices');
  }
}
