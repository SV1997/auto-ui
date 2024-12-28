import { Request, Response, RequestHandler } from "express";
import { user,workshop,components, PrismaClient  } from '@prisma/client';
import * as fs from 'node:fs/promises'
import fs1 from "fs"
import path from "node:path";
import { log } from "node:console";
import fileStrings from "../../components.json";
import archiver from "archiver";
const prisma= new PrismaClient();
interface jsonStruct{
    [name: string]: string
}
declare module 'express-session' {
    interface SessionData {
      userId: Number;
    }
  }
  
const fileDownload: RequestHandler = async (req: Request, res: Response) => {
    try {
        const workspaceId= req.body.workspaceId;
        const fileContent= req.body.code;
        const response= await prisma.workshop.findFirst({
            where: {
                id: workspaceId
            },
            include: {
                component: true
            }
        })
        console.log(req.session);
        
        const files:jsonStruct= fileStrings;
        console.log(response, "response to string");
        const fileName= response?.component.map((component: components)=> component.name);
        const folderName= "generatedFiles";
        const rootPath:string= path.join(__dirname, '../..');
        const folderPath: string= path.join(rootPath, folderName);
        await fs.mkdir(folderPath, {recursive: true});
        const appFilePath= path.join(folderPath, 'app.tsx');
        await fs.writeFile(appFilePath, fileContent);
        await fs.mkdir(path.join(folderPath, 'components'), {recursive: true});
        const componentFolderPath= path.join(folderPath, 'components');
        const zipFolderPath= path.join(rootPath,"zipFolder",`zipFile${req.session.userId}.zip`);

        if(fileName)
        {
            for (const name of fileName){
                console.log(name, "name");
                
            await fs.writeFile(path.join(componentFolderPath, `${name}.tsx`), files[name]);
        }
    }
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=zipFile${req.session.userId}.zip`);
    
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    // Error handling
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('Archiver warning:', err);
      } else {
        throw err;
      }
    });
    archive.on('error', (err) => {
      console.error('Archiver error:', err);
      res.status(500).send({ message: 'Error creating ZIP file' });
    });
    
    // Pipe directly to HTTP response (no file on disk)
    archive.pipe(res);
    
    // Add folder
    archive.directory(folderPath, false);
    
    // Finalize
    await archive.finalize();
    } catch (error) {
        throw error
    }
}

const file={fileDownload};

export default file;