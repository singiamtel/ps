type Battle = import('./battle').Battle;
type Field = import('./field').Field;
type Action = import('./battle-queue').Action;
type ModdedDex = import('./dex').ModdedDex;
type Pokemon = import('./pokemon').Pokemon;
type PRNGSeed = import('./prng').PRNGSeed;
type Side = import('./side').Side;
type TeamValidator = import('./team-validator').TeamValidator;
type PokemonSources = import('./team-validator').PokemonSources;

type ID = import('@pkmn/types').ID;
interface AnyObject {[k: string]: any}
interface DexTable<T> {
	[key: string]: T;
}

type GenderName = import('@pkmn/types').GenderName | '';
type StatName = import('@pkmn/types').StatName;
type StatNameExceptHP = Exclude<StatName, 'hp'>;
type StatsExceptHPTable = {[stat in StatNameExceptHP]: number};
type StatsTable<T = number> = import('@pkmn/types').StatsTable<T>;
type SparseStatsTable = Partial<StatsTable>;
type BoostName = import('@pkmn/types').BoostName;
type BoostsTable = import('@pkmn/types').BoostsTable;
type SparseBoostsTable = Partial<BoostsTable>;
type Nonstandard = import('@pkmn/types').Nonstandard;
type MoveTarget = import('@pkmn/types').MoveTarget;

type PokemonSet<T = string> = import('@pkmn/types').PokemonSet<T>;

type MoveSource = import('@pkmn/types').MoveSource;

type EventInfo = import('@pkmn/types').EventInfo;

type Effect = Ability | Item | ActiveMove | Template | PureEffect | Format;

type SelfEffectData = import('@pkmn/types').SelfEffect;
interface SelfEffect extends SelfEffectData {
	onHit?: MoveEventMethods['onHit'];
}

type SecondaryEffectData = import('@pkmn/types').SecondaryEffect;
interface SecondaryEffect extends SecondaryEffectData  {
	self?: SelfEffect;
	onHit?: MoveEventMethods['onHit'];
}

interface CommonHandlers {
	ModifierEffect: (this: Battle, relayVar: number, target: Pokemon, source: Pokemon, effect: Effect) => number | void;
	ModifierMove: (this: Battle, relayVar: number, target: Pokemon, source: Pokemon, move: ActiveMove) => number | void;
	ResultMove: boolean | (
		(this: Battle, target: Pokemon, source: Pokemon, move: ActiveMove) => boolean | null | "" | void
	);
	ExtResultMove: boolean | (
		(this: Battle, target: Pokemon, source: Pokemon, move: ActiveMove) => boolean | null | number | "" | void
	);
	VoidEffect: (this: Battle, target: Pokemon, source: Pokemon, effect: Effect) => void;
	VoidMove: (this: Battle, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
	ModifierSourceEffect: (
		this: Battle, relayVar: number, source: Pokemon, target: Pokemon, effect: Effect
	) => number | void;
	ModifierSourceMove: (
		this: Battle, relayVar: number, source: Pokemon, target: Pokemon, move: ActiveMove
	) => number | void;
	ResultSourceMove: boolean | (
		(this: Battle, source: Pokemon, target: Pokemon, move: ActiveMove) => boolean | null | "" | void
	);
	ExtResultSourceMove: boolean | (
		(this: Battle, source: Pokemon, target: Pokemon, move: ActiveMove) => boolean | null | number | "" | void
	);
	VoidSourceEffect: (this: Battle, source: Pokemon, target: Pokemon, effect: Effect) => void;
	VoidSourceMove: (this: Battle, source: Pokemon, target: Pokemon, move: ActiveMove) => void;
}

interface AbilityEventMethods {
	onCheckShow?: (this: Battle, pokemon: Pokemon) => void;
	onEnd?: (this: Battle, target: Pokemon & Side & Field) => void;
	onPreStart?: (this: Battle, pokemon: Pokemon) => void;
	onStart?: (this: Battle, target: Pokemon) => void;
}

interface ItemEventMethods {
	onEat?: ((this: Battle, pokemon: Pokemon) => void) | false;
	onPrimal?: (this: Battle, pokemon: Pokemon) => void;
	onStart?: (this: Battle, target: Pokemon) => void;
	onTakeItem?: (
		(this: Battle, item: Item, pokemon: Pokemon, source: Pokemon, move?: ActiveMove) => boolean | void
	) | boolean;
}

interface MoveEventMethods {
	/** Return true to stop the move from being used */
	beforeMoveCallback?: (this: Battle, pokemon: Pokemon, target: Pokemon | null, move: ActiveMove) => boolean | void;
	beforeTurnCallback?: (this: Battle, pokemon: Pokemon, target: Pokemon) => void;
	damageCallback?: (this: Battle, pokemon: Pokemon, target: Pokemon) => number | false;

