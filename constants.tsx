import { Era, EraId } from './types';

export const ERAS: Era[] = [
  {
    id: EraId.ROARING_20S,
    name: "Roaring 20s",
    description: "Jazz age glitz and glamour.",
    promptModifier: "1920s jazz age, flapper style or tuxedo, art deco background, black and white vintage photography style, grainy texture",
    icon: "🎷"
  },
  {
    id: EraId.VICTORIAN,
    name: "Victorian Era",
    description: "Elegant formal wear and steam.",
    promptModifier: "19th century Victorian era, formal steampunk aesthetic, sepia tone, detailed ornate background, top hat or corset",
    icon: "🎩"
  },
  {
    id: EraId.CYBERPUNK,
    name: "Cyberpunk 2077",
    description: "High-tech low-life neon future.",
    promptModifier: "Futuristic cyberpunk city, neon lights, cybernetic enhancements, night time, rain, vivid colors, cinematic sci-fi look",
    icon: "🤖"
  },
  {
    id: EraId.ANCIENT_ROME,
    name: "Ancient Rome",
    description: "Togas and marble columns.",
    promptModifier: "Ancient Rome, wearing a toga, marble columns in background, bright mediterranean sunlight, oil painting style",
    icon: "🏛️"
  },
  {
    id: EraId.WILD_WEST,
    name: "Wild West",
    description: "Cowboys and dusty saloons.",
    promptModifier: "1880s American Wild West, cowboy hat, leather vest, wooden saloon background, warm dusty lighting, vintage tintype photo",
    icon: "🤠"
  },
  {
    id: EraId.EIGHTIES_ARCADE,
    name: "80s Arcade",
    description: "Retro wave and synth pop.",
    promptModifier: "1980s retro fashion, neon geometry background, synthwave aesthetic, vibrant pastel colors, soft focus",
    icon: "🕹️"
  }
];
