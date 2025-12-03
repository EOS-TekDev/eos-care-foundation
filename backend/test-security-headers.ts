/**
 * Security Headers Verification Script
 * Tests that all required security headers are present in responses
 * 
 * Usage: npx ts-node test-security-headers.ts
 * 
 * @see Story EPIC-1-S3 - Configure Security Headers
 */

import http from 'http';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

interface HeaderCheck {
  name: string;
  expectedValue?: string | RegExp;
  required: boolean;
}

const securityHeaders: HeaderCheck[] = [
  // AC1: Helmet Integration - all recommended security headers
  { name: 'content-security-policy', required: true },
  { name: 'strict-transport-security', required: true, expectedValue: /max-age=31536000/i },
  
  // AC4: Additional Headers
  { name: 'x-content-type-options', required: true, expectedValue: 'nosniff' },
  { name: 'x-frame-options', required: true, expectedValue: 'DENY' },
  { name: 'x-xss-protection', required: true },
  
  // Additional helmet headers
  { name: 'referrer-policy', required: true },
  { name: 'x-dns-prefetch-control', required: true },
  { name: 'x-download-options', required: true },
  { name: 'x-permitted-cross-domain-policies', required: true },
  { name: 'origin-agent-cluster', required: true },
  { name: 'cross-origin-opener-policy', required: true },
  { name: 'cross-origin-resource-policy', required: true },
  
  // Should NOT be present (hidden by helmet)
  { name: 'x-powered-by', required: false },
];

async function checkHeaders(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    
    const req = http.request({
      hostname: urlObj.hostname,
      port: urlObj.port || 80,
      path: urlObj.pathname,
      method: 'GET',
    }, (res) => {
      console.log(`\n📋 Security Headers Check for: ${url}`);
      console.log(`Status: ${res.statusCode}`);
      console.log('─'.repeat(60));
      
      let passed = 0;
      let failed = 0;
      
      for (const header of securityHeaders) {
        const value = res.headers[header.name];
        
        if (header.name === 'x-powered-by') {
          // This header should NOT be present
          if (value) {
            console.log(`❌ ${header.name}: PRESENT (should be hidden)`);
            failed++;
          } else {
            console.log(`✅ ${header.name}: Hidden (as expected)`);
            passed++;
          }
          continue;
        }
        
        if (!value) {
          if (header.required) {
            console.log(`❌ ${header.name}: MISSING`);
            failed++;
          } else {
            console.log(`⚠️  ${header.name}: Not present (optional)`);
          }
          continue;
        }
        
        if (header.expectedValue) {
          const matches = header.expectedValue instanceof RegExp
            ? header.expectedValue.test(value as string)
            : value === header.expectedValue;
          
          if (matches) {
            console.log(`✅ ${header.name}: ${value}`);
            passed++;
          } else {
            console.log(`❌ ${header.name}: ${value} (expected: ${header.expectedValue})`);
            failed++;
          }
        } else {
          console.log(`✅ ${header.name}: ${value}`);
          passed++;
        }
      }
      
      console.log('─'.repeat(60));
      console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
      
      if (failed > 0) {
        console.log('\n⚠️  Some security headers are missing or incorrect!');
        reject(new Error(`${failed} security header(s) failed`));
      } else {
        console.log('\n✅ All security headers are correctly configured!');
        resolve();
      }
    });
    
    req.on('error', (err) => {
      console.error(`\n❌ Connection error: ${err.message}`);
      console.log('\nMake sure the server is running on', BASE_URL);
      reject(err);
    });
    
    req.end();
  });
}

async function main() {
  console.log('🔒 Security Headers Verification');
  console.log('='.repeat(60));
  
  const endpoints = [
    '/health',
    '/api/public/berita',
  ];
  
  for (const endpoint of endpoints) {
    try {
      await checkHeaders(`${BASE_URL}${endpoint}`);
    } catch (error) {
      console.error(`\nFailed to verify ${endpoint}:`, error);
    }
  }
}

main().catch(console.error);