	onAfterHit?: CommonHandlers['VoidSourceMove'];
	onAfterSubDamage?: (this: Battle, damage: number, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
	onAfterMoveSecondarySelf?: CommonHandlers['VoidSourceMove'];
	onAfterMoveSecondary?: CommonHandlers['VoidMove'];
	onAfterMove?: CommonHandlers['VoidSourceMove'];

	/* Invoked by the global BasePower event (onEffect = true) */
	onBasePower?: CommonHandlers['ModifierSourceMove'];

	onEffectiveness?: (
		this: Battle, typeMod: number, target: Pokemon | null, type: string, move: ActiveMove
	) => number | void;
	onHit?: CommonHandlers['ResultMove'];
	onHitField?: CommonHandlers['ResultMove'];
	onHitSide?: (this: Battle, side: Side, source: Pokemon, move: ActiveMove) => boolean | null | "" | void;
	onModifyMove?: (this: Battle, move: ActiveMove, pokemon: Pokemon, target: Pokemon) => void;
	onMoveFail?: CommonHandlers['VoidMove'];
	onModifyType?: (this: Battle, move: ActiveMove, pokemon: Pokemon, target: Pokemon) => void;
	onPrepareHit?: CommonHandlers['ResultMove'];
	onTry?: CommonHandlers['ResultSourceMove'];
	onTryHit?: CommonHandlers['ExtResultSourceMove'];
	onTryHitField?: CommonHandlers['ResultMove'];
	onTryHitSide?: (this: Battle, side: Side, source: Pokemon, move: ActiveMove) => boolean | null | "" | void;
	onTryImmunity?: CommonHandlers['ResultMove'];
	onTryMove?: CommonHandlers['ResultSourceMove'];
	onUseMoveMessage?: CommonHandlers['VoidSourceMove'];
}

interface PureEffectEventMethods {
	durationCallback?: (this: Battle, target: Pokemon, source: Pokemon, effect: Effect | null) => number;
	onCopy?: (this: Battle, pokemon: Pokemon) => void;
	onEnd?: (this: Battle, target: Pokemon & Side & Field) => void;
	onRestart?: (this: Battle, target: Pokemon & Side & Field, source: Pokemon) => void;
	onStart?: (this: Battle, target: Pokemon & Side & Field, source: Pokemon, sourceEffect: Effect) => void;
}

interface EventMethods {
	onDamagingHit?: (this: Battle, damage: number, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
	onEmergencyExit?: (this: Battle, pokemon: Pokemon) => void;
	onAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onAfterHit?: MoveEventMethods['onAfterHit'];
	onAfterSetStatus?: (this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onAfterSubDamage?: MoveEventMethods['onAfterSubDamage'];
	onAfterSwitchInSelf?: (this: Battle, pokemon: Pokemon) => void;
	onAfterUseItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
	onAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onAfterMoveSecondarySelf?: MoveEventMethods['onAfterMoveSecondarySelf'];
	onAfterMoveSecondary?: MoveEventMethods['onAfterMoveSecondary'];
	onAfterMove?: MoveEventMethods['onAfterMove'];
	onAfterMoveSelf?: CommonHandlers['VoidSourceMove'];
	onAttract?: (this: Battle, target: Pokemon, source: Pokemon) => void;
	onAccuracy?: (
		this: Battle, accuracy: number, target: Pokemon, source: Pokemon, move: ActiveMove
	) => number | boolean | null | void;
	onBasePower?: CommonHandlers['ModifierSourceMove'];
	onBeforeFaint?: (this: Battle, pokemon: Pokemon, effect: Effect) => void;
	onBeforeMove?: CommonHandlers['VoidSourceMove'];
	onBeforeSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
	onBeforeSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
	onBeforeTurn?: (this: Battle, pokemon: Pokemon) => void;
	onBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onChargeMove?: CommonHandlers['VoidSourceMove'];
	onCriticalHit?: ((this: Battle, pokemon: Pokemon, source: null, move: ActiveMove) => boolean | void) | boolean;
	onDamage?: (
		this: Battle, damage: number, target: Pokemon, source: Pokemon, effect: Effect
	) => number | boolean | null | void;
	onDeductPP?: (this: Battle, target: Pokemon, source: Pokemon) => number | void;
	onDisableMove?: (this: Battle, pokemon: Pokemon) => void;
	onDragOut?: (this: Battle, pokemon: Pokemon, source?: Pokemon, move?: ActiveMove) => void;
	onEatItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
	onEffectiveness?: MoveEventMethods['onEffectiveness'];
	onFaint?: CommonHandlers['VoidEffect'];
	onFlinch?: ((this: Battle, pokemon: Pokemon) => boolean | void) | boolean;
	onFractionalPriority?: CommonHandlers['ModifierSourceMove'];
	onHit?: MoveEventMethods['onHit'];
	onImmunity?: (this: Battle, type: string, pokemon: Pokemon) => void;
	onLockMove?: string | ((this: Battle, pokemon: Pokemon) => void | string);
	onMaybeTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
	onModifyAccuracy?: CommonHandlers['ModifierMove'];
	onModifyAtk?: CommonHandlers['ModifierSourceMove'];
	onModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Pokemon) => SparseBoostsTable | void;
	onModifyCritRatio?: CommonHandlers['ModifierSourceMove'];
	onModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onModifyDef?: CommonHandlers['ModifierMove'];
	onModifyMove?: MoveEventMethods['onModifyMove'];
	onModifyPriority?: CommonHandlers['ModifierSourceMove'];
	onModifySecondaries?: (
		this: Battle, secondaries: SecondaryEffect[], target: Pokemon, source: Pokemon, move: ActiveMove
	) => void;
	onModifyType?: MoveEventMethods['onModifyType'];
	onModifySpA?: CommonHandlers['ModifierSourceMove'];
	onModifySpD?: CommonHandlers['ModifierMove'];
	onModifySpe?: (this: Battle, spe: number, pokemon: Pokemon) => number | void;
	onModifyWeight?: (this: Battle, weighthg: number, pokemon: Pokemon) => number | void;
	onMoveAborted?: CommonHandlers['VoidMove'];
	onNegateImmunity?: ((this: Battle, pokemon: Pokemon, type: string) => boolean | void) | boolean;
	onOverrideAction?: (this: Battle, pokemon: Pokemon, target: Pokemon, move: ActiveMove) => string | void;
	onPrepareHit?: CommonHandlers['ResultSourceMove'];
	onRedirectTarget?: (
		this: Battle, target: Pokemon, source: Pokemon, source2: Effect, move: ActiveMove
	) => Pokemon | void;
	onResidual?: (this: Battle, target: Pokemon & Side, source: Pokemon, effect: Effect) => void;
	onSetAbility?: (this: Battle, ability: string, target: Pokemon, source: Pokemon, effect: Effect) => boolean | void;
	onSetStatus?: (
		this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, effect: Effect
	) => boolean | null | void;
	onSetWeather?: (this: Battle, target: Pokemon, source: Pokemon, weather: PureEffect) => boolean | void;
	onStallMove?: (this: Battle, pokemon: Pokemon) => boolean | void;
	onSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
	onSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
	onSwap?: (this: Battle, target: Pokemon, source: Pokemon) => void;
	onTakeItem?: (
		(this: Battle, item: Item, pokemon: Pokemon, source: Pokemon, move?: ActiveMove) => boolean | void
	) | boolean;
	onTerrain?: (this: Battle, pokemon: Pokemon) => void;
	onTerrainStart?: (this: Battle, target: Pokemon, source: Pokemon, terrain: PureEffect) => void;
	onWeatherStart?: (this: Battle, target: Pokemon, source: Pokemon, weather: PureEffect) => void;
	onTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
	onTryAddVolatile?: (
		this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, sourceEffect: Effect
	) => boolean | null | void;
	onTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Pokemon) => boolean | void);
	/* FIXME: onTryHeal() is run with two different sets of arguments */
	onTryHeal?: (
		((this: Battle, relayVar: number, target: Pokemon, source: Pokemon, effect: Effect) => number | boolean | void) |
		((this: Battle, pokemon: Pokemon) => boolean | void) | boolean
	);
	onTryHit?: MoveEventMethods['onTryHit'];
	onTryHitField?: MoveEventMethods['onTryHitField'];
	onTryHitSide?: CommonHandlers['ResultMove'];
	onInvulnerability?: CommonHandlers['ExtResultMove'];
	onTryMove?: MoveEventMethods['onTryMove'];
	onTryPrimaryHit?: (this: Battle, target: Pokemon, source: Pokemon, move: ActiveMove) => boolean | null | number | void;
	onType?: (this: Battle, types: string[], pokemon: Pokemon) => string[] | void;
	onUpdate?: (this: Battle, pokemon: Pokemon) => void;
	onWeather?: (this: Battle, target: Pokemon, source: null, effect: PureEffect) => void;
	onWeatherModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onModifyDamagePhase1?: CommonHandlers['ModifierSourceMove'];
	onModifyDamagePhase2?: CommonHandlers['ModifierSourceMove'];
	onAllyDamagingHit?: (this: Battle, damage: number, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
	onAllyAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon) => void;
	onAllyAfterHit?: MoveEventMethods['onAfterHit'];
	onAllyAfterSetStatus?: (this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onAllyAfterSubDamage?: MoveEventMethods['onAfterSubDamage'];
	onAllyAfterSwitchInSelf?: (this: Battle, pokemon: Pokemon) => void;
	onAllyAfterUseItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
	onAllyAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onAllyAfterMoveSecondarySelf?: MoveEventMethods['onAfterMoveSecondarySelf'];
	onAllyAfterMoveSecondary?: MoveEventMethods['onAfterMoveSecondary'];
	onAllyAfterMove?: MoveEventMethods['onAfterMove'];
	onAllyAfterMoveSelf?: CommonHandlers['VoidSourceMove'];
	onAllyAttract?: (this: Battle, target: Pokemon, source: Pokemon) => void;
	onAllyAccuracy?: (
		this: Battle, accuracy: number, target: Pokemon, source: Pokemon, move: ActiveMove
	) => number | boolean | null | void;
	onAllyBasePower?: CommonHandlers['ModifierSourceMove'];
	onAllyBeforeFaint?: (this: Battle, pokemon: Pokemon, effect: Effect) => void;
	onAllyBeforeMove?: CommonHandlers['VoidSourceMove'];
	onAllyBeforeSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
	onAllyBeforeSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
	onAllyBeforeTurn?: (this: Battle, pokemon: Pokemon) => void;
	onAllyBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onAllyChargeMove?: CommonHandlers['VoidSourceMove'];
	onAllyCriticalHit?: ((this: Battle, pokemon: Pokemon, source: null, move: ActiveMove) => boolean | void) | boolean;
	onAllyDamage?: (
		this: Battle, damage: number, target: Pokemon, source: Pokemon, effect: Effect
	) => number | boolean | null | void;
	onAllyDeductPP?: (this: Battle, target: Pokemon, source: Pokemon) => number | void;
	onAllyDisableMove?: (this: Battle, pokemon: Pokemon) => void;
	onAllyDragOut?: (this: Battle, pokemon: Pokemon, source?: Pokemon, move?: ActiveMove) => void;
	onAllyEatItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
	onAllyEffectiveness?: MoveEventMethods['onEffectiveness'];
	onAllyFaint?: CommonHandlers['VoidEffect'];
	onAllyFlinch?: ((this: Battle, pokemon: Pokemon) => boolean | void) | boolean;
	onAllyHit?: MoveEventMethods['onHit'];
	onAllyImmunity?: (this: Battle, type: string, pokemon: Pokemon) => void;
	onAllyLockMove?: string | ((this: Battle, pokemon: Pokemon) => void | string);
	onAllyMaybeTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
	onAllyModifyAccuracy?: CommonHandlers['ModifierMove'];
	onAllyModifyAtk?: CommonHandlers['ModifierSourceMove'];
	onAllyModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Pokemon) => SparseBoostsTable | void;
	onAllyModifyCritRatio?: CommonHandlers['ModifierSourceMove'];
	onAllyModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onAllyModifyDef?: CommonHandlers['ModifierMove'];
	onAllyModifyMove?: MoveEventMethods['onModifyMove'];
	onAllyModifyPriority?: CommonHandlers['ModifierSourceMove'];
	onAllyModifySecondaries?: (
		this: Battle, secondaries: SecondaryEffect[], target: Pokemon, source: Pokemon, move: ActiveMove
	) => void;
	onAllyModifySpA?: CommonHandlers['ModifierSourceMove'];
	onAllyModifySpD?: CommonHandlers['ModifierMove'];
	onAllyModifySpe?: (this: Battle, spe: number, pokemon: Pokemon) => number | void;
	onAllyModifyType?: MoveEventMethods['onModifyType'];
	onAllyModifyWeight?: (this: Battle, weighthg: number, pokemon: Pokemon) => number | void;
	onAllyMoveAborted?: CommonHandlers['VoidMove'];
	onAllyNegateImmunity?: ((this: Battle, pokemon: Pokemon, type: string) => boolean | void) | boolean;
	onAllyOverrideAction?: (this: Battle, pokemon: Pokemon, target: Pokemon, move: ActiveMove) => string | void;
	onAllyPrepareHit?: CommonHandlers['ResultSourceMove'];
	onAllyRedirectTarget?: (
		this: Battle, target: Pokemon, source: Pokemon, source2: Effect, move: ActiveMove
	) => Pokemon | void;
	onAllyResidual?: (this: Battle, target: Pokemon & Side, source: Pokemon, effect: Effect) => void;
	onAllySetAbility?: (this: Battle, ability: string, target: Pokemon, source: Pokemon, effect: Effect) => boolean | void;
	onAllySetStatus?: (
		this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, effect: Effect
	) => boolean | null | void;
	onAllySetWeather?: (this: Battle, target: Pokemon, source: Pokemon, weather: PureEffect) => boolean | void;
	onAllyStallMove?: (this: Battle, pokemon: Pokemon) => boolean | void;
	onAllySwitchIn?: (this: Battle, pokemon: Pokemon) => void;
	onAllySwitchOut?: (this: Battle, pokemon: Pokemon) => void;
	onAllyTakeItem?: (
		(this: Battle, item: Item, pokemon: Pokemon, source: Pokemon, move?: ActiveMove) => boolean | void
	) | boolean;
	onAllyTerrain?: (this: Battle, pokemon: Pokemon) => void;
	onAllyTerrainStart?: (this: Battle, target: Pokemon, source: Pokemon, terrain: PureEffect) => void;
	onAllyWeatherStart?: (this: Battle, target: Pokemon, source: Pokemon, weather: PureEffect) => void;
	onAllyTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
	onAllyTryAddVolatile?: (
		this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, sourceEffect: Effect
	) => boolean | null | void;
	onAllyTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Pokemon) => boolean | void);
	/* FIXME: onAllyTryHeal() is run with two different sets of arguments */
	onAllyTryHeal?: (
		((this: Battle, relayVar: number, target: Pokemon, source: Pokemon, effect: Effect) => number | boolean | void) |
		((this: Battle, pokemon: Pokemon) => boolean | void) | boolean
	);
	onAllyTryHit?: MoveEventMethods['onTryHit'];
	onAllyTryHitField?: MoveEventMethods['onTryHitField'];
	onAllyTryHitSide?: CommonHandlers['ResultMove'];
	onAllyInvulnerability?: CommonHandlers['ExtResultMove'];
	onAllyTryMove?: MoveEventMethods['onTryMove'];
	onAllyTryPrimaryHit?: (
		this: Battle, target: Pokemon, source: Pokemon, move: ActiveMove
	) => boolean | null | number | void;
	onAllyType?: (this: Battle, types: string[], pokemon: Pokemon) => string[] | void;
	onAllyUpdate?: (this: Battle, pokemon: Pokemon) => void;
	onAllyWeather?: (this: Battle, target: Pokemon, source: null, effect: PureEffect) => void;
	onAllyWeatherModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onAllyModifyDamagePhase1?: CommonHandlers['ModifierSourceMove'];
	onAllyModifyDamagePhase2?: CommonHandlers['ModifierSourceMove'];
	onFoeDamagingHit?: (this: Battle, damage: number, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
	onFoeAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon) => void;
	onFoeAfterHit?: MoveEventMethods['onAfterHit'];
	onFoeAfterSetStatus?: (this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onFoeAfterSubDamage?: MoveEventMethods['onAfterSubDamage'];
	onFoeAfterSwitchInSelf?: (this: Battle, pokemon: Pokemon) => void;
	onFoeAfterUseItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
	onFoeAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onFoeAfterMoveSecondarySelf?: MoveEventMethods['onAfterMoveSecondarySelf'];
	onFoeAfterMoveSecondary?: MoveEventMethods['onAfterMoveSecondary'];
	onFoeAfterMove?: MoveEventMethods['onAfterMove'];
	onFoeAfterMoveSelf?: CommonHandlers['VoidSourceMove'];
	onFoeAttract?: (this: Battle, target: Pokemon, source: Pokemon) => void;
	onFoeAccuracy?: (
		this: Battle, accuracy: number, target: Pokemon, source: Pokemon, move: ActiveMove
	) => number | boolean | null | void;
	onFoeBasePower?: CommonHandlers['ModifierSourceMove'];
	onFoeBeforeFaint?: (this: Battle, pokemon: Pokemon, effect: Effect) => void;
	onFoeBeforeMove?: CommonHandlers['VoidSourceMove'];
	onFoeBeforeSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
	onFoeBeforeSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
	onFoeBeforeTurn?: (this: Battle, pokemon: Pokemon) => void;
	onFoeBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onFoeChargeMove?: CommonHandlers['VoidSourceMove'];
	onFoeCriticalHit?: ((this: Battle, pokemon: Pokemon, source: null, move: ActiveMove) => boolean | void) | boolean;
	onFoeDamage?: (
		this: Battle, damage: number, target: Pokemon, source: Pokemon, effect: Effect
	) => number | boolean | null | void;
	onFoeDeductPP?: (this: Battle, target: Pokemon, source: Pokemon) => number | void;
	onFoeDisableMove?: (this: Battle, pokemon: Pokemon) => void;
	onFoeDragOut?: (this: Battle, pokemon: Pokemon, source?: Pokemon, move?: ActiveMove) => void;
	onFoeEatItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
	onFoeEffectiveness?: MoveEventMethods['onEffectiveness'];
	onFoeFaint?: CommonHandlers['VoidEffect'];
	onFoeFlinch?: ((this: Battle, pokemon: Pokemon) => boolean | void) | boolean;
	onFoeHit?: MoveEventMethods['onHit'];
	onFoeImmunity?: (this: Battle, type: string, pokemon: Pokemon) => void;
	onFoeLockMove?: string | ((this: Battle, pokemon: Pokemon) => void | string);
	onFoeMaybeTrapPokemon?: (this: Battle, pokemon: Pokemon, source?: Pokemon) => void;
	onFoeModifyAccuracy?: CommonHandlers['ModifierMove'];
	onFoeModifyAtk?: CommonHandlers['ModifierSourceMove'];
	onFoeModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Pokemon) => SparseBoostsTable | void;
	onFoeModifyCritRatio?: CommonHandlers['ModifierSourceMove'];
	onFoeModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onFoeModifyDef?: CommonHandlers['ModifierMove'];
	onFoeModifyMove?: MoveEventMethods['onModifyMove'];
	onFoeModifyPriority?: CommonHandlers['ModifierSourceMove'];
	onFoeModifySecondaries?: (
		this: Battle, secondaries: SecondaryEffect[], target: Pokemon, source: Pokemon, move: ActiveMove
	) => void;
	onFoeModifySpA?: CommonHandlers['ModifierSourceMove'];
	onFoeModifySpD?: CommonHandlers['ModifierMove'];
	onFoeModifySpe?: (this: Battle, spe: number, pokemon: Pokemon) => number | void;
	onFoeModifyType?: MoveEventMethods['onModifyType'];
	onFoeModifyWeight?: (this: Battle, weighthg: number, pokemon: Pokemon) => number | void;
	onFoeMoveAborted?: CommonHandlers['VoidMove'];
	onFoeNegateImmunity?: ((this: Battle, pokemon: Pokemon, type: string) => boolean | void) | boolean;
	onFoeOverrideAction?: (this: Battle, pokemon: Pokemon, target: Pokemon, move: ActiveMove) => string | void;
	onFoePrepareHit?: CommonHandlers['ResultSourceMove'];
	onFoeRedirectTarget?: (
		this: Battle, target: Pokemon, source: Pokemon, source2: Effect, move: ActiveMove
	) => Pokemon | void;
	onFoeResidual?: (this: Battle, target: Pokemon & Side, source: Pokemon, effect: Effect) => void;
	onFoeSetAbility?: (this: Battle, ability: string, target: Pokemon, source: Pokemon, effect: Effect) => boolean | void;
	onFoeSetStatus?: (
		this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, effect: Effect
	) => boolean | null | void;
	onFoeSetWeather?: (this: Battle, target: Pokemon, source: Pokemon, weather: PureEffect) => boolean | void;
	onFoeStallMove?: (this: Battle, pokemon: Pokemon) => boolean | void;
	onFoeSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
	onFoeSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
	onFoeTakeItem?: (
		(this: Battle, item: Item, pokemon: Pokemon, source: Pokemon, move?: ActiveMove) => boolean | void
	) | boolean;
	onFoeTerrain?: (this: Battle, pokemon: Pokemon) => void;
	onFoeTerrainStart?: (this: Battle, target: Pokemon, source: Pokemon, terrain: PureEffect) => void;
	onFoeWeatherStart?: (this: Battle, target: Pokemon, source: Pokemon, weather: PureEffect) => void;
	onFoeTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
	onFoeTryAddVolatile?: (
		this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, sourceEffect: Effect
	) => boolean | null | void;
	onFoeTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Pokemon) => boolean | void);
	/* FIXME: onFoeTryHeal() is run with two different sets of arguments */
	onFoeTryHeal?: (
		((this: Battle, relayVar: number, target: Pokemon, source: Pokemon, effect: Effect) => number | boolean | void) |
		((this: Battle, pokemon: Pokemon) => boolean | void) | boolean
	);
	onFoeTryHit?: MoveEventMethods['onTryHit'];
	onFoeTryHitField?: MoveEventMethods['onTryHitField'];
	onFoeTryHitSide?: CommonHandlers['ResultMove'];
	onFoeInvulnerability?: CommonHandlers['ExtResultMove'];
	onFoeTryMove?: MoveEventMethods['onTryMove'];
	onFoeTryPrimaryHit?: (
		this: Battle, target: Pokemon, source: Pokemon, move: ActiveMove
	) => boolean | null | number | void;
	onFoeType?: (this: Battle, types: string[], pokemon: Pokemon) => string[] | void;
	onFoeUpdate?: (this: Battle, pokemon: Pokemon) => void;
	onFoeWeather?: (this: Battle, target: Pokemon, source: null, effect: PureEffect) => void;
	onFoeWeatherModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onFoeModifyDamagePhase1?: CommonHandlers['ModifierSourceMove'];
	onFoeModifyDamagePhase2?: CommonHandlers['ModifierSourceMove'];
	onSourceDamagingHit?: (this: Battle, damage: number, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
	onSourceAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon) => void;
	onSourceAfterHit?: MoveEventMethods['onAfterHit'];
	onSourceAfterSetStatus?: (this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onSourceAfterSubDamage?: MoveEventMethods['onAfterSubDamage'];
	onSourceAfterSwitchInSelf?: (this: Battle, pokemon: Pokemon) => void;
	onSourceAfterUseItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
	onSourceAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onSourceAfterMoveSecondarySelf?: MoveEventMethods['onAfterMoveSecondarySelf'];
	onSourceAfterMoveSecondary?: MoveEventMethods['onAfterMoveSecondary'];
	onSourceAfterMove?: MoveEventMethods['onAfterMove'];
	onSourceAfterMoveSelf?: CommonHandlers['VoidSourceMove'];
	onSourceAttract?: (this: Battle, target: Pokemon, source: Pokemon) => void;
	onSourceAccuracy?: (
		this: Battle, accuracy: number, target: Pokemon, source: Pokemon, move: ActiveMove
	) => number | boolean | null | void;
	onSourceBasePower?: CommonHandlers['ModifierSourceMove'];
	onSourceBeforeFaint?: (this: Battle, pokemon: Pokemon, effect: Effect) => void;
	onSourceBeforeMove?: CommonHandlers['VoidSourceMove'];
	onSourceBeforeSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
	onSourceBeforeSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
	onSourceBeforeTurn?: (this: Battle, pokemon: Pokemon) => void;
	onSourceBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onSourceChargeMove?: CommonHandlers['VoidSourceMove'];
	onSourceCriticalHit?: ((this: Battle, pokemon: Pokemon, source: null, move: ActiveMove) => boolean | void) | boolean;
	onSourceDamage?: (
		this: Battle, damage: number, target: Pokemon, source: Pokemon, effect: Effect
	) => number | boolean | null | void;
	onSourceDeductPP?: (this: Battle, target: Pokemon, source: Pokemon) => number | void;
	onSourceDisableMove?: (this: Battle, pokemon: Pokemon) => void;
	onSourceDragOut?: (this: Battle, pokemon: Pokemon, source?: Pokemon, move?: ActiveMove) => void;
	onSourceEatItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
	onSourceEffectiveness?: MoveEventMethods['onEffectiveness'];
	onSourceFaint?: CommonHandlers['VoidEffect'];
	onSourceFlinch?: ((this: Battle, pokemon: Pokemon) => boolean | void) | boolean;
	onSourceHit?: MoveEventMethods['onHit'];
	onSourceImmunity?: (this: Battle, type: string, pokemon: Pokemon) => void;
	onSourceLockMove?: string | ((this: Battle, pokemon: Pokemon) => void | string);
	onSourceMaybeTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
	onSourceModifyAccuracy?: CommonHandlers['ModifierMove'];
	onSourceModifyAtk?: CommonHandlers['ModifierSourceMove'];
	onSourceModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Pokemon) => SparseBoostsTable | void;
	onSourceModifyCritRatio?: CommonHandlers['ModifierSourceMove'];
	onSourceModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onSourceModifyDef?: CommonHandlers['ModifierMove'];
	onSourceModifyMove?: MoveEventMethods['onModifyMove'];
	onSourceModifyPriority?: CommonHandlers['ModifierSourceMove'];
	onSourceModifySecondaries?: (
		this: Battle, secondaries: SecondaryEffect[], target: Pokemon, source: Pokemon, move: ActiveMove
	) => void;
	onSourceModifySpA?: CommonHandlers['ModifierSourceMove'];
	onSourceModifySpD?: CommonHandlers['ModifierMove'];
	onSourceModifySpe?: (this: Battle, spe: number, pokemon: Pokemon) => number | void;
	onSourceModifyType?: MoveEventMethods['onModifyType'];
	onSourceModifyWeight?: (this: Battle, weighthg: number, pokemon: Pokemon) => number | void;
	onSourceMoveAborted?: CommonHandlers['VoidMove'];
	onSourceNegateImmunity?: ((this: Battle, pokemon: Pokemon, type: string) => boolean | void) | boolean;
	onSourceOverrideAction?: (this: Battle, pokemon: Pokemon, target: Pokemon, move: ActiveMove) => string | void;
	onSourcePrepareHit?: CommonHandlers['ResultSourceMove'];
	onSourceRedirectTarget?: (
		this: Battle, target: Pokemon, source: Pokemon, source2: Effect, move: ActiveMove
	) => Pokemon | void;
	onSourceResidual?: (this: Battle, target: Pokemon & Side, source: Pokemon, effect: Effect) => void;
	onSourceSetAbility?: (
		this: Battle, ability: string, target: Pokemon, source: Pokemon, effect: Effect
	) => boolean | void;
	onSourceSetStatus?: (
		this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, effect: Effect
	) => boolean | null | void;
	onSourceSetWeather?: (this: Battle, target: Pokemon, source: Pokemon, weather: PureEffect) => boolean | void;
	onSourceStallMove?: (this: Battle, pokemon: Pokemon) => boolean | void;
	onSourceSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
	onSourceSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
	onSourceTakeItem?: (
		(this: Battle, item: Item, pokemon: Pokemon, source: Pokemon, move?: ActiveMove) => boolean | void
	) | boolean;
	onSourceTerrain?: (this: Battle, pokemon: Pokemon) => void;
	onSourceTerrainStart?: (this: Battle, target: Pokemon, source: Pokemon, terrain: PureEffect) => void;
	onSourceWeatherStart?: (this: Battle, target: Pokemon, source: Pokemon, weather: PureEffect) => void;
	onSourceTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
	onSourceTryAddVolatile?: (
		this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, sourceEffect: Effect
	) => boolean | null | void;
	onSourceTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Pokemon) => boolean | void);
	/* FIXME: onSourceTryHeal() is run with two different sets of arguments */
	onSourceTryHeal?: (
		((this: Battle, relayVar: number, target: Pokemon, source: Pokemon, effect: Effect) => number | boolean | void) |
		((this: Battle, pokemon: Pokemon) => boolean | void) | boolean
	);
	onSourceTryHit?: MoveEventMethods['onTryHit'];
	onSourceTryHitField?: MoveEventMethods['onTryHitField'];
	onSourceTryHitSide?: CommonHandlers['ResultMove'];
	onSourceInvulnerability?: CommonHandlers['ExtResultMove'];
	onSourceTryMove?: MoveEventMethods['onTryMove'];
	onSourceTryPrimaryHit?: (
		this: Battle, target: Pokemon, source: Pokemon, move: ActiveMove
	) => boolean | null | number | void;
	onSourceType?: (this: Battle, types: string[], pokemon: Pokemon) => string[] | void;
	onSourceUpdate?: (this: Battle, pokemon: Pokemon) => void;
	onSourceWeather?: (this: Battle, target: Pokemon, source: null, effect: PureEffect) => void;
	onSourceWeatherModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onSourceModifyDamagePhase1?: CommonHandlers['ModifierSourceMove'];
	onSourceModifyDamagePhase2?: CommonHandlers['ModifierSourceMove'];
	onAnyDamagingHit?: (this: Battle, damage: number, target: Pokemon, source: Pokemon, move: ActiveMove) => void;
	onAnyAfterEachBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon) => void;
	onAnyAfterHit?: MoveEventMethods['onAfterHit'];
	onAnyAfterSetStatus?: (this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onAnyAfterSubDamage?: MoveEventMethods['onAfterSubDamage'];
	onAnyAfterSwitchInSelf?: (this: Battle, pokemon: Pokemon) => void;
	onAnyAfterUseItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
	onAnyAfterBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onAnyAfterMoveSecondarySelf?: MoveEventMethods['onAfterMoveSecondarySelf'];
	onAnyAfterMoveSecondary?: MoveEventMethods['onAfterMoveSecondary'];
	onAnyAfterMove?: MoveEventMethods['onAfterMove'];
	onAnyAfterMoveSelf?: CommonHandlers['VoidSourceMove'];
	onAnyAttract?: (this: Battle, target: Pokemon, source: Pokemon) => void;
	onAnyAccuracy?: (
		this: Battle, accuracy: number, target: Pokemon, source: Pokemon, move: ActiveMove
	) => number | boolean | null | void;
	onAnyBasePower?: CommonHandlers['ModifierSourceMove'];
	onAnyBeforeFaint?: (this: Battle, pokemon: Pokemon, effect: Effect) => void;
	onAnyBeforeMove?: CommonHandlers['VoidSourceMove'];
	onAnyBeforeSwitchIn?: (this: Battle, pokemon: Pokemon) => void;
	onAnyBeforeSwitchOut?: (this: Battle, pokemon: Pokemon) => void;
	onAnyBeforeTurn?: (this: Battle, pokemon: Pokemon) => void;
	onAnyBoost?: (this: Battle, boost: SparseBoostsTable, target: Pokemon, source: Pokemon, effect: Effect) => void;
	onAnyChargeMove?: CommonHandlers['VoidSourceMove'];
	onAnyCriticalHit?: ((this: Battle, pokemon: Pokemon, source: null, move: ActiveMove) => boolean | void) | boolean;
	onAnyDamage?: (
		this: Battle, damage: number, target: Pokemon, source: Pokemon, effect: Effect
	) => number | boolean | null | void;
	onAnyDeductPP?: (this: Battle, target: Pokemon, source: Pokemon) => number | void;
	onAnyDisableMove?: (this: Battle, pokemon: Pokemon) => void;
	onAnyDragOut?: (this: Battle, pokemon: Pokemon, source?: Pokemon, move?: ActiveMove) => void;
	onAnyEatItem?: (this: Battle, item: Item, pokemon: Pokemon) => void;
	onAnyEffectiveness?: MoveEventMethods['onEffectiveness'];
	onAnyFaint?: CommonHandlers['VoidEffect'];
	onAnyFlinch?: ((this: Battle, pokemon: Pokemon) => boolean | void) | boolean;
	onAnyHit?: MoveEventMethods['onHit'];
	onAnyImmunity?: (this: Battle, type: string, pokemon: Pokemon) => void;
	onAnyLockMove?: string | ((this: Battle, pokemon: Pokemon) => void | string);
	onAnyMaybeTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
	onAnyModifyAccuracy?: CommonHandlers['ModifierMove'];
	onAnyModifyAtk?: CommonHandlers['ModifierSourceMove'];
	onAnyModifyBoost?: (this: Battle, boosts: SparseBoostsTable, pokemon: Pokemon) => SparseBoostsTable | void;
	onAnyModifyCritRatio?: CommonHandlers['ModifierSourceMove'];
	onAnyModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onAnyModifyDef?: CommonHandlers['ModifierMove'];
	onAnyModifyMove?: MoveEventMethods['onModifyMove'];
	onAnyModifyPriority?: CommonHandlers['ModifierSourceMove'];
	onAnyModifySecondaries?: (
		this: Battle, secondaries: SecondaryEffect[], target: Pokemon, source: Pokemon, move: ActiveMove
	) => void;
	onAnyModifySpA?: CommonHandlers['ModifierSourceMove'];
	onAnyModifySpD?: CommonHandlers['ModifierMove'];
	onAnyModifySpe?: (this: Battle, spe: number, pokemon: Pokemon) => number | void;
	onAnyModifyType?: MoveEventMethods['onModifyType'];
	onAnyModifyWeight?: (this: Battle, weighthg: number, pokemon: Pokemon) => number | void;
	onAnyMoveAborted?: CommonHandlers['VoidMove'];
	onAnyNegateImmunity?: ((this: Battle, pokemon: Pokemon, type: string) => boolean | void) | boolean;
	onAnyOverrideAction?: (this: Battle, pokemon: Pokemon, target: Pokemon, move: ActiveMove) => string | void;
	onAnyPrepareHit?: CommonHandlers['ResultSourceMove'];
	onAnyRedirectTarget?: (
		this: Battle, target: Pokemon, source: Pokemon, source2: Effect, move: ActiveMove
	) => Pokemon | void;
	onAnyResidual?: (this: Battle, target: Pokemon & Side, source: Pokemon, effect: Effect) => void;
	onAnySetAbility?: (this: Battle, ability: string, target: Pokemon, source: Pokemon, effect: Effect) => boolean | void;
	onAnySetStatus?: (
		this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, effect: Effect
	) => boolean | null | void;
	onAnySetWeather?: (this: Battle, target: Pokemon, source: Pokemon, weather: PureEffect) => boolean | void;
	onAnyStallMove?: (this: Battle, pokemon: Pokemon) => boolean | void;
	onAnySwitchIn?: (this: Battle, pokemon: Pokemon) => void;
	onAnySwitchOut?: (this: Battle, pokemon: Pokemon) => void;
	onAnyTakeItem?: (
		(this: Battle, item: Item, pokemon: Pokemon, source: Pokemon, move?: ActiveMove) => boolean | void
	) | boolean;
	onAnyTerrain?: (this: Battle, pokemon: Pokemon) => void;
	onAnyTerrainStart?: (this: Battle, target: Pokemon, source: Pokemon, terrain: PureEffect) => void;
	onAnyWeatherStart?: (this: Battle, target: Pokemon, source: Pokemon, weather: PureEffect) => void;
	onAnyTrapPokemon?: (this: Battle, pokemon: Pokemon) => void;
	onAnyTryAddVolatile?: (
		this: Battle, status: PureEffect, target: Pokemon, source: Pokemon, sourceEffect: Effect
	) => boolean | null | void;
	onAnyTryEatItem?: boolean | ((this: Battle, item: Item, pokemon: Pokemon) => boolean | void);
	/* FIXME: onAnyTryHeal() is run with two different sets of arguments */
	onAnyTryHeal?: (
		((this: Battle, relayVar: number, target: Pokemon, source: Pokemon, effect: Effect) => number | boolean | void) |
		((this: Battle, pokemon: Pokemon) => boolean | void) | boolean
	);
	onAnyTryHit?: MoveEventMethods['onTryHit'];
	onAnyTryHitField?: MoveEventMethods['onTryHitField'];
	onAnyTryHitSide?: CommonHandlers['ResultMove'];
	onAnyInvulnerability?: CommonHandlers['ExtResultMove'];
	onAnyTryMove?: MoveEventMethods['onTryMove'];
	onAnyTryPrimaryHit?: (
		this: Battle, target: Pokemon, source: Pokemon, move: ActiveMove
	) => boolean | null | number | void;
	onAnyType?: (this: Battle, types: string[], pokemon: Pokemon) => string[] | void;
	onAnyUpdate?: (this: Battle, pokemon: Pokemon) => void;
	onAnyWeather?: (this: Battle, target: Pokemon, source: null, effect: PureEffect) => void;
	onAnyWeatherModifyDamage?: CommonHandlers['ModifierSourceMove'];
	onAnyModifyDamagePhase1?: CommonHandlers['ModifierSourceMove'];
	onAnyModifyDamagePhase2?: CommonHandlers['ModifierSourceMove'];

	// Priorities (incomplete list)
	onAccuracyPriority?: number;
	onDamagingHitOrder?: number;
	onAfterMoveSecondaryPriority?: number;
	onAfterMoveSecondarySelfPriority?: number;
	onAfterMoveSelfPriority?: number;
	onAnyBasePowerPriority?: number;
	onAnyInvulnerabilityPriority?: number;
	onAnyFaintPriority?: number;
	onAllyBasePowerPriority?: number;
	onAllyModifyAtkPriority?: number;
	onAttractPriority?: number;
	onBasePowerPriority?: number;
	onBeforeMovePriority?: number;
	onBeforeSwitchOutPriority?: number;
	onBoostPriority?: number;
	onDamagePriority?: number;
	onDragOutPriority?: number;
	onFoeBasePowerPriority?: number;
	onFoeBeforeMovePriority?: number;
	onFoeModifyDefPriority?: number;
	onFoeRedirectTargetPriority?: number;
	onFoeTrapPokemonPriority?: number;
	onFractionalPriorityPriority?: number;
	onHitPriority?: number;
	onModifyAccuracyPriority?: number;
	onModifyAtkPriority?: number;
	onModifyCritRatioPriority?: number;
	onModifyDefPriority?: number;
	onModifyMovePriority?: number;
	onModifyPriorityPriority?: number;
	onModifySpAPriority?: number;
	onModifySpDPriority?: number;
	onModifyTypePriority?: number;
	onModifyWeightPriority?: number;
	onRedirectTargetPriority?: number;
	onResidualOrder?: number;
	onResidualPriority?: number;
	onResidualSubOrder?: number;
	onSourceBasePowerPriority?: number;
	onSourceInvulnerabilityPriority?: number;
	onSourceModifyAtkPriority?: number;
	onSourceModifySpAPriority?: number;
	onSwitchInPriority?: number;
	onTrapPokemonPriority?: number;
	onTryHealPriority?: number;
	onTryHitPriority?: number;
	onTryMovePriority?: number;
	onTryPrimaryHitPriority?: number;
	onTypePriority?: number;
}

