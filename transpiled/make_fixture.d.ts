export declare const make_fixture: {
    start_builder_chain: {
        for_data_type: <T_data extends Record<string, any> | _T_help_message_for_data_type = "ERROR: Explicit generic is missing! Should be something like: for_data_type<{...}>()">(..._warning: T_data extends _T_help_message_for_data_type ? [_T_help_message_for_data_type, never] : []) => {
            with_possible_tags: <T_tags extends (string | _T_help_message_with_possible_tags) = "ERROR: Explicit generic is missing! Should be something like: with_possible_tags<['example', 'demo', 'tip']>()">(..._warning: T_tags extends _T_help_message_with_possible_tags | "" ? [_T_help_message_with_possible_tags, never] : []) => {
                data_can_be_transformed_into_such_views: <T_transformer extends Record<string, (d: Partial<Exclude<T_data, "ERROR: Explicit generic is missing! Should be something like: for_data_type<{...}>()">>, ...params: any[]) => any>>(transformer: T_transformer) => {
                    build: <T_fixture_set extends Record<string, {
                        fixture: Partial<Exclude<T_data, "ERROR: Explicit generic is missing! Should be something like: for_data_type<{...}>()">>;
                        tags: Exclude<T_tags, "" | "ERROR: Explicit generic is missing! Should be something like: with_possible_tags<['example', 'demo', 'tip']>()">[];
                    }>>(fixture_set: T_fixture_set) => {
                        one_by_name: (name: keyof T_fixture_set) => {
                            as: { [k in keyof T_transformer]: (...params: FirstRest<Parameters<T_transformer[k]>>[1]) => () => ReturnType<T_transformer[k]>; };
                            add_to_more_tags: (...tag: Exclude<T_tags, "" | "ERROR: Explicit generic is missing! Should be something like: with_possible_tags<['example', 'demo', 'tip']>()">[]) => void;
                            remove_from_tags: (...tag: Exclude<T_tags, "" | "ERROR: Explicit generic is missing! Should be something like: with_possible_tags<['example', 'demo', 'tip']>()">[]) => void;
                            update_data_source: (update_logic: (d: Partial<Exclude<T_data, "ERROR: Explicit generic is missing! Should be something like: for_data_type<{...}>()">>) => Partial<Exclude<T_data, "ERROR: Explicit generic is missing! Should be something like: for_data_type<{...}>()">>) => void;
                        };
                        many_with_tag: (tag: Exclude<T_tags, "" | "ERROR: Explicit generic is missing! Should be something like: with_possible_tags<['example', 'demo', 'tip']>()">) => {
                            as: { [k in keyof T_transformer]: (...params: FirstRest<Parameters<T_transformer[k]>>[1]) => () => ReturnType<T_transformer[k]>[]; };
                            foreach_update_data_source: (update_logic: (d: Partial<Exclude<T_data, "ERROR: Explicit generic is missing! Should be something like: for_data_type<{...}>()">>) => Partial<Exclude<T_data, "ERROR: Explicit generic is missing! Should be something like: for_data_type<{...}>()">>) => void;
                        };
                    };
                };
            };
        };
    };
};
type FirstRest<T> = T extends [infer First, ...infer Rest] ? [First, Rest] : never;
type _T_help_message_for_data_type = "ERROR: Explicit generic is missing! Should be something like: for_data_type<{...}>()";
type _T_help_message_with_possible_tags = "ERROR: Explicit generic is missing! Should be something like: with_possible_tags<['example', 'demo', 'tip']>()";
export {};
//# sourceMappingURL=make_fixture.d.ts.map