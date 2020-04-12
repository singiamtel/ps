import {
  BoostsTable,
  EvoType,
  GenderName,
  GenerationNum,
  ID,
  MoveCategory,
  MoveTarget,
  NatureName,
  Nonstandard,
  StatsTable,
  TypeName,
} from '@pkmn/types';

export type EffectType =
  'Effect' | 'Pokemon' | 'Move' | 'Item' | 'Ability' | 'Weather' | 'Status';

export type Effect = Ability | Item | Move | PureEffect;

export interface EffectData {
  name: string;
  num: number;
  affectsFainted?: boolean;
  counterMax?: number;
  desc?: string;
  drain?: [number, number];
  duration?: number;
  effect?: Partial<PureEffect>;
  effectType?: string;
  infiltrates?: boolean;
  isNonstandard?: Nonstandard | null;
  isZ?: boolean | string;
  isMax?: boolean | string;
  noCopy?: boolean;
  recoil?: [number, number];
  secondary?: SecondaryEffect | null;
  secondaries?: SecondaryEffect[] | null;
  self?: SelfEffect | null;
  shortDesc?: string;
  status?: string;
  weather?: string;
  inherit?: boolean;
}

export interface SecondaryEffect {
  chance?: number;
  ability?: Ability;
  boosts?: Partial<BoostsTable>;
  dustproof?: boolean;
  kingsrock?: boolean;
  self?: SelfEffect;
  status?: string;
  volatileStatus?: string;
}

export interface SelfEffect {
  boosts?: Partial<BoostsTable>;
  chance?: number;
  pseudoWeather?: string;
  sideCondition?: string;
  slotCondition?: string;
  terrain?: string;
  volatileStatus?: string;
  weather?: string;
}

export interface AbilityData extends EffectData {
  rating: number;
  isUnbreakable?: boolean;
  suppressWeather?: boolean;
}

export interface FlingData {
  basePower: number;
  status?: string;
  volatileStatus?: string;
}

export interface ItemData extends EffectData {
  gen: GenerationNum;
  fling?: FlingData;
  forcedForme?: string;
  ignoreKlutz?: boolean;
  isBerry?: boolean;
  isChoice?: boolean;
  isGem?: boolean;
  isPokeball?: boolean;
  megaStone?: string;
  megaEvolves?: string;
  naturalGift?: { basePower: number; type: string };
  onDrive?: string;
  onMemory?: string;
  onPlate?: string;
  spritenum?: number;
  zMove?: string | true;
  zMoveFrom?: string;
  zMoveType?: string;
  itemUser?: string[];
  boosts?: Partial<BoostsTable> | false;
}

export interface MoveFlags {
  authentic?: 1 | 0;
  bite?: 1 | 0;
  bullet?: 1 | 0;
  charge?: 1 | 0;
  contact?: 1 | 0;
  dance?: 1 | 0;
  defrost?: 1 | 0;
  distance?: 1 | 0;
  gravity?: 1 | 0;
  heal?: 1 | 0;
  mirror?: 1 | 0;
  mystery?: 1 | 0;
  nonsky?: 1 | 0;
  powder?: 1 | 0;
  protect?: 1 | 0;
  pulse?: 1 | 0;
  punch?: 1 | 0;
  recharge?: 1 | 0;
  reflectable?: 1 | 0;
  snatch?: 1 | 0;
  sound?: 1 | 0;
}

export interface MoveData extends EffectData {
  accuracy: true | number;
  basePower: number;
  category: MoveCategory;
  flags: MoveFlags;
  pp: number;
  priority: number;
  target: MoveTarget;
  type: TypeName;
  alwaysHit?: boolean;
  baseMoveType?: string;
  basePowerModifier?: number;
  boosts?: Partial<BoostsTable> | false;
  breaksProtect?: boolean;
  contestType?: string;
  critModifier?: number;
  critRatio?: number;
  damage?: number | 'level' | false | null;
  defensiveCategory?: MoveCategory;
  forceSwitch?: boolean;
  hasCustomRecoil?: boolean;
  heal?: number[] | null;
  ignoreAbility?: boolean;
  ignoreAccuracy?: boolean;
  ignoreDefensive?: boolean;
  ignoreEvasion?: boolean;
  ignoreImmunity?: boolean | { [k: string]: boolean };
  ignoreNegativeOffensive?: boolean;
  ignoreOffensive?: boolean;
  ignorePositiveDefensive?: boolean;
  ignorePositiveEvasion?: boolean;
  isSelfHit?: boolean;
  isFutureMove?: boolean;
  isViable?: boolean;
  isMax?: boolean | string;
  mindBlownRecoil?: boolean;
  multiaccuracy?: boolean;
  multihit?: number | number[];
  multihitType?: string;
  noDamageVariance?: boolean;
  noFaint?: boolean;
  noMetronome?: string[];
  nonGhostTarget?: string;
  noPPBoosts?: boolean;
  noSketch?: boolean;
  ohko?: boolean | string;
  pressureTarget?: string;
  pseudoWeather?: string;
  selfBoost?: { boosts?: Partial<BoostsTable> };
  selfdestruct?: string | boolean;
  selfSwitch?: string | boolean;
  sideCondition?: string;
  sleepUsable?: boolean;
  slotCondition?: string;
  spreadModifier?: number;
  stallingMove?: boolean;
  stealsBoosts?: boolean;
  struggleRecoil?: boolean;
  terrain?: string;
  thawsTarget?: boolean;
  tracksTarget?: boolean;
  smartTarget?: boolean;
  useTargetOffensive?: boolean;
  useSourceDefensiveAsOffensive?: boolean;
  volatileStatus?: string;
  weather?: string;
  willCrit?: boolean;
  forceSTAB?: boolean;
  zMovePower?: number;
  zMoveEffect?: string;
  zMoveBoost?: Partial<BoostsTable>;
  gmaxPower?: number;
  baseMove?: string;
  isZPowered?: boolean;
  maxPowered?: boolean;
}

