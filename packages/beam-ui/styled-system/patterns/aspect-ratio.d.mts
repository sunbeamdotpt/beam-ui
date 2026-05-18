/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index.d.mts';
import type { Properties } from '../types/csstype.d.mts';
import type { SystemProperties } from '../types/style-props.d.mts';
import type { DistributiveOmit } from '../types/system-types.d.mts';
import type { Tokens } from '../tokens/index.d.mts';

export interface AspectRatioProperties {
   ratio?: ConditionalValue<number>
}

interface AspectRatioStyles extends AspectRatioProperties, DistributiveOmit<SystemStyleObject, keyof AspectRatioProperties | 'aspectRatio'> {}

interface AspectRatioPatternFn {
  (styles?: AspectRatioStyles): string
  raw: (styles?: AspectRatioStyles) => SystemStyleObject
}


export declare const aspectRatio: AspectRatioPatternFn;
