// The current ISO, in one place.
//
// WHY A CONSTANT AND NOT A FETCH. The footer promises no third-party
// requests, and asking api.github.com or archive.org at page load would make
// that a lie — so the version is baked in at build time instead. It is one
// line to move, and `release-iso.yml` prints the exact replacement at the end
// of every ISO build.
//
// WHY THE INTERNET ARCHIVE. A GitHub release asset is capped at 2 GiB and the
// image is ~3 GB, which is why downloads used to arrive as `.part` files you
// had to `cat` back together. archive.org hosts freely-licensed images whole,
// for free and permanently, so the button below is one click and one file.
// The split parts stay on the GitHub release as a mirror.
export const VERSION = '0.12.4-beta';

/**
 * Whether the whole-image download on the Internet Archive exists yet.
 *
 * It does not, until IA_ACCESS / IA_SECRET are set on ewe-os and a tag is
 * pushed — so the button below must not point at it: a 404 on the main call
 * to action is worse than the split parts. While false, the download page
 * leads with the GitHub release (the parts) and says the one-file download
 * is coming. Flip this to true in the same commit that moves VERSION to the
 * first tag the Archive step ran for.
 */
export const WHOLE_ISO_LIVE = false;

export const ISO_FILE = `ewe-${VERSION}-x86_64.iso`;
export const IA_ITEM = `ewe-os-${VERSION}`;
export const IA_DETAILS = `https://archive.org/details/${IA_ITEM}`;

/** One click, one file: the whole ISO. */
export const ISO_URL = `https://archive.org/download/${IA_ITEM}/${ISO_FILE}`;
export const SUMS_URL = `https://archive.org/download/${IA_ITEM}/SHA256SUMS`;

/** Rounded, for the button. Exact bytes are in SHA256SUMS beside the image. */
export const ISO_SIZE = '3.0 GB';

/** The GitHub release for this tag — split parts, notes, source. */
export const RELEASE_URL = `https://github.com/prj786/ewe-os/releases/tag/v${VERSION}`;

/** What the big button links to today. */
export const DOWNLOAD_URL = WHOLE_ISO_LIVE ? ISO_URL : RELEASE_URL;
