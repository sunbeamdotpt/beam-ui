/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index.d.mts';
import type { Properties } from '../types/csstype.d.mts';
import type { SystemProperties } from '../types/style-props.d.mts';
import type { DistributiveOmit } from '../types/system-types.d.mts';
import type { Tokens } from '../tokens/index.d.mts';

export interface SquareProperties {
   size?: SystemProperties["width"]
}

interface SquareStyles extends SquareProperties, DistributiveOmit<SystemStyleObject, keyof SquareProperties > {}

interface SquarePatternFn {
  (styles?: SquareStyles): string
  raw: (styles?: SquareStyles) => SystemStyleObject
}


export declare const square: SquarePatternFn;
