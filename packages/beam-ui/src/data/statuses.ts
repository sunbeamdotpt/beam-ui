/**
 * Beam Design Language — Recommended Status Labels
 *
 * Standardized status vocabulary for issues, pull requests, and work items.
 * Each status maps to a Badge variant for visual consistency.
 */

/**
 * Definition of a status with visual styling and metadata.
 *
 * Used to render consistent status badges across issues, PRs, and work items.
 */
export interface StatusDef {
  /** Display text for the status (e.g., "Open", "Approved", "Draft"). */
  label: string;
  /** Badge variant name for styling (e.g., "open", "closed", "review"). */
  variant: string;
  /** Optional Material Design icon name (e.g., "circle", "check_circle"). */
  icon?: string;
  /** Optional hex color for visual overrides. */
  color?: string;
  /** Human-readable explanation of what this status means. */
  description: string;
}

/**
 * Standard issue status definitions.
 *
 * Used to render consistent status badges on issue lists and detail pages.
 * Consumers filter and display these statuses to show issue workflow state.
 */
export const issueStatuses: StatusDef[] = [
  { label: "Open", variant: "open", icon: "circle", color: "#22c55e", description: "Issue is active and accepting contributions" },
  { label: "Closed", variant: "closed", icon: "cancel", color: "#991b1b", description: "Issue has been resolved or won't be fixed" },
  { label: "Duplicate", variant: "closed", icon: "content_copy", color: "#991b1b", description: "Issue duplicates an existing one" },
];

/**
 * Standard pull request status definitions.
 *
 * Used to render consistent status badges on PR lists and detail pages.
 * Consumers track PR workflow through Draft → Review → Approved/Revision → Merged/Declined states.
 */
export const prStatuses: StatusDef[] = [
  { label: "Draft", variant: "draft", icon: "edit_note", color: "#525252", description: "PR is a work in progress, not ready for review" },
  { label: "Review", variant: "review", icon: "rate_review", color: "#92400e", description: "PR is awaiting code review" },
  { label: "Approved", variant: "approved", icon: "check_circle", color: "#15803d", description: "PR has been approved and is ready to merge" },
  { label: "Revision", variant: "revision", icon: "edit", color: "#c2410c", description: "Reviewer has requested changes" },
  { label: "Merged", variant: "merged", icon: "merge", color: "#7e22ce", description: "PR has been merged into the target branch" },
  { label: "Declined", variant: "closed", icon: "close", color: "#991b1b", description: "PR has been closed without merging" },
];

/**
 * Priority level definitions for issues and work items.
 *
 * Used to sort and filter backlog items by urgency.
 * Consumers assign priorities to track and communicate work importance.
 */
export const priorities: StatusDef[] = [
  { label: "Critical", variant: "critical", icon: "priority_high", color: "#dc2626", description: "Requires immediate attention" },
  { label: "High", variant: "high", icon: "arrow_upward", color: "#ea580c", description: "Should be addressed soon" },
  { label: "Medium", variant: "medium", icon: "remove", color: "#d97706", description: "Normal priority" },
  { label: "Low", variant: "low", icon: "arrow_downward", color: "#0d9488", description: "Can be addressed when convenient" },
];

/**
 * Feature release stage definitions.
 *
 * Used to badge features and APIs by maturity level.
 * Consumers show these in documentation to set user expectations about stability and support.
 */
export const releaseStages: StatusDef[] = [
  { label: "Stable", variant: "stable", description: "Production-ready, fully supported" },
  { label: "Beta", variant: "beta", description: "Feature-complete but may have bugs" },
  { label: "Preview", variant: "preview", description: "Early access, API may change" },
  { label: "Experimental", variant: "experimental", description: "Proof of concept, not for production" },
  { label: "Deprecated", variant: "deprecated", description: "Scheduled for removal, migrate away" },
];

/**
 * Convenience object combining all status arrays by category.
 *
 * Useful for bulk operations or rendering all available statuses.
 */
export const allStatuses = {
  issue: issueStatuses,
  pr: prStatuses,
  priority: priorities,
  release: releaseStages,
};
