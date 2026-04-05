// Simple script to check bundle sizes
const fs = require('fs');
const path = require('path');

// Check if .next directory exists
const nextDir = path.join(process.cwd(), '.next');

if (fs.existsSync(nextDir)) {
    console.log('Checking bundle sizes...\n');

    // Function to get file size
    function getFileSize(filePath) {
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            return (stats.size / 1024 / 1024).toFixed(2) + ' MB';
        }
        return 'Not found';
    }

    // Check main chunks
    const staticDir = path.join(nextDir, 'static', 'chunks');
    if (fs.existsSync(staticDir)) {
        const files = fs.readdirSync(staticDir);
        const jsFiles = files.filter(f => f.endsWith('.js'));

        console.log('JavaScript bundles:');
        jsFiles.forEach(file => {
            const size = getFileSize(path.join(staticDir, file));
            console.log(`  ${file}: ${size}`);
        });

        // Calculate total
        const totalSize = jsFiles.reduce((acc, file) => {
            const filePath = path.join(staticDir, file);
            if (fs.existsSync(filePath)) {
                return acc + fs.statSync(filePath).size;
            }
            return acc;
        }, 0);

        console.log(`\nTotal JS bundle size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);

        // Check if we're under target
        if (totalSize / 1024 / 1024 < 0.2) {
            console.log('✅ Bundle size is under 200KB target!');
        } else {
            console.log('❌ Bundle size exceeds 200KB target');
        }
    }
} else {
    console.log('No build found. Run "npm run build" first.');
}