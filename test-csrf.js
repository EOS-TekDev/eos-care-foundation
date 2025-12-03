const axios = require('axios');

// Test CSRF functionality
async function testCSRF() {
  const baseURL = 'http://localhost:3000';
  
  try {
    console.log('🧪 Testing CSRF Protection...\n');
    
    // 1. Test CSRF token generation
    console.log('1. Testing CSRF token generation...');
    const getResponse = await axios.get(`${baseURL}/api/public/berita`, {
      withCredentials: true
    });
    
    const cookies = getResponse.headers['set-cookie'] || [];
    const csrfCookie = cookies.find(cookie => cookie.startsWith('csrfToken='));
    
    if (csrfCookie) {
      console.log('✅ CSRF token generated in cookie');
    } else {
      console.log('❌ No CSRF token found in cookies');
      return;
    }

    // Extract CSRF token value
    const csrfToken = csrfCookie.split('csrfToken=')[1].split(';')[0];
    console.log(`📝 CSRF Token: ${csrfToken.substring(0, 20)}...`);

    // 2. Test auth endpoint without CSRF (should work)
    console.log('\n2. Testing auth endpoint without CSRF (should work)...');
    try {
      await axios.post(`${baseURL}/api/auth/login`, {
        email: 'test@example.com',
        password: 'test'
      }, { withCredentials: true });
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Auth endpoint works (401 for invalid creds is expected)');
      }
    }

    // 3. Test protected endpoint without CSRF (should fail with 403 if authenticated, 401 if not)
    console.log('\n3. Testing protected endpoint without CSRF (should fail)...');
    try {
      await axios.post(`${baseURL}/api/admin/berita`, {
        title: 'test',
        content: 'test'
      }, { withCredentials: true });
      console.log('❌ Request should have failed without CSRF token');
    } catch (error) {
      if (error.response?.status === 403) {
        console.log('✅ CSRF protection working: 403 Forbidden');
      } else if (error.response?.status === 401) {
        console.log('⚠️  Got 401 (not authenticated), but CSRF middleware is running');
      } else {
        console.log(`❌ Unexpected status: ${error.response?.status}`);
      }
    }

    // 4. Test protected endpoint with CSRF token (should fail with 401 if not authenticated)
    console.log('\n4. Testing protected endpoint with CSRF token...');
    try {
      await axios.post(`${baseURL}/api/admin/berita`, {
        title: 'test',
        content: 'test'
      }, {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
      console.log('❌ Request should have required authentication');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ CSRF validation passed, getting expected 401 auth error');
      } else if (error.response?.status === 403) {
        console.log('❌ CSRF validation failed even with token');
      } else {
        console.log(`❌ Unexpected status: ${error.response?.status}`);
      }
    }

    console.log('\n🎉 CSRF testing complete!');
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

testCSRF();
