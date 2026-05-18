/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index.d.mts';
import type { Properties } from '../types/csstype.d.mts';
import type { SystemProperties } from '../types/style-props.d.mts';
import type { DistributiveOmit } from '../types/system-types.d.mts';
import type { Tokens } from '../tokens/index.d.mts';

export interface CenterProperties {
   inline?: ConditionalValue<boolean>
}

interface CenterStyles extends CenterProperties, DistributiveOmit<SystemStyleObject, keyof CenterProperties > {}

interface CenterPatternFn {
  (styles?: CenterStyles): string
  raw: (styles?: CenterStyles) => SystemStyleObject
}


export declare const center: CenterPatternFn;
