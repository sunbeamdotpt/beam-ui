/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index.d.mts';
import type { Properties } from '../types/csstype.d.mts';
import type { SystemProperties } from '../types/style-props.d.mts';
import type { DistributiveOmit } from '../types/system-types.d.mts';
import type { Tokens } from '../tokens/index.d.mts';

export interface BoxProperties {
   
}

interface BoxStyles extends BoxProperties, DistributiveOmit<SystemStyleObject, keyof BoxProperties > {}

interface BoxPatternFn {
  (styles?: BoxStyles): string
  raw: (styles?: BoxStyles) => SystemStyleObject
}


export declare const box: BoxPatternFn;
