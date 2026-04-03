/**
 * Beam Design Language — Recommended Status Labels
 *
 * Standardized status vocabulary for issues, pull requests, and work items.
 * Each status maps to a Badge variant for visual consistency.
 */

export interface StatusDef {
  label: string;
  variant: string;
  icon?: string;
  color?: string;
  description: string;
}

/** Issue statuses */
export const issueStatuses: StatusDef[] = [
  { label: "Open", variant: "open", icon: "circle", color: "#22c55e", description: "Issue is active and accepting contributions" },
  { label: "Closed", variant: "closed", icon: "cancel", color: "#991b1b", description: "Issue has been resolved or won't be fixed" },
  { label: "Duplicate", variant: "closed", icon: "content_copy", color: "#991b1b", description: "Issue duplicates an existing one" },
];

/** Pull request statuses */
export const prStatuses: StatusDef[] = [
  { label: "Draft", variant: "draft", icon: "edit_note", color: "#525252", description: "PR is a work in progress, not ready for review" },
  { label: "Review", variant: "review", icon: "rate_review", color: "#92400e", description: "PR is awaiting code review" },
  { label: "Approved", variant: "approved", icon: "check_circle", color: "#15803d", description: "PR has been approved and is ready to merge" },
  { label: "Revision", variant: "revision", icon: "edit", color: "#c2410c", description: "Reviewer has requested changes" },
  { label: "Merged", variant: "merged", icon: "merge", color: "#7e22ce", description: "PR has been merged into the target branch" },
  { label: "Declined", variant: "closed", icon: "close", color: "#991b1b", description: "PR has been closed without merging" },
];

/** Priority levels */
export const priorities: StatusDef[] = [
  { label: "Critical", variant: "critical", icon: "priority_high", color: "#dc2626", description: "Requires immediate attention" },
  { label: "High", variant: "high", icon: "arrow_upward", color: "#ea580c", description: "Should be addressed soon" },
  { label: "Medium", variant: "medium", icon: "remove", color: "#d97706", description: "Normal priority" },
  { label: "Low", variant: "low", icon: "arrow_downward", color: "#0d9488", description: "Can be addressed when convenient" },
];

/** Release stages */
export const releaseStages: StatusDef[] = [
  { label: "Stable", variant: "stable", description: "Production-ready, fully supported" },
  { label: "Beta", variant: "beta", description: "Feature-complete but may have bugs" },
  { label: "Preview", variant: "preview", description: "Early access, API may change" },
  { label: "Experimental", variant: "experimental", description: "Proof of concept, not for production" },
  { label: "Deprecated", variant: "deprecated", description: "Scheduled for removal, migrate away" },
];

/** All statuses combined for reference */
export const allStatuses = {
  issue: issueStatuses,
  pr: prStatuses,
  priority: priorities,
  release: releaseStages,
};
