/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index.d.mts';
import type { Properties } from '../types/csstype.d.mts';
import type { SystemProperties } from '../types/style-props.d.mts';
import type { DistributiveOmit } from '../types/system-types.d.mts';
import type { Tokens } from '../tokens/index.d.mts';

export interface GridProperties {
   gap?: SystemProperties["gap"]
	columnGap?: SystemProperties["gap"]
	rowGap?: SystemProperties["gap"]
	columns?: ConditionalValue<number>
	minChildWidth?: ConditionalValue<Tokens["sizes"] | Properties["width"]>
}

interface GridStyles extends GridProperties, DistributiveOmit<SystemStyleObject, keyof GridProperties > {}

interface GridPatternFn {
  (styles?: GridStyles): string
  raw: (styles?: GridStyles) => SystemStyleObject
}


export declare const grid: GridPatternFn;
