
export function mapSubStateToSelectors<
    State extends {[index: string]: any},
    // StateKey === keyof State,
    // SubState === State[StateKey] === State[keyof State]
    Selectors extends {[index in keyof Selectors]: (state: State[keyof State], args: Parameters<Selectors[index]>[1]) => any},
    // ReturnedSelectors extends {[index in keyof Selectors]: (state: State) => ReturnType<Selectors[index]>}
  > (stateKey: keyof State, selectors: Selectors): {[index in keyof Selectors]: (state: State, args?: Parameters<Selectors[index]>[1]) => ReturnType<Selectors[index]>} {

  return Object.keys(selectors)
    .reduce((accum, selectorKey) => {
      accum[selectorKey] = (state: State, args: any) => {
        const subState = state[stateKey]
        return selectors[selectorKey](subState, args)
      }
      return accum
    }, {} as {[index in keyof Selectors]: (state: State, args: Parameters<Selectors[index]>[1]) => ReturnType<Selectors[index]>})
}
