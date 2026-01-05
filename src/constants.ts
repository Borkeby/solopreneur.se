import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";
import IconLinkedin from "@/assets/icons/IconLinkedin.svg";
import IconFacebook from "@/assets/icons/IconFacebook.svg";
import { SITE } from "@/config";

export interface Social {
    name: string;
    href: string;
    linkTitle: string;
    icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/solopreneur-se",
        linkTitle: `Följ ${SITE.title} på LinkedIn`,
        icon: IconLinkedin,
    },
    {
        name: "Mail",
        href: "mailto:support@paidin.se",
        linkTitle: `Skicka e-post till ${SITE.title}`,
        icon: IconMail,
    },
];

export const SHARE_LINKS: Social[] = [
    {
        name: "Facebook",
        href: "https://www.facebook.com/sharer.php?u=",
        linkTitle: "Dela detta inlägg på Facebook",
        icon: IconFacebook,
    },
    {
        name: "Mail",
        href: "mailto:?subject=Se%20detta%20inlägg&body=",
        linkTitle: "Dela detta inlägg via e-post",
        icon: IconMail,
    },
];
