import { join } from 'path';
import { readFileSync } from 'fs';

function publicDirPath(): string{
    return join(__dirname, '..', '..' ,'public/');
}

export function getEmailTemplate(target: "client" | "operator" | "admin" | "agent", name: string): string{
    const publicDir = publicDirPath();
    return readFileSync(join(publicDir, `mail/${target}/${name}.handlebars`), "utf-8");   
}