type BaseEffectData = import('@pkmn/types').EffectData;
interface EffectData extends BaseEffectData {
	effect?: Partial<PureEffect>;
	secondary?: SecondaryEffect | null;
	secondaries?: SecondaryEffect[] | null;
	self?: SelfEffect | null;

	durationCallback?: (this: Battle, target: Pokemon, source: Pokemon, effect: Effect | null) => number;
	onRestart?: (this: Battle, target: Pokemon & Side & Field, source: Pokemon) => void;
}

interface ModdedEffectData extends Partial<EffectData> {
	inherit?: boolean;
}

type EffectType = import('@pkmn/types').EffectType;

interface BasicEffect extends EffectData {
	id: ID;
	weather?: ID;
	status?: ID;
	effectType: EffectType;
	exists: boolean;
	fullname: string;
	gen: number;
	sourceEffect: string;
	toString: () => string;
}

interface PureEffectData extends EffectData, PureEffectEventMethods, EventMethods, EffectData {
}

interface ModdedPureEffectData extends Partial<PureEffectData>, ModdedEffectData {}

interface PureEffect extends Readonly<BasicEffect & PureEffectData> {
	readonly effectType: 'Status' | 'Effect' | 'Weather';
}

interface AbilityData extends EffectData, AbilityEventMethods, EventMethods {
	rating: number;
	isUnbreakable?: boolean;
	suppressWeather?: boolean;
}

