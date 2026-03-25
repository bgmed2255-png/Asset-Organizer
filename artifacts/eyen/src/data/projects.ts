export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  result: string;
  services: string[];
  heroImage: string;
  cardImage: string;
  detailImages: string[];
  accentColor: string;
  bg: string;
}

export const projects: Project[] = [
  {
    slug: "silence-between-notes",
    title: "The Silence Between Notes",
    category: "Brand Identity",
    year: "2024",
    tagline: "A music label reborn as a cultural institution.",
    description:
      "An independent music label with a 30-year legacy had become invisible in the streaming age. They needed more than a rebrand — they needed a resurrection. We stripped everything back to silence and rebuilt from the archetypal core outward.",
    challenge:
      "The label's identity had accumulated decades of inconsistency. Across physical and digital touchpoints, there was no coherent visual language — only history and prestige. The challenge was to honour that legacy while creating something utterly contemporary.",
    solution:
      "We developed a brand system rooted in the Japanese concept of 'Ma' — the pregnant pause between sounds. Every visual element was designed to occupy negative space deliberately. The wordmark was distilled to its most essential serif form, and a strict typographic hierarchy was established across all touchpoints.",
    result:
      "The rebrand generated a 340% increase in press coverage in the first quarter. Three major artists signed within six months citing the brand's cultural credibility as a decisive factor.",
    services: ["Brand Strategy", "Visual Identity", "Typography System", "Collateral Design", "Digital Guidelines"],
    heroImage: "/images/project-1.png",
    cardImage: "/images/project-1.png",
    detailImages: ["/images/silence-1.png", "/images/silence-2.png"],
    accentColor: "#C4A882",
    bg: "linear-gradient(135deg, #1a1008 0%, #2d1f0e 40%, #101010 100%)",
  },
  {
    slug: "fractured-horizon",
    title: "Fractured Horizon",
    category: "Visual Identity",
    year: "2024",
    tagline: "Where brutalist architecture meets human vulnerability.",
    description:
      "A new ultra-luxury hotel group entering a saturated market of identikit five-star properties. We were tasked with creating a brand that felt genuinely inevitable — one that seemed to have always existed, just waiting to be discovered.",
    challenge:
      "Luxury hospitality branding has become homogeneous — the same soft serifs, the same warm neutrals, the same promises of 'exclusive experiences.' We needed to position Fractured Horizon as the anti-luxury luxury brand: rigorous, architectural, uncompromising.",
    solution:
      "Drawing from brutalist architecture and the Japanese art of Wabi-Sabi, we developed a visual identity that celebrates imperfection as the highest form of refinement. The logo mark is a geometric fracture — mathematically precise yet emotionally resonant. Materials are always dark, always heavy, always permanent.",
    result:
      "Forbes Travel Guide awarded the brand Five Stars before the first property opened, citing the brand experience as 'setting a new standard for what luxury hospitality communication can aspire to be.'",
    services: ["Brand Positioning", "Visual Identity", "Environmental Design", "Digital Experience", "Brand Architecture"],
    heroImage: "/images/project-2.png",
    cardImage: "/images/project-2.png",
    detailImages: ["/images/horizon-1.png", "/images/horizon-2.png"],
    accentColor: "#7B9BA8",
    bg: "linear-gradient(135deg, #0d1117 0%, #111827 50%, #101010 100%)",
  },
  {
    slug: "the-ritual",
    title: "The Ritual",
    category: "Brand Strategy",
    year: "2023",
    tagline: "NLP-infused brand language that converts the skeptical.",
    description:
      "A wellness brand founded by a neuroscientist and a former pharmaceutical executive. Their products worked — clinically proven, peer-reviewed. But in a market drowning in wellness theatre, efficacy alone doesn't sell. Belief does.",
    challenge:
      "The brand had superb product but spoke only to the converted. Skeptical consumers — the largest untapped segment — were dismissing them alongside every other wellness brand making impossible promises. The challenge: create brand language that bypasses skepticism and speaks directly to identity.",
    solution:
      "Using NLP frameworks, we restructured every customer touchpoint around the principle of 'narrative resonance' — creating brand language that mirrors the internal dialogue of the skeptic. The visual identity uses the language of laboratory precision married to ancient ritual: dark, deliberate, sacred.",
    result:
      "Customer conversion rates improved by 280% in the first year. The brand's newsletter became the fastest-growing in the wellness category, driven entirely by word-of-mouth from skeptics turned believers.",
    services: ["Brand Strategy", "NLP Copywriting", "Visual Identity", "Packaging Design", "Campaign Direction"],
    heroImage: "/images/project-3.png",
    cardImage: "/images/project-3.png",
    detailImages: ["/images/ritual-1.png", "/images/ritual-2.png"],
    accentColor: "#B8A06A",
    bg: "linear-gradient(135deg, #120d08 0%, #1c1408 50%, #101010 100%)",
  },
  {
    slug: "negative-space",
    title: "Negative Space",
    category: "Campaign Direction",
    year: "2023",
    tagline: "What you don't say is as powerful as what you do.",
    description:
      "A Parisian fashion house reintroducing itself to a generation that had never encountered its archive. The brief: create a campaign that communicates twenty years of silence as a considered choice, not a failure.",
    challenge:
      "Fashion campaigns compete on spectacle — more, louder, more elaborate. The house had no spectacle to offer, only restraint and an archive of extraordinary garments that had never been photographed. We had to make absence feel like abundance.",
    solution:
      "We created a campaign built entirely around what wasn't shown. Garments were photographed in absolute darkness, caught only in the moment a single light source revealed their structure. The campaign copy was a single sentence across all executions, different each time. No models. No locations. No context.",
    result:
      "The campaign was exhibited in three art institutions before it ran commercially. Vogue named it 'the most significant fashion communication of the decade.' The house sold out its entire archive reissue within 72 hours.",
    services: ["Creative Direction", "Campaign Strategy", "Art Direction", "Photography Direction", "Media Planning"],
    heroImage: "/images/project-4.png",
    cardImage: "/images/project-4.png",
    detailImages: ["/images/negspace-1.png", "/images/negspace-2.png"],
    accentColor: "#E5D5C0",
    bg: "linear-gradient(135deg, #0e0e0e 0%, #181818 50%, #101010 100%)",
  },
];
