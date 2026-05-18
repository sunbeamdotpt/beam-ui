/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index.d.mts';
import type { Properties } from '../types/csstype.d.mts';
import type { SystemProperties } from '../types/style-props.d.mts';
import type { DistributiveOmit } from '../types/system-types.d.mts';
import type { Tokens } from '../tokens/index.d.mts';

export interface SpacerProperties {
   size?: ConditionalValue<Tokens["spacing"]>
}

interface SpacerStyles extends SpacerProperties, DistributiveOmit<SystemStyleObject, keyof SpacerProperties > {}

interface SpacerPatternFn {
  (styles?: SpacerStyles): string
  raw: (styles?: SpacerStyles) => SystemStyleObject
}


export declare const spacer: SpacerPatternFn;
