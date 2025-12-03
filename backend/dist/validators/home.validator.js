"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHomeCtaSchema = exports.createHomeCtaSchema = exports.updateHomeServiceSchema = exports.createHomeServiceSchema = exports.updateHomeHeroSchema = exports.createHomeHeroSchema = void 0;
const zod_1 = require("zod");
const base_validator_1 = require("./base.validator");
// HomeHero schemas
exports.createHomeHeroSchema = zod_1.z.object({
    badge: zod_1.z.string().min(1).max(100),
    headline: zod_1.z.string().min(1).max(500),
    subheadline: zod_1.z.string().min(1).max(1000),
    ctaPrimary: zod_1.z.string().min(1).max(50),
    ctaSecondary: zod_1.z.string().min(1).max(50),
    cardTitle: zod_1.z.string().min(1).max(100),
    cardDesc: zod_1.z.string().min(1).max(500),
    cardBadge: zod_1.z.string().min(1).max(50),
    volunteerCount: zod_1.z.string().min(1).max(50),
    todayAmount: zod_1.z.string().min(1).max(50),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateHomeHeroSchema = (0, base_validator_1.makeUpdateSchema)(exports.createHomeHeroSchema);
// HomeService schemas
exports.createHomeServiceSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().min(1).max(1000),
    icon: zod_1.z.string().min(1).max(50),
    color: zod_1.z.string().min(1).max(100),
    stats: zod_1.z.string().max(50).optional(),
    statsLabel: zod_1.z.string().max(100).optional(),
    isFeatured: zod_1.z.boolean().optional(),
    order: zod_1.z.number().int().min(0).optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateHomeServiceSchema = (0, base_validator_1.makeUpdateSchema)(exports.createHomeServiceSchema);
// HomeCta schemas
exports.createHomeCtaSchema = zod_1.z.object({
    trustBadges: zod_1.z.string().min(1), // JSON string array
    headline: zod_1.z.string().min(1).max(200),
    subheadline: zod_1.z.string().min(1).max(200),
    description: zod_1.z.string().min(1).max(1000),
    minDonation: zod_1.z.string().min(1).max(50),
    ctaPrimary: zod_1.z.string().min(1).max(50),
    ctaSecondary: zod_1.z.string().min(1).max(50),
    cardTitle: zod_1.z.string().min(1).max(100),
    cardProgress: zod_1.z.number().int().min(0).max(100).optional(),
    testimonial: zod_1.z.string().max(500).optional(),
    testimonialAuthor: zod_1.z.string().max(100).optional(),
    isActive: zod_1.z.boolean().optional(),
});
exports.updateHomeCtaSchema = (0, base_validator_1.makeUpdateSchema)(exports.createHomeCtaSchema);
//# sourceMappingURL=home.validator.js.map