interface ModdedAbilityData extends Partial<AbilityData>, ModdedEffectData {
	onAfterMega?: (this: Battle, pokemon: Pokemon) => void;
}

interface Ability extends Readonly<BasicEffect & AbilityData> {
	readonly effectType: 'Ability';
}

type BaseFlingData = import('@pkmn/types').FlingData;
interface FlingData extends BaseFlingData {
	effect?: MoveEventMethods['onHit'];
}

interface ItemData extends EffectData, ItemEventMethods, EventMethods {
	gen: number;
	fling?: FlingData;
	forcedForme?: string;
	ignoreKlutz?: boolean;
	isBerry?: boolean;
	isChoice?: boolean;
	isGem?: boolean;
	isPokeball?: boolean;
	megaStone?: string;
	megaEvolves?: string;
	naturalGift?: {basePower: number, type: string};
	onDrive?: string;
	onMemory?: string;
	onPlate?: string;
	spritenum?: number;
	zMove?: string | true;
	zMoveFrom?: string;
	zMoveType?: string;
	itemUser?: string[];
	boosts?: SparseBoostsTable | false;
}

interface ModdedItemData extends Partial<ItemData>, ModdedEffectData {
	onCustap?: (this: Battle, pokemon: Pokemon) => void;
}

interface Item extends Readonly<BasicEffect & ItemData> {
	readonly effectType: 'Item';
}

