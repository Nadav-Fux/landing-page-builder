import { chromium } from 'playwright';

interface Issue {
  type: string;
  page?: string;
  message: string;
}

async function checkSite(): Promise<{ issues: Issue[]; consoleErrors: string[] }> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const issues: Issue[] = [];
  const consoleErrors: string[] = [];
  
  // Collect console messages
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`ERROR: ${msg.text()}`);
    }
  });
  
  // Collect page errors
  page.on('pageerror', err => {
    issues.push({ type: 'PAGE_ERROR', message: err.message });
  });
  
  const pagesToCheck = [
    { url: 'http://localhost:3000', name: 'Home Page' },
    { url: 'http://localhost:3000/login', name: 'Login Page' },
    { url: 'http://localhost:3000/templates', name: 'Templates Page' },
    { url: 'http://localhost:3000/dashboard', name: 'Dashboard (auth required)' },
  ];
  
  for (const pageInfo of pagesToCheck) {
    console.log(`\n📄 Checking: ${pageInfo.name}`);
    console.log(`   URL: ${pageInfo.url}`);
    
    try {
      await page.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 30000 });
      console.log(`   ✅ Page loaded successfully`);
      
      // Check for accessibility issues
      const title = await page.title();
      console.log(`   📝 Title: ${title}`);
      
      // Check for obvious UI issues
      const headings = await page.$$('h1, h2, h3');
      console.log(`   📊 Found ${headings.length} heading elements`);
      
      // Check for images without alt
      const images = await page.$$('img');
      let imagesWithoutAlt = 0;
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        if (!alt) imagesWithoutAlt++;
      }
      if (imagesWithoutAlt > 0) {
        console.log(`   ⚠️ ${imagesWithoutAlt} images without alt text`);
      }
      
      // Check for forms
      const forms = await page.$$('form');
      console.log(`   📝 Found ${forms.length} form elements`);
      
    } catch (err: any) {
      console.log(`   ❌ Error: ${err.message}`);
      issues.push({ type: 'NAVIGATION_ERROR', page: pageInfo.name, message: err.message });
    }
  }
  
  // Report console errors
  if (consoleErrors.length > 0) {
    console.log(`\n🚨 Console Errors (${consoleErrors.length}):`);
    consoleErrors.forEach(msg => console.log(`   - ${msg}`));
  }
  
  // Report page errors
  if (issues.length > 0) {
    console.log(`\n🚨 Page Errors (${issues.length}):`);
    issues.forEach(issue => console.log(`   - [${issue.type}] ${issue.message}`));
  }
  
  await browser.close();
  
  console.log('\n✅ Site check completed!');
  return { issues, consoleErrors };
}

checkSite().catch(console.error);
