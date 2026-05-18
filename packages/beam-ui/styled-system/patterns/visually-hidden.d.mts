/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index.d.mts';
import type { Properties } from '../types/csstype.d.mts';
import type { SystemProperties } from '../types/style-props.d.mts';
import type { DistributiveOmit } from '../types/system-types.d.mts';
import type { Tokens } from '../tokens/index.d.mts';

export interface VisuallyHiddenProperties {
   
}

interface VisuallyHiddenStyles extends VisuallyHiddenProperties, DistributiveOmit<SystemStyleObject, keyof VisuallyHiddenProperties > {}

interface VisuallyHiddenPatternFn {
  (styles?: VisuallyHiddenStyles): string
  raw: (styles?: VisuallyHiddenStyles) => SystemStyleObject
}


export declare const visuallyHidden: VisuallyHiddenPatternFn;