type MoveCategory = import('@pkmn/types').MoveCategory;
interface MoveData extends EffectData, MoveEventMethods {
	accuracy: true | number;
	basePower: number;
	category: MoveCategory;
	flags: AnyObject;
	pp: number;
	priority: number;
	target: MoveTarget;
	type: string;
	alwaysHit?: boolean;
	baseMoveType?: string;
	basePowerModifier?: number;
	boosts?: SparseBoostsTable | false;
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
	ignoreImmunity?: boolean | {[k: string]: boolean};
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
	selfBoost?: {boosts?: SparseBoostsTable};
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
	/**
	 * Tracks the original target through Ally Switch and other switch-out-and-back-in
	 * situations, rather than just targeting a slot. (Stalwart, Snipe Shot)
	 */
	tracksTarget?: boolean;
	/**
	 * Will change target if current target is unavailable. (Dragon Darts)
	 */
	smartTarget?: boolean;
	useTargetOffensive?: boolean;
	useSourceDefensiveAsOffensive?: boolean;
	volatileStatus?: string;
	weather?: string;
	willCrit?: boolean;
	forceSTAB?: boolean;
	zMovePower?: number;
	zMoveEffect?: string;
	zMoveBoost?: SparseBoostsTable;
	gmaxPower?: number;
	basePowerCallback?: (this: Battle, pokemon: Pokemon, target: Pokemon, move: ActiveMove) => number | false | null;
	baseMove?: string;
	/**
	 * Has this move been boosted by a Z-crystal? Usually the same as
	 * `isZ`, but hacked moves will have this be `false` and `isZ` be
	 * truthy.
	 */
	isZPowered?: boolean;
	/**
	 * Same idea has `isZPowered`. Hacked Max moves will have this be
	 * `false` and `isMax` be truthy.
	 */
	maxPowered?: boolean;
}

