/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index.d.mts';
import type { Properties } from '../types/csstype.d.mts';
import type { SystemProperties } from '../types/style-props.d.mts';
import type { DistributiveOmit } from '../types/system-types.d.mts';
import type { Tokens } from '../tokens/index.d.mts';

export interface DividerProperties {
   orientation?: ConditionalValue<"horizontal" | "vertical">
	thickness?: ConditionalValue<Tokens["sizes"] | Properties["borderWidth"]>
	color?: ConditionalValue<Tokens["colors"] | Properties["borderColor"]>
}

interface DividerStyles extends DividerProperties, DistributiveOmit<SystemStyleObject, keyof DividerProperties > {}

interface DividerPatternFn {
  (styles?: DividerStyles): string
  raw: (styles?: DividerStyles) => SystemStyleObject
}


export declare const divider: DividerPatternFn;
