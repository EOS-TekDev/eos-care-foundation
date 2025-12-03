import { getImageUrl, cn } from '../../lib/utils';
import type { TeamMember } from '../../lib/types';

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  isVisible: boolean;
}

export function TeamMemberCard({ member, index, isVisible }: TeamMemberCardProps) {
  return (
    <div
      className={cn(
        "group text-center",
        "opacity-0 translate-y-8 transition-all duration-500",
        isVisible && "opacity-100 translate-y-0"
      )}
      style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
    >
      {/* Avatar */}
      <div className="relative mx-auto mb-4">
        <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden mx-auto ring-4 ring-white shadow-medium group-hover:shadow-strong transition-shadow duration-300">
          {member.photo ? (
            <img
              src={getImageUrl(member.photo)}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-cta/20 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl font-display font-bold text-primary/60">
                {member.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        {/* Decorative ring on hover */}
        <div className="absolute inset-0 rounded-full ring-2 ring-primary/0 group-hover:ring-primary/30 transition-all duration-300 scale-110 opacity-0 group-hover:opacity-100" />
      </div>

      {/* Name */}
      <h3 className="font-display font-semibold text-text-primary text-base sm:text-lg mb-1 group-hover:text-primary transition-colors duration-300">
        {member.name}
      </h3>

      {/* Role */}
      <p className="text-sm text-text-secondary">
        {member.role}
      </p>
    </div>
  );
}
