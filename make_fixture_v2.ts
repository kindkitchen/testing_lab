export const make_fixture = <
  T extends FirstSecondRest<[
    UNIQUE_GETTER:
      | Record<
        string,
        (
          predicate: (param: Partial<T["Rest"][number][0]>) => boolean,
        ) => Partial<T["Rest"][number][0]>
      >
      | null,
    STATE_COMPUTER: Record<
      string,
      (data: Partial<T["Rest"][number][0]>) => Partial<T["Rest"][number][0]>
    >,
    ...DATA_WITH_LABELS: [
      data: Record<string, unknown>,
      ...labels: string[],
    ][],
  ]>,
>(...variants: T) => {
  return {} as any;
};

/**
 * What I want to create?
 * 1. Dictionary
 *    - fixture - the whole bunch of terms, associated with same entity/model etc. All below is what each fixture should have
 *    - data - the object, from which values will be used for any state for. 1 data for 1 fixture
 *    - state - specific form/shape of the fixture. It should be deterministically generated from data and many states for 1 fixture
 *    - label - tag/marker, with which particular fixture can be associated and so be fetched by any of them. Fixture label elation is like many-to-many
 * 2. Data - it is shape-agnostic source of truth for any/all states into which it can be transformed/produces etc.
 *    - 1 fixture has 1 data and can generate many states from it
 *    - ability to explicitly modify this data for each fixture independently
 *    - ability to modify data for all by label
 * 3. State - derivation from data. So it is particular representation of the data. 1 fixture 1 data ++states
 *    - should be always computed, so if data is changed, the representation should be automatically recalculated on each retrieve
 */

type FirstSecondThird<T> = T extends [infer First, infer Second, infer Third]
  ? {
    First: First;
    Second: Second;
    Third: Third;
  }
  : never;

type FirstSecondRest<T> = T extends [infer First, infer Second, ...infer Rest]
  ? {
    First: First;
    Second: Second;
    Rest: Rest;
  }
  : never;
type FirstRest<T> = T extends [infer First, ...infer Rest] ? {
    First: First;
    Rest: Rest;
  }
  : never;
