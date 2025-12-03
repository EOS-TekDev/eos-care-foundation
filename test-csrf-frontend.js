const axios = require('axios');

// Simulate frontend cookie jar
const cookies = new Map();

function parseCookies(setCookieHeader) {
  if (!setCookieHeader) return;
  
  setCookieHeader.forEach(cookieStr => {
    const parts = cookieStr.split(';')[0].split('=');
    if (parts.length === 2) {
      cookies.set(parts[0].trim(), parts[1].trim());
    }
  });
}

function getCookieString() {
  return Array.from(cookies.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
}

// Test CSRF functionality with frontend simulation
async function testCSRFWithFrontend() {
  const baseURL = 'http://localhost:3000';
  
  try {
    console.log('🧪 Testing CSRF Protection with Frontend Simulation...\n');
    
    // 1. Initial page load - gets CSRF token
    console.log('1. Simulating initial page load...');
    const response = await axios.get(`${baseURL}/api/public/berita`, {
      withCredentials: true
    });
    
    parseCookies(response.headers['set-cookie']);
    console.log(`📝 Received cookies: ${getCookieString()}`);

    // 2. Simulate frontend getting CSRF token from cookies
    const csrfToken = cookies.get('csrfToken');
    if (!csrfToken) {
      console.log('❌ No CSRF token found');
      return;
    }
    console.log(`✅ CSRF token extracted: ${csrfToken.substring(0, 20)}...`);

    // 3. Test SameSite=Strict by trying cross-origin simulation
    console.log('\n2. Testing CSRF validation workflow...');
    
    try {
      // This should fail with 401 (not authenticated) but not 403 (CSRF)
      const response = await axios.post(`${baseURL}/api/admin/berita`, {
        title: 'test',
        content: 'test'
      }, {
        headers: {
          'Cookie': getCookieString(),
          'X-CSRF-Token': csrfToken
        }
      });
      
      console.log('❌ Should have required authentication');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ CSRF validation succeeded (passed through to auth)');
      } else if (error.response?.status === 403) {
        console.log('❌ CSRF validation failed');
      } else {
        console.log(`⚠️  Unexpected status: ${error.response?.status}`);
      }
    }

    // 4. Test without CSRF token
    console.log('\n3. Testing without CSRF token...');
    try {
      await axios.post(`${baseURL}/api/admin/berita`, {
        title: 'test',
        content: 'test'
      }, {
        headers: {
          'Cookie': getCookieString()
        }
      });
      console.log('❌ Should have failed CSRF validation');
    } catch (error) {
      if (error.response?.status === 403) {
        console.log('✅ CSRF validation blocked request');
      } else if (error.response?.status === 401) {
        console.log('⚠️  Got 401 - should be 403 for CSRF');
      } else {
        console.log(`❌ Unexpected status: ${error.response?.status}`);
      }
    }

    // 5. Test auth endpoints (should not require CSRF)
    console.log('\n4. Testing auth endpoints (CSRF exempt)...');
    try {
      await axios.post(`${baseURL}/api/auth/login`, {
        email: 'test@example.com',
        password: 'test'
      }, {
        headers: {
          'Cookie': getCookieString()
        }
      });
      console.log('❌ Should not login with bad credentials');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Auth endpoint working without CSRF token');
      } else {
        console.log(`❌ Unexpected status: ${error.response?.status}`);
      }
    }

    console.log('\n🎉 CSRF frontend simulation complete!');
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

testCSRFWithFrontend();