interface ModdedMoveData extends Partial<MoveData>, ModdedEffectData {}

interface Move extends Readonly<BasicEffect & MoveData> {
	readonly effectType: 'Move';
}

interface MoveHitData {
	[targetSlotid: string]: {
		/** Did this move crit against the target? */
		crit: boolean,
		/** The type effectiveness of this move against the target */
		typeMod: number,
		/**
		 * Is this move a Z-Move that broke the target's protection?
		 * (does 0.25x regular damage)
		 */
		zBrokeProtect: boolean,
	};
}

interface ActiveMove extends BasicEffect, MoveData {
	readonly effectType: 'Move';
	id: ID;
	weather?: ID;
	status?: ID;
	hit: number;
	moveHitData?: MoveHitData;
	ability?: Ability;
	aerilateBoosted?: boolean;
	allies?: Pokemon[];
	auraBooster?: Pokemon;
	causedCrashDamage?: boolean;
	forceStatus?: ID;
	galvanizeBoosted?: boolean;
	hasAuraBreak?: boolean;
	hasBounced?: boolean;
	hasSheerForce?: boolean;
	/** Is the move called by Dancer? Used to prevent infinite Dancer recursion. */
	isExternal?: boolean;
	lastHit?: boolean;
	magnitude?: number;
	negateSecondary?: boolean;
	normalizeBoosted?: boolean;
	pixilateBoosted?: boolean;
	pranksterBoosted?: boolean;
	refrigerateBoosted?: boolean;
	selfDropped?: boolean;
	selfSwitch?: ID | boolean;
	spreadHit?: boolean;
	stab?: number;
	statusRoll?: string;
	totalDamage?: number | false;
	willChangeForme?: boolean;
	infiltrates?: boolean;
}

