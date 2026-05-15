const fs = require('fs');
const path = require('path');

const tsconfigPath = path.join(__dirname, 'node_modules', 'xlsx', 'types', 'tsconfig.json');

try {
  if (fs.existsSync(tsconfigPath)) {
    let content = fs.readFileSync(tsconfigPath, 'utf8');
    
    // Check if ignoreDeprecations is already present
    if (!content.includes('"ignoreDeprecations"')) {
      // Add ignoreDeprecations to compilerOptions with proper indentation
      content = content.replace(
        '"compilerOptions": {',
        '"compilerOptions": {\n        "ignoreDeprecations": "5.0",'
      );
      
      fs.writeFileSync(tsconfigPath, content, 'utf8');
      console.log('✓ Fixed xlsx tsconfig.json: added ignoreDeprecations');
    } else {
      console.log('✓ xlsx tsconfig.json already has ignoreDeprecations');
    }
  }
} catch (error) {
  console.warn('⚠ Could not fix xlsx tsconfig.json:', error.message);
}
