import Motor from "common/models/Motor";
import Ratio from "common/models/Ratio";
import Qty from "js-quantities";
import { parse, stringify } from "query-string";
import {
  decodeObject,
  encodeObject,
  encodeQueryParams,
} from "use-query-params";

export function QtyToDict(qty) {
  return {
    s: qty.scalar,
    u: qty.units(),
  };
}

export function DictToQty(dict) {
  return Qty(Number(dict.s), dict.u);
}

export const QtyParam = {
  encode: (qty) => {
    return encodeObject(QtyToDict(qty));
  },
  decode: (str) => {
    return DictToQty(decodeObject(str));
  },
};

export class QueryableParamHolder {
  constructor(state, paramType) {
    this.paramType = paramType;
    this.name = Object.keys(state)[0];
    this.value = state[this.name];
  }
}

/**
 *
 * @param {QueryableParamHolder[]} queryableParamHolders
 */
export function stateToQueryString(queryableParamHolders) {
  const queryParams = Object.assign(
    ...queryableParamHolders.map((qph) => ({ [qph.name]: qph.paramType }))
  );
  const queryValues = Object.assign(
    ...queryableParamHolders.map((qph) => ({ [qph.name]: qph.value }))
  );
  return stringify(encodeQueryParams(queryParams, queryValues));
}

export function buildUrlForCurrentPage(queryString) {
  const base = window.location.origin + window.location.pathname;
  return `${base}?${queryString}`;
}

export function queryStringToDefaults(
  query,
  queryParams,
  defaults,
  conversionFn
) {
  const strings = parse(query);

  if (conversionFn === undefined) {
    Object.keys(strings).forEach((k) => {
      if (k !== "version") {
        Object.assign(defaults, { [k]: queryParams[k].decode(strings[k]) });
      }
    });
  } else {
    Object.assign(defaults, conversionFn(strings, queryParams));
  }

  return defaults;
}

export const MotorParam = Motor.getParam();
export const RatioParam = Ratio.getParam();
export { NumberParam } from "use-query-params";
