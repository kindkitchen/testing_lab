"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.make_fixture = void 0;
exports.make_fixture = {
    /**
     * A lot of properties are syntax sugar with purpose
     * to simplify process of constructing pretty difficult
     * internal data-structure for fixture. Also it may
     * help to understand main ideas and purposes with which
     * it was developed.
     */
    start_builder_chain: {
        /**
         * The shape of the data source
         *
         * This type is represent the all values,
         * that can be used in dto, entities, models, etc.
         * which will be produced from same source.
         * Example:
         * The single data-set associated with user can be used
         * for user creation, user updates, view full or compact
         * user's representation, etc.
         * ```
         * make_fixture.for_data_type<{
         *   id: string;
         *   name: string;
         *   age: number;
         * }>() /// ...rest code
         * ```
         * #### Important!
         * **This is generic type, that you should provide and nothing more**
         */
        for_data_type: function () {
            var _warning = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _warning[_i] = arguments[_i];
            }
            return {
                /**
                 * Next generic only helper, that should extend
                 * `string` type, for example:
                 * ```
                 * .with_possible_tags<"all", "verified_only", "men">
                 * ```
                 * These tags will be used to mark fixtures and so have ability
                 * to group them by some criteria. Because this is tag - fixture
                 * can be belong to many groups at once.
                 *
                 * **At this moment though - you should simply register all possible variants
                 * for better typescript inference**
                 */
                with_possible_tags: (function () {
                    var _warning = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        _warning[_i] = arguments[_i];
                    }
                    return {
                        /**
                         * This is object, in which each property is represented
                         * particular dto/entity/view or state of your data.
                         * For example data, associated with user can contain many
                         * properties, but during creation you skip `id` and so on.
                         * The value of each property is a function - that should
                         * transform initial data to some form.
                         * Example:
                         * ```
                         * {
                         *    create_user_dto: (data) => ({ : data.email }),
                         *    update_user_dto: (data) => ([data.id, ])
                         * }
                         * ```
                         */
                        data_can_be_transformed_into_such_views: function (transformer) {
                            return {
                                /**
                                 * Complete building fixture-set by providing
                                 * implementation.
                                 * Each property is fixture-wrapper, with fixture itself
                                 * and all tags associated with this fixture.
                                 */
                                build: function (fixture_set) {
                                    var last_id = Date.now();
                                    var db = Object
                                        .entries(fixture_set)
                                        .reduce(function (acc, _a) {
                                        var name = _a[0], _b = _a[1], fixture = _b.fixture, tags = _b.tags;
                                        var id = ++last_id;
                                        acc.id_fixture.set(id, fixture);
                                        acc.name_tag_fixture.set(name, new Map(tags.map(function (t) { return [t, id]; })));
                                        acc.name_fixture.set(name, id);
                                        for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                                            var tag = tags_1[_i];
                                            (acc.tag_name_fixture.get(tag) ||
                                                acc.tag_name_fixture.set(tag, new Map()).get(tag))
                                                .set(name, id);
                                        }
                                        return acc;
                                    }, {
                                        id_fixture: new Map(),
                                        name_fixture: new Map(),
                                        name_tag_fixture: new Map(),
                                        tag_name_fixture: new Map(),
                                    });
                                    return {
                                        one_by_name: function (name) { return ({
                                            add_to_more_tags: function () {
                                                var tags = [];
                                                for (var _i = 0; _i < arguments.length; _i++) {
                                                    tags[_i] = arguments[_i];
                                                }
                                                return tags.forEach(function (tag) {
                                                    var fixture = db.name_fixture.get(name); /// 100% exists because all fixtures are provided at once;
                                                    (db.name_tag_fixture.get(name) ||
                                                        db.name_tag_fixture.set(name, new Map())
                                                            .get(name))
                                                        .set(tag, fixture);
                                                    (db.tag_name_fixture.get(tag) ||
                                                        db.tag_name_fixture.set(tag, new Map()).get(tag))
                                                        .set(name, fixture);
                                                });
                                            },
                                            remove_from_tags: function () {
                                                var tags = [];
                                                for (var _i = 0; _i < arguments.length; _i++) {
                                                    tags[_i] = arguments[_i];
                                                }
                                                return tags.forEach(function (tag) {
                                                    db.name_tag_fixture.get(name).delete(tag);
                                                    db.tag_name_fixture.get(tag).delete(name);
                                                });
                                            },
                                            update_data_source: function (logic) {
                                                var id = db.name_fixture.get(name);
                                                var fixture = db.id_fixture.get(id);
                                                var fresh = logic(fixture);
                                                db.id_fixture.set(id, fresh);
                                            },
                                            as: Object.entries(transformer).reduce(function (acc, _a) {
                                                var k = _a[0], v = _a[1];
                                                acc[k] = function () {
                                                    var args = [];
                                                    for (var _i = 0; _i < arguments.length; _i++) {
                                                        args[_i] = arguments[_i];
                                                    }
                                                    return function () {
                                                        var id = db.name_fixture.get(name);
                                                        return v.apply(void 0, __spreadArray([db.id_fixture.get(id)], args, false));
                                                    };
                                                };
                                                return acc;
                                            }, {}),
                                        }); },
                                        many_with_tag: function (tag) { return ({
                                            as: Object.entries(transformer).reduce(function (acc, _a) {
                                                var k = _a[0], fn = _a[1];
                                                acc[k] = function () { return function () {
                                                    var args = [];
                                                    for (var _i = 0; _i < arguments.length; _i++) {
                                                        args[_i] = arguments[_i];
                                                    }
                                                    var views = (db.tag_name_fixture.get(tag) || [])
                                                        .values()
                                                        .toArray().map(function (id) {
                                                        return fn.apply(void 0, __spreadArray([db.id_fixture.get(id)], args, false));
                                                    });
                                                    return views;
                                                }; };
                                                return acc;
                                            }, {}),
                                            foreach_update_data_source: function (logic) {
                                                (db.tag_name_fixture.get(tag) ||
                                                    new Map()).entries()
                                                    .toArray()
                                                    .forEach(function (_a) {
                                                    var _ = _a[0], v = _a[1];
                                                    var fixture = db.id_fixture.get(v);
                                                    db.id_fixture.set(v, logic(fixture));
                                                });
                                            },
                                        }); },
                                    };
                                },
                            };
                        },
                    };
                }),
            };
        },
    },
};
//# sourceMappingURL=make_fixture.js.map