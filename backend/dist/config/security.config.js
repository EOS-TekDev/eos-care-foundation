"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectedSecurityHeaders = exports.securityConfig = void 0;
/**
 * Security headers configuration using helmet
 * @see Architecture Section 6.4 - Security Controls
 * @see Story EPIC-1-S3 - Configure Security Headers
 */
/**
 * Content Security Policy directives
 * Defines which sources are allowed for different resource types
 */
const contentSecurityPolicy = {
    directives: {
        // Default fallback for all resource types
        defaultSrc: ["'self'"],
        // Scripts: only from same origin
        scriptSrc: ["'self'"],
        // Styles: same origin + inline styles (needed for some UI frameworks)
        styleSrc: ["'self'", "'unsafe-inline'"],
        // Images: same origin, data URIs, and HTTPS sources
        imgSrc: ["'self'", 'data:', 'https:'],
        // Fonts: same origin and data URIs
        fontSrc: ["'self'", 'data:'],
        // Connections: same origin + frontend URL for CORS
        connectSrc: ["'self'", process.env.FRONTEND_URL || 'http://localhost:5173'],
        // Object tags (Flash, etc): none allowed
        objectSrc: ["'none'"],
        // Media (audio/video): same origin
        mediaSrc: ["'self'"],
        // Frames: deny embedding by default
        frameSrc: ["'none'"],
        // Base URI: same origin only
        baseUri: ["'self'"],
        // Form targets: same origin only
        formAction: ["'self'"],
        // Frame ancestors: prevent clickjacking (also covered by X-Frame-Options)
        frameAncestors: ["'none'"],
        // Upgrade insecure requests in production
        upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
    },
};
/**
 * HTTP Strict Transport Security (HSTS) configuration
 * Forces HTTPS for all future visits to this domain
 */
const hsts = {
    // 1 year in seconds
    maxAge: 31536000,
    // Apply to all subdomains
    includeSubDomains: true,
    // Allow preloading in browser HSTS lists
    preload: true,
};
/**
 * Complete helmet configuration object
 * Configures all security headers for the application
 */
exports.securityConfig = {
    // Content Security Policy - controls allowed resource sources
    contentSecurityPolicy,
    // HSTS - enforces HTTPS
    hsts,
    // X-Content-Type-Options: nosniff - prevents MIME type sniffing
    noSniff: true,
    // X-Frame-Options: DENY - prevents clickjacking
    frameguard: {
        action: 'deny',
    },
    // X-XSS-Protection: 1; mode=block - legacy XSS protection
    // Note: Modern browsers use CSP instead, but this helps older browsers
    xssFilter: true,
    // Referrer-Policy - controls referrer information sent with requests
    referrerPolicy: {
        policy: 'strict-origin-when-cross-origin',
    },
    // X-DNS-Prefetch-Control - controls DNS prefetching
    dnsPrefetchControl: {
        allow: false,
    },
    // X-Download-Options: noopen - prevents IE from executing downloads
    ieNoOpen: true,
    // X-Permitted-Cross-Domain-Policies - controls Adobe cross-domain policies
    permittedCrossDomainPolicies: {
        permittedPolicies: 'none',
    },
    // Hide X-Powered-By header to obscure the technology stack
    hidePoweredBy: true,
    // Origin-Agent-Cluster header for process isolation
    originAgentCluster: true,
    // Cross-Origin-Embedder-Policy - controls resource loading
    crossOriginEmbedderPolicy: false, // Disabled to allow loading external images
    // Cross-Origin-Opener-Policy - controls window references
    crossOriginOpenerPolicy: {
        policy: 'same-origin',
    },
    // Cross-Origin-Resource-Policy - controls resource sharing
    // Set to 'cross-origin' to allow frontend (different port) to load images/uploads
    crossOriginResourcePolicy: {
        policy: 'cross-origin',
    },
};
/**
 * List of expected security headers for verification
 */
exports.expectedSecurityHeaders = [
    'Content-Security-Policy',
    'Strict-Transport-Security',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Referrer-Policy',
    'X-DNS-Prefetch-Control',
    'X-Download-Options',
    'X-Permitted-Cross-Domain-Policies',
    'Origin-Agent-Cluster',
    'Cross-Origin-Opener-Policy',
    'Cross-Origin-Resource-Policy',
];
//# sourceMappingURL=security.config.js.map