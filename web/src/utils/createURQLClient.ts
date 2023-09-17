import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import Router from "next/router";
import { Exchange, dedupExchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";
import {
  EnterExistingRoomMutation,
  EnterRoomMutation,
  LoginMutation,
  MeDocument,
  MeQuery,
  MyRoomDocument,
  MyRoomQuery,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { isServer } from "./isServer";

function invalidateMessages(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "messagesByRoom"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "messagesByRoom", fi.arguments || {});
  });
}

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/login");
        }
      })
    );
  };

export const createURQLClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? { cookie } : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            createMessage: (
              _result: any,
              args: any,
              cache: Cache,
              info: any
            ) => {
              invalidateMessages(cache);
            },
            login: (_result: any, _args: any, cache: Cache, info: any) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
              invalidateMessages(cache);
            },
            logout: (_result: any, args: any, cache: Cache, info: any) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            register: (_result: any, args: any, cache: Cache, info: any) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
            // enterExistingRoom: (
            //   _result: any,
            //   args: any,
            //   cache: Cache,
            //   info: any
            // ) => {
            //   betterUpdateQuery<EnterExistingRoomMutation, MyRoomQuery>(
            //     cache,
            //     { query: MyRoomDocument },
            //     _result,
            //     (result, query) => {
            //       if (result.enterExistingRoom.errors) {
            //         return query;
            //       } else {
            //         return {
            //           myRoom: result.enterExistingRoom.link,
            //         };
            //       }
            //     }
            //   );
            // },
            // enterRoom: (_result: any, args: any, cache: Cache, info: any) => {
            //   betterUpdateQuery<EnterRoomMutation, MyRoomQuery>(
            //     cache,
            //     { query: MyRoomDocument },
            //     _result,
            //     (result, query) => {
            //       if (result.enterRoom.errors) {
            //         return query;
            //       } else {
            //         return {
            //           myRoom: result.enterRoom.link,
            //         };
            //       }
            //     }
            //   );
            // },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
