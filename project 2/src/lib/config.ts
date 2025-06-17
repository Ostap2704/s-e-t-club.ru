// Application configuration
export const config = {
  domain: import.meta.env.VITE_DOMAIN || 'https://s-e-t-club.ru',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key',
  },
  app: {
    name: 'Social Elite Tennis',
    description: 'Ведущая любительская теннисная лига',
    version: '1.0.9',
    buildTime: new Date().toISOString(),
    hosting: 'netlify',
    domain: 's-e-t-club.ru'
  }
};

// Enhanced validation and fallback for production
if (config.isProduction) {
  console.log('🔍 Production Environment Check:');
  console.log('Domain:', config.domain);
  console.log('Supabase URL:', config.supabase.url ? 'Set' : 'Missing');
  console.log('Supabase Key:', config.supabase.anonKey ? 'Set' : 'Missing');
  
  if (!config.supabase.url || config.supabase.url === 'https://demo.supabase.co') {
    console.warn('🔄 Using demo Supabase configuration...');
  } else {
    console.log('✅ Supabase environment variables configured');
  }
} else {
  // Development validation
  if (!config.supabase.url || config.supabase.url === 'https://demo.supabase.co') {
    console.warn('Using demo Supabase configuration in development');
  }
}