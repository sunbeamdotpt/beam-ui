/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index.d.mts';
import type { Properties } from '../types/csstype.d.mts';
import type { SystemProperties } from '../types/style-props.d.mts';
import type { DistributiveOmit } from '../types/system-types.d.mts';
import type { Tokens } from '../tokens/index.d.mts';

export interface CqProperties {
   name?: ConditionalValue<Tokens["containerNames"] | Properties["containerName"]>
	type?: SystemProperties["containerType"]
}

interface CqStyles extends CqProperties, DistributiveOmit<SystemStyleObject, keyof CqProperties > {}

interface CqPatternFn {
  (styles?: CqStyles): string
  raw: (styles?: CqStyles) => SystemStyleObject
}


export declare const cq: CqPatternFn;
