import { createReactQueryHooks } from '@trpc/react';
import type { inferProcedureOutput } from '@trpc/server';
import type { AppRouter } from 'server/routers/app';
import superjson from 'superjson';
import devalue from 'devalue';

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/react#3-create-trpc-hooks
 */
export const trpc = createReactQueryHooks<AppRouter>();

// export const transformer = superjson;
/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<
  TRouteKey extends keyof AppRouter['_def']['queries'],
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;

export const transformer = {
  input: superjson,
  output: {
    serialize: (obj: any) => devalue(obj),
    deserialize: (obj: any) => eval(`(${obj})`),
  },
};
