/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index.d.mts';
import type { Properties } from '../types/csstype.d.mts';
import type { SystemProperties } from '../types/style-props.d.mts';
import type { DistributiveOmit } from '../types/system-types.d.mts';
import type { Tokens } from '../tokens/index.d.mts';

export interface FloatProperties {
   offsetX?: ConditionalValue<Tokens["spacing"] | Properties["left"]>
	offsetY?: ConditionalValue<Tokens["spacing"] | Properties["top"]>
	offset?: ConditionalValue<Tokens["spacing"] | Properties["top"]>
	placement?: ConditionalValue<"bottom-end" | "bottom-start" | "top-end" | "top-start" | "bottom-center" | "top-center" | "middle-center" | "middle-end" | "middle-start">
}

interface FloatStyles extends FloatProperties, DistributiveOmit<SystemStyleObject, keyof FloatProperties > {}

interface FloatPatternFn {
  (styles?: FloatStyles): string
  raw: (styles?: FloatStyles) => SystemStyleObject
}


export declare const float: FloatPatternFn;