type TemplateAbility = import('@pkmn/types').TemplateAbility;
type BaseTemplateData = import('@pkmn/types').TemplateData;
interface TemplateData extends Omit<BaseTemplateData, 'gender'> {
	gender?: GenderName;
}
interface ModdedTemplateData extends Partial<TemplateData> {
	inherit?: true;
}
type BaseTemplateFormatsData = import('@pkmn/types').TemplateFormatsData;
interface TemplateFormatsData extends BaseTemplateFormatsData {
	comboMoves?: readonly string[];
	essentialMove?: string;
	exclusiveMoves?: readonly string[];
	randomBattleMoves?: readonly string[];
	randomDoubleBattleMoves?: readonly string[];
	randomSets?: readonly RandomTeamsTypes.Gen2RandomSet[];

}
interface ModdedTemplateFormatsData extends Partial<TemplateFormatsData> {
	inherit?: true;
}
type LearnsetData = import('@pkmn/types').LearnsetData;
type ModdedLearnsetData = import('@pkmn/types').ModdedLearnsetData;

type Template = import('./dex-data').Template;

type GameType = import('@pkmn/types').GameType;
type SideID = import('@pkmn/types').Player;

type GameTimerSettings = import('@pkmn/types').GameTimerSettings;
interface FormatsData extends EventMethods {
	name: string;
	banlist?: string[];
	battle?: ModdedBattleScriptsData;
	pokemon?: ModdedBattlePokemon;
	cannotMega?: string[];
	challengeShow?: boolean;
	debug?: boolean;
	defaultLevel?: number;
	desc?: string;
	effectType?: string;
	forcedLevel?: number;
	gameType?: GameType;
	maxForcedLevel?: number;
	maxLevel?: number;
	mod?: string;
	onBasePowerPriority?: number;
	onModifyMovePriority?: number;
	onModifyTypePriority?: number;
	onSwitchInPriority?: number;
	rated?: boolean;
	minSourceGen?: number;
	restricted?: string[];
	ruleset?: string[];
	searchShow?: boolean;
	team?: string;
	teamLength?: {validate?: [number, number], battle?: number};
	threads?: string[];
	timer?: Partial<GameTimerSettings>;
	tournamentShow?: boolean;
	unbanlist?: string[];
	checkLearnset?: (
		this: TeamValidator, move: Move, template: Template, setSources: PokemonSources, set: PokemonSet
	) => {type: string, [any: string]: any} | null;
	onAfterMega?: (this: Battle, pokemon: Pokemon) => void;
	onBegin?: (this: Battle) => void;
	onChangeSet?: (
		this: TeamValidator, set: PokemonSet, format: Format, setHas?: AnyObject, teamHas?: AnyObject
	) => string[] | void;
	onModifyTemplate?: (
		this: Battle, template: Template, target?: Pokemon, source?: Pokemon, effect?: Effect
	) => Template | void;
	onStart?: (this: Battle) => void;
	onTeamPreview?: (this: Battle) => void;
	onValidateSet?: (
		this: TeamValidator, set: PokemonSet, format: Format, setHas: AnyObject, teamHas: AnyObject
	) => string[] | void;
	onValidateTeam?: (this: TeamValidator, team: PokemonSet[], format: Format, teamHas: AnyObject) => string[] | void;
	validateSet?: (this: TeamValidator, set: PokemonSet, teamHas: AnyObject) => string[] | null;
	validateTeam?: (this: TeamValidator, team: PokemonSet[], options?: {
		removeNicknames?: boolean,
		skipSets?: {[name: string]: {[key: string]: boolean}},
	}) => string[] | void;
	trunc?: (n: number) => number;
	section?: string;
	column?: number;
}

interface ModdedFormatsData extends Partial<FormatsData> {
	inherit?: boolean;
}

interface Format extends Readonly<BasicEffect & FormatsData> {
	readonly effectType: 'Format' | 'Ruleset' | 'Rule' | 'ValidatorRule';
	readonly baseRuleset: string[];
	readonly banlist: string[];
	readonly customRules: string[] | null;
	readonly defaultLevel: number;
	readonly maxLevel: number;
	readonly noLog: boolean;
	readonly ruleset: string[];
	readonly unbanlist: string[];
	ruleTable: import('./dex-data').RuleTable | null;
}

type SpreadMoveTargets = (Pokemon | false | null)[];
type SpreadMoveDamage = (number | boolean | undefined)[];
type ZMoveOptions = import('@pkmn/types').ZMoveOptions;
type DynamaxOptions = import('@pkmn/types').DynamaxOptions;

