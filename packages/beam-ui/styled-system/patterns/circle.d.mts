/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index.d.mts';
import type { Properties } from '../types/csstype.d.mts';
import type { SystemProperties } from '../types/style-props.d.mts';
import type { DistributiveOmit } from '../types/system-types.d.mts';
import type { Tokens } from '../tokens/index.d.mts';

export interface CircleProperties {
   size?: SystemProperties["width"]
}

interface CircleStyles extends CircleProperties, DistributiveOmit<SystemStyleObject, keyof CircleProperties > {}

interface CirclePatternFn {
  (styles?: CircleStyles): string
  raw: (styles?: CircleStyles) => SystemStyleObject
}


export declare const circle: CirclePatternFn;
