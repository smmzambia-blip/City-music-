const fs = require('fs');
const path = require('path');

function replaceColor(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== '.next') {
                replaceColor(fullPath);
            }
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('[#00FF00]')) {
                content = content.replace(/\[#00FF00\]/g, '[var(--color-primary)]');
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}
replaceColor('./');