export interface SpeciesAbility {
  0: string;
  1?: string;
  H?: string;
  S?: string;
}

export interface SpeciesData {
  abilities: SpeciesAbility;
  baseStats: StatsTable;
  canHatch?: boolean;
  color: string;
  eggGroups: string[];
  heightm: number;
  num: number;
  name: string;
  types: string[];
  weightkg: number;
  baseForme?: string;
  baseSpecies?: string;
  evoLevel?: number;
  evoMove?: string;
  evoCondition?: string;
  evoItem?: string;
  evos?: string[];
  evoType?: EvoType;
  forme?: string;
  gender?: GenderName;
  genderRatio?: { [k: string]: number };
  maxHP?: number;
  cosmeticFormes?: string[];
  otherFormes?: string[];
  prevo?: string;
  gen?: number;
  requiredAbility?: string;
  requiredItem?: string;
  requiredItems?: string[];
  requiredMove?: string;
  battleOnly?: string | string[];
  isGigantamax?: string;
  inheritsFrom?: string;
  tier?: string;
  inherit?: boolean;
}

export type MoveSource = string;

export interface EventInfo {
  generation: number;
  level?: number;
  shiny?: boolean | 1;
  gender?: GenderName;
  nature?: string;
  ivs?: Partial<StatsTable>;
  perfectIVs?: number;
  isHidden?: boolean;
  abilities?: string[];
  maxEggMoves?: number;
  moves?: string[];
  pokeball?: string;
  from?: string;
}

export interface LearnsetData {
  learnset?: {[moveid: string]: MoveSource[]};
  eventData?: EventInfo[];
  eventOnly?: boolean;
  encounters?: EventInfo[];
  exists?: boolean;
}

export interface TypeData {
  damageTaken: { [t in Exclude<TypeName, '???'>]?: number } & { [key: string]: number };
  HPdvs?: Partial<StatsTable>;
  HPivs?: Partial<StatsTable>;
  inherit?: boolean;
}

export interface NatureData {
  name: NatureName;
  plus?: keyof StatsTable;
  minus?: keyof StatsTable;
}

interface AnyObject { [k: string]: any }

export interface BasicEffect extends Readonly<EffectData> {
  id: ID;
  name: string;
  fullname: string;
  effectType: EffectType;
  exists: boolean;
  num: number;
  gen: GenerationNum;
  shortDesc: string;
  desc: string;
  isNonstandard: Nonstandard | null;
  duration?: number;
  noCopy: boolean;
  affectsFainted: boolean;
  status?: ID;
  weather?: ID;
  sourceEffect: string;
}

export interface PureEffect extends Readonly<BasicEffect> {
  readonly effectType: 'Effect' | 'Weather' | 'Status';
}

export interface Ability extends Readonly<BasicEffect & AbilityData> {
  readonly effectType: 'Ability';
  readonly rating: number;
  readonly suppressWeather: boolean;
}

export interface Item extends Readonly<BasicEffect & ItemData> {
  readonly effectType: 'Item';
  readonly fling?: FlingData;
  readonly onDrive?: string;
  readonly onMemory?: string;
  readonly megaStone?: string;
  readonly megaEvolves?: string;
  readonly zMove?: true | string;
  readonly zMoveType?: string;
  readonly zMoveFrom?: string;
  readonly itemUser?: string[];
  readonly isBerry: boolean;
  readonly ignoreKlutz: boolean;
  readonly onPlate?: string;
  readonly isGem: boolean;
  readonly isPokeball: boolean;
}

