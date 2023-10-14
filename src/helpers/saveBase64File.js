import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

export const saveBase64File = async (base64Data, fileName) => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const rootDir = global.__rootdir;

    const fileBuffer = Buffer.from(base64Data, 'base64');
    console.log(fileBuffer);
    
    const writeFileAsync = promisify(fs.writeFile);
    const filePath = path.join(rootDir, 'uploads', fileName);

    try {
        await writeFileAsync(filePath, fileBuffer);
        return filePath;
    } catch (error) {
        throw error;
    }
}