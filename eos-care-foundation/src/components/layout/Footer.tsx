import { Link } from 'react-router-dom';

const footerLinks = {
  navigation: [
    { to: '/', label: 'Beranda' },
    { to: '/about', label: 'Tentang Kami' },
    { to: '/berita', label: 'Berita' },
    { to: '/kegiatan', label: 'Kegiatan' },
  ],
  program: [
    { to: '/donasi', label: 'Program Donasi' },
    { to: '/kegiatan', label: 'Kegiatan Sosial' },
  ],
};

const socialLinks = [
  { 
    name: 'Instagram', 
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
      </svg>
    )
  },
  { 
    name: 'Facebook', 
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  { 
    name: 'YouTube', 
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  { 
    name: 'WhatsApp', 
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    )
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto">
      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gradient-iris to-transparent" />
      
      {/* Main footer */}
      <div className="bg-white/80 backdrop-blur-xl dark:bg-ink/90">
        <div className="container-wide py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand section - larger, more prominent */}
            <div className="lg:col-span-5">
              {/* Logo */}
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-soft group-hover:shadow-medium transition-shadow">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-display font-bold text-text-primary">EOS Care</span>
                  <span className="block text-xs font-medium text-text-muted uppercase tracking-wider">Foundation</span>
                </div>
              </Link>
              
              {/* Tagline */}
              <p className="mt-6 text-text-secondary leading-relaxed max-w-sm">
                Bersama membangun harapan dan berbagi kasih untuk sesama yang membutuhkan di seluruh Indonesia.
              </p>
              
              {/* Social links */}
              <div className="mt-8">
                <p className="text-sm font-medium text-text-primary mb-4">Ikuti Kami</p>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all duration-200 hover:scale-105 dark:bg-white/10 dark:hover:bg-primary"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Links sections */}
            <div className="lg:col-span-3">
              <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-6">
                Navigasi
              </h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className="group inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-text-muted group-hover:bg-primary group-hover:scale-150 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              {/* Contact info */}
              <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-6">
                Hubungi Kami
              </h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="mailto:info@eoscarefoundation.com" 
                    className="group flex items-start gap-3 text-text-secondary hover:text-primary transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors dark:bg-white/10 dark:group-hover:bg-white/20">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs text-text-muted block">Email</span>
                      <span className="text-sm">info@eoscarefoundation.com</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+62xxxxxxxxxx" 
                    className="group flex items-start gap-3 text-text-secondary hover:text-primary transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors dark:bg-white/10 dark:group-hover:bg-white/20">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs text-text-muted block">Telepon</span>
                      <span className="text-sm">+62 xxx xxxx xxxx</span>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-text-secondary">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 dark:bg-white/10">
                      <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs text-text-muted block">Alamat</span>
                      <span className="text-sm">Jakarta, Indonesia</span>
                    </div>
                  </div>
                </li>
              </ul>
              
              {/* CTA */}
              <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-cta/10 to-cta/5 border border-cta/20">
                <p className="text-sm font-medium text-text-primary mb-3">Mulai berbagi kebaikan</p>
                <Link 
                  to="/donasi" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cta text-white text-sm font-medium rounded-xl hover:bg-cta-hover transition-colors"
                >
                  Donasi Sekarang
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200/80 dark:border-white/10">
          <div className="container-wide py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-text-muted text-center sm:text-left">
                &copy; {currentYear} EOS Care Foundation. Hak cipta dilindungi.
              </p>
              <div className="flex items-center gap-6 text-sm text-text-muted">
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Kebijakan Privasi
                </Link>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Syarat & Ketentuan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