export interface Move extends Readonly<BasicEffect & MoveData> {
  readonly effectType: 'Move';
  readonly type: TypeName;
  readonly target: MoveTarget;
  readonly basePower: number;
  readonly accuracy: true | number;
  readonly critRatio: number;
  readonly willCrit?: boolean;
  readonly ohko?: boolean | string;
  readonly baseMoveType: string;
  readonly secondary: SecondaryEffect | null;
  readonly secondaries: SecondaryEffect[] | null;
  readonly priority: number;
  readonly category: MoveCategory;
  readonly defensiveCategory?: MoveCategory;
  readonly useTargetOffensive: boolean;
  readonly useSourceDefensiveAsOffensive: boolean;
  readonly ignoreNegativeOffensive: boolean;
  readonly ignorePositiveDefensive: boolean;
  readonly ignoreOffensive: boolean;
  readonly ignoreDefensive: boolean;
  readonly ignoreImmunity: AnyObject | boolean;
  readonly pp: number;
  readonly noPPBoosts: boolean;
  readonly isZ: boolean | string;
  readonly multihit?: number | number[];
  readonly gmaxPower?: number;
  readonly zMovePower?: number;
  readonly flags: MoveFlags;
  readonly selfSwitch?: ID | boolean;
  readonly pressureTarget: string;
  readonly nonGhostTarget: string;
  readonly ignoreAbility: boolean;
  readonly damage: number | 'level' | false | null;
  readonly spreadModifier?: number;
  readonly critModifier?: number;
  readonly forceSTAB: boolean;
  readonly noSketch: boolean;
  readonly stab?: number;
  readonly volatileStatus?: ID;
}

export interface Species extends Readonly<BasicEffect & SpeciesData> {
  readonly effectType: 'Pokemon';
  readonly id: ID;
  readonly name: string;
  readonly baseSpecies: string;
  readonly forme: string;
  readonly baseForme: string;
  readonly cosmeticFormes?: string[];
  readonly otherFormes?: string[];
  readonly spriteid: string;
  readonly abilities: SpeciesAbility;
  readonly types: string[];
  readonly addedType?: string;
  readonly prevo: ID;
  readonly evos: ID[];
  readonly evoType?: EvoType;
  readonly evoMove?: string;
  readonly evoLevel?: number;
  readonly nfe: boolean;
  readonly eggGroups: string[];
  readonly gender: GenderName;
  readonly genderRatio: { M: number; F: number };
  readonly baseStats: StatsTable;
  readonly maxHP?: number;
  readonly weightkg: number;
  readonly weighthg: number;
  readonly heightm: number;
  readonly color: string;
  readonly unreleasedHidden: boolean | 'Past';
  readonly maleOnlyHidden: boolean;
  readonly isMega?: boolean;
  readonly isPrimal?: boolean;
  readonly isGigantamax?: string;
  readonly battleOnly?: string | string[];
  readonly requiredItem?: string;
  readonly requiredMove?: string;
  readonly requiredAbility?: string;
  readonly requiredItems?: string[];
  readonly inheritsFrom: ID;
  readonly tier: string;
  readonly doublesTier: string;
  readonly randomBattleMoves?: readonly ID[];
  readonly randomDoubleBattleMoves?: readonly ID[];
  readonly exclusiveMoves?: readonly ID[];
  readonly comboMoves?: readonly ID[];
  readonly essentialMove?: ID;
}

export interface Learnset {
  readonly effectType: 'Learnset';
  readonly learnset?: {[moveid: string]: MoveSource[]};
  readonly eventOnly: boolean;
  readonly eventData?: EventInfo[];
  readonly encounters?: EventInfo[];
  readonly exists: boolean;
}

export interface Type extends Readonly<TypeData> {
  readonly id: ID;
  readonly name: string;
  readonly effectType: 'Type';
  readonly exists: boolean;
  readonly gen: GenerationNum;
  readonly damageTaken: { [t in Exclude<TypeName, '???'>]: number } & { [key: string]: number };
  readonly HPivs: Partial<StatsTable>;
  readonly HPdvs: Partial<StatsTable>;
}

export interface Nature extends NatureData {
  effectType: 'Nature';
  id: ID;
  name: NatureName;
  gen: GenerationNum;
  exists?: boolean;
}

export type GenID = 'gen1' | 'gen2' | 'gen3' | 'gen4' | 'gen5' | 'gen6' | 'gen7' | 'gen8';

export interface Dex {
  readonly gen: GenerationNum;
  readonly modid: ID;
  readonly data: {
    Abilities: { [id: string]: AbilityData };
    Aliases: { [id: string]: string };
    Items: { [id: string]: ItemData };
    Moves: { [id: string]: MoveData };
    Species: { [id: string]: SpeciesData };
    Natures: { [id: string]: NatureData };
    Learnsets: null | { [id: string]: LearnsetData };
    Types: { [type in Exclude<TypeName, '???'>]: TypeData };
  };

  mod(genid: GenID): Dex;
  forGen(gen: number): Dex;
  includeModData(): this;
  includeData(): this;
  includeFormats(): this;

  getSpecies(name: string): Species;
  getEffect(name: string): Effect;
  getAbility(name: string): Ability;
  getLearnset(name: string): Promise<Learnset>;
  getItem(name: string): Item;
  getMove(name: string): Move;
  getNature(name: string): Nature;
  getType(name: string): Type;

  getForme(speciesid: string | Species): string;
  getOutOfBattleSpecies(species: Species): string;
  hasAbility(species: Species, ability: string): boolean;
  getHiddenPower(ivs: StatsTable): {type: TypeName; power: number};
  getImmunity(
    source: { type: string } | string,
    target: { getTypes: () => string[] } | { types: string[] } | string[] | string
  ): boolean;
  getEffectiveness(
    source: { type: string } | string,
    target: { getTypes: () => string[] } | { types: string[] } | string[] | string
  ): number;
}