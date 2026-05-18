/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index.d.mts';
import type { Properties } from '../types/csstype.d.mts';
import type { SystemProperties } from '../types/style-props.d.mts';
import type { DistributiveOmit } from '../types/system-types.d.mts';
import type { Tokens } from '../tokens/index.d.mts';

export interface LinkOverlayProperties {
   
}

interface LinkOverlayStyles extends LinkOverlayProperties, DistributiveOmit<SystemStyleObject, keyof LinkOverlayProperties > {}

interface LinkOverlayPatternFn {
  (styles?: LinkOverlayStyles): string
  raw: (styles?: LinkOverlayStyles) => SystemStyleObject
}


export declare const linkOverlay: LinkOverlayPatternFn;
