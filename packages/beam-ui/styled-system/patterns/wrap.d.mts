/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index.d.mts';
import type { Properties } from '../types/csstype.d.mts';
import type { SystemProperties } from '../types/style-props.d.mts';
import type { DistributiveOmit } from '../types/system-types.d.mts';
import type { Tokens } from '../tokens/index.d.mts';

export interface WrapProperties {
   gap?: SystemProperties["gap"]
	rowGap?: SystemProperties["gap"]
	columnGap?: SystemProperties["gap"]
	align?: SystemProperties["alignItems"]
	justify?: SystemProperties["justifyContent"]
}

interface WrapStyles extends WrapProperties, DistributiveOmit<SystemStyleObject, keyof WrapProperties > {}

interface WrapPatternFn {
  (styles?: WrapStyles): string
  raw: (styles?: WrapStyles) => SystemStyleObject
}


export declare const wrap: WrapPatternFn;