interface BattleScriptsData {
	gen: number;
	zMoveTable?: {[k: string]: string};
	maxMoveTable?: {[k: string]: string};
	afterMoveSecondaryEvent?: (this: Battle, targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) => undefined;
	calcRecoilDamage?: (this: Battle, damageDealt: number, move: Move) => number;
	canMegaEvo?: (this: Battle, pokemon: Pokemon) => string | undefined | null;
	canUltraBurst?: (this: Battle, pokemon: Pokemon) => string | null;
	canZMove?: (this: Battle, pokemon: Pokemon) => ZMoveOptions | void;
	canDynamax?: (this: Battle, pokemon: Pokemon, skipChecks?: boolean) => DynamaxOptions | void;
	forceSwitch?: (
		this: Battle, damage: SpreadMoveDamage, targets: SpreadMoveTargets, source: Pokemon,
		move: ActiveMove, moveData: ActiveMove, isSecondary?: boolean, isSelf?: boolean
	) => SpreadMoveDamage;
	getActiveMaxMove?: (this: Battle, move: Move, pokemon: Pokemon) => ActiveMove;
	getActiveZMove?: (this: Battle, move: Move, pokemon: Pokemon) => ActiveMove;
	getMaxMove?: (this: Battle, move: Move, pokemon: Pokemon) => Move | undefined;
	getSpreadDamage?: (
		this: Battle, damage: SpreadMoveDamage, targets: SpreadMoveTargets, source: Pokemon,
		move: ActiveMove, moveData: ActiveMove, isSecondary?: boolean, isSelf?: boolean
	) => SpreadMoveDamage;
	getZMove?: (this: Battle, move: Move, pokemon: Pokemon, skipChecks?: boolean) => string | undefined;
	hitStepAccuracy?: (this: Battle, targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) => boolean[];
	hitStepBreakProtect?: (this: Battle, targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) => undefined;
	hitStepMoveHitLoop?: (this: Battle, targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) => SpreadMoveDamage;
	hitStepTryImmunity?: (this: Battle, targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) => boolean[];
	hitStepStealBoosts?: (this: Battle, targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) => undefined;
	hitStepTryHitEvent?: (this: Battle, targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) => (boolean | '')[];
	hitStepInvulnerabilityEvent?: (this: Battle, targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) => boolean[];
	hitStepTypeImmunity?: (this: Battle, targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) => boolean[];
	isAdjacent?: (this: Battle, pokemon1: Pokemon, pokemon2: Pokemon) => boolean;
	moveHit?: (
		this: Battle, target: Pokemon | null, pokemon: Pokemon, move: ActiveMove,
		moveData?: ActiveMove, isSecondary?: boolean, isSelf?: boolean
	) => number | undefined | false;
	runAction?: (this: Battle, action: Action) => void;
	runMegaEvo?: (this: Battle, pokemon: Pokemon) => boolean;
	runMove?: (
		this: Battle, moveOrMoveName: Move | string, pokemon: Pokemon, targetLoc: number, sourceEffect?: Effect | null,
		zMove?: string, externalMove?: boolean, maxMove?: string, originalTarget?: Pokemon
	) => void;
	runMoveEffects?: (
		this: Battle, damage: SpreadMoveDamage, targets: SpreadMoveTargets, source: Pokemon,
		move: ActiveMove, moveData: ActiveMove, isSecondary?: boolean, isSelf?: boolean
	) => SpreadMoveDamage;
	runZPower?: (this: Battle, move: ActiveMove, pokemon: Pokemon) => void;
	secondaries?: (
		this: Battle, targets: SpreadMoveTargets, source: Pokemon, move: ActiveMove, moveData: ActiveMove, isSelf?: boolean
	) => void;
	selfDrops?: (
		this: Battle, targets: SpreadMoveTargets, source: Pokemon,
		move: ActiveMove, moveData: ActiveMove, isSecondary?: boolean
	) => void;
	spreadMoveHit?: (
		this: Battle, targets: SpreadMoveTargets, pokemon: Pokemon, move: ActiveMove,
		moveData?: ActiveMove, isSecondary?: boolean, isSelf?: boolean
	) => [SpreadMoveDamage, SpreadMoveTargets];
	targetTypeChoices?: (this: Battle, targetType: string) => boolean;
	tryMoveHit?: (this: Battle, target: Pokemon, pokemon: Pokemon, move: ActiveMove) => number | undefined | false | '';
	tryPrimaryHitEvent?: (
		this: Battle, damage: SpreadMoveDamage, targets: SpreadMoveTargets, pokemon: Pokemon,
		move: ActiveMove, moveData: ActiveMove, isSecondary?: boolean
	) => SpreadMoveDamage;
	trySpreadMoveHit?: (this: Battle, targets: Pokemon[], pokemon: Pokemon, move: ActiveMove) => boolean;
	useMove?: (
		this: Battle, move: Move, pokemon: Pokemon, target?: Pokemon | null,
		sourceEffect?: Effect | null, zMove?: string, maxMove?: string
	) => boolean;
	useMoveInner?: (
		this: Battle, move: Move, pokemon: Pokemon, target?: Pokemon | null,
		sourceEffect?: Effect | null, zMove?: string, maxMove?: string
	) => boolean;
}

interface ModdedBattleSide {
	lastMove?: Move | null;
}

interface ModdedBattlePokemon {
	inherit?: boolean;
	boostBy?: (this: Pokemon, boost: SparseBoostsTable) => boolean | number;
	calculateStat?: (this: Pokemon, statName: StatNameExceptHP, boost: number, modifier?: number) => number;
	getAbility?: (this: Pokemon) => Ability;
	getActionSpeed?: (this: Pokemon) => number;
	getMoveRequestData?: (this: Pokemon) => {
		moves: {move: string, id: ID, target?: string, disabled?: boolean}[],
		maybeDisabled?: boolean, trapped?: boolean, maybeTrapped?: boolean,
		canMegaEvo?: boolean, canUltraBurst?: boolean, canZMove?: ZMoveOptions,
	};
	getStat?: (
		this: Pokemon, statName: StatNameExceptHP, unboosted?: boolean, unmodified?: boolean, fastReturn?: boolean
	) => number;
	getWeight?: (this: Pokemon) => number;
	hasAbility?: (this: Pokemon, ability: string | string[]) => boolean;
	isGrounded?: (this: Pokemon, negateImmunity: boolean | undefined) => boolean | null;
	modifyStat?: (this: Pokemon, statName: StatNameExceptHP, modifier: number) => void;
	moveUsed?: (this: Pokemon, move: Move, targetLoc?: number) => void;
	recalculateStats?: (this: Pokemon) => void;
	setAbility?: (
		this: Pokemon, ability: string | Ability, source: Pokemon | null, isFromFormeChange: boolean
	) => string | false;
	transformInto?: (this: Pokemon, pokemon: Pokemon, effect: Effect | null) => boolean;
	setStatus?: (
		this: Pokemon, status: string | PureEffect, source: Pokemon | null,
		sourceEffect: Effect | null, ignoreImmunities: boolean
	) => boolean;
	ignoringAbility?: (this: Pokemon) => boolean;
}

interface ModdedBattleScriptsData extends Partial<BattleScriptsData> {
	inherit?: string;
	lastDamage?: number;
	pokemon?: ModdedBattlePokemon;
	side?: ModdedBattleSide;
	boost?: (
		this: Battle, boost: SparseBoostsTable, target: Pokemon, source?: Pokemon | null,
		effect?: Effect | string | null, isSecondary?: boolean, isSelf?: boolean
	) => boolean | null | 0;
	debug?: (this: Battle, activity: string) => void;
	getDamage?: (
		this: Battle, pokemon: Pokemon, target: Pokemon, move: string | number | ActiveMove, suppressMessages: boolean
	) => number | undefined | null | false;
	getEffect?: (this: Battle, name: string | Effect | null) => Effect;
	init?: (this: ModdedDex) => void;
	modifyDamage?: (
		this: Battle, baseDamage: number, pokemon: Pokemon, target: Pokemon, move: ActiveMove, suppressMessages?: boolean
	) => void;
	natureModify?: (this: Battle, stats: StatsTable, set: PokemonSet) => StatsTable;
	spreadModify?: (this: Battle, baseStats: StatsTable, set: PokemonSet) => StatsTable;
	suppressingWeather?: (this: Battle) => boolean;

	// oms
	doGetMixedTemplate?: (this: Battle, template: Template, deltas: AnyObject) => Template;
	getMegaDeltas?: (this: Battle, megaSpecies: Template) => AnyObject;
	getMixedTemplate?: (this: Battle, originalSpecies: string, megaSpecies: string) => Template;
	getAbility?: (this: Battle, name: string | Ability) => Ability;
	getZMove?: (this: Battle, move: Move, pokemon: Pokemon, skipChecks?: boolean) => string | undefined;
	getActiveZMove?: (this: Battle, move: Move, pokemon: Pokemon) => ActiveMove;
	canZMove?: (this: Battle, pokemon: Pokemon) => ZMoveOptions | void;
}

type TypeData = import('@pkmn/types').TypeData;
type ModdedTypeData = import('@pkmn/types').ModdedTypeData;

type BaseTypeInfo = import('@pkmn/types').TypeInfo;

interface TypeInfo extends BaseTypeInfo {
	readonly toString: () => string;
}

type PlayerOptions = import('@pkmn/types').PlayerOptions;

namespace RandomTeamsTypes {
	export interface Gen2RandomSet {
		chance: number;
		item?: string[];
		baseMove1?: string;
		baseMove2?: string;
		baseMove3?: string;
		baseMove4?: string;
		fillerMoves1?: string[];
		fillerMoves2?: string[];
		fillerMoves3?: string[];
		fillerMoves4?: string[];
	}
}

interface PokemonModData {
	gluttonyFlag?: boolean; // Gen-NEXT
	innate?: string; // Partners in Crime
	originalSpecies?: string; // Mix and Mega
	[key: string]: any;
}
