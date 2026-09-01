export const NAV = [
	{ href: '/philosophy/', label: 'Philosophy' },
	{ href: '/features/', label: 'Features' },
	{ href: '/sync/', label: 'Sync' },
	{ href: '/docs/', label: 'Docs' }
];

// ewe is a distro: the ISO is the product, the other repos are its layers.
export const OS_REPO = 'https://github.com/prj786/ewe-os';
export const OS_RELEASES = 'https://github.com/prj786/ewe-os/releases';
export const DE_REPO = 'https://github.com/prj786/ewe';
export const PKG_REPO = 'https://github.com/prj786/ewe-repo';
export const ISSUES = 'https://github.com/prj786/ewe-os/issues';

export const JOIN = 'cat ewe-*-x86_64.iso.*.part > ewe-x86_64.iso';
export const VERIFY = 'sha256sum -c SHA256SUMS --ignore-missing';
export const WRITE = 'sudo dd if=ewe-x86_64.iso of=/dev/sdX bs=4M status=progress oflag=sync';
