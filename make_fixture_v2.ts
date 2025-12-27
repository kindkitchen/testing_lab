type FirstSecondThirdRest<T> = T extends
  [infer First, infer Second, infer Third, ...infer Rest] ? {
    First: First;
    Second: Second;
    Third: Third;
    Rest: Rest;
  }
  : never;

export const make_fixture = <
  T extends FirstSecondThirdRest<[
    DATA: Record<string, unknown>,
    UNIQUE_GETTER:
      | Record<
        string,
        (
          predicate: (param: Partial<T[number]["First"]>) => boolean,
        ) => Partial<T[number]["First"]>
      >
      | null,
    STATE_COMPUTER: Record<
      string,
      (data: Partial<T[number]["First"]>) => Partial<T[number]["First"]>
    >,
    ...LABELS: string[],
  ]>[],
>(...variants: T) => {
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
