import { users } from '@prisma/client';
import { File as MulterFile } from 'multer';

declare global {
  namespace Express {
    interface Request {
      user?: users; // ขยาย Request ให้มีข้อมูลผู้ใช้
      files?: MulterFile[]; // ขยาย Request ให้รองรับ Multer Files
    }
  }
}
