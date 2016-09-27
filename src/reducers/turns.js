export const turns = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_TURNS':
      return action.players.map((player, index) => {
        return {
          playerID: player.id,
          currentPlayer: index === 0
        };
      });
    case 'NEXT_TURN':
      const currentPlayerIndex = state.findIndex(player => player.currentPlayer);
      // there are still players left in the round
      if (currentPlayerIndex < state.length - 1) {
        return [
          ...state.slice(0, currentPlayerIndex),
          {
            ...state[currentPlayerIndex],
            currentPlayer: false
          },
          {
            ...state[currentPlayerIndex+1],
            currentPlayer: true
          },
          ...state.slice(currentPlayerIndex+2)
        ];
      }

      // we're at the end of the round
      return [
        ...state.slice(0, currentPlayerIndex),
        {
          ...state[currentPlayerIndex],
          currentPlayer: false
        }
      ];
    case 'NEXT_ROUND':
      // move first player to the back of the order,
      // make the previously second player governor
      return [
        {
          ...state[1],
          currentPlayer: true
        },
        ...state.slice(2),
        state[0]
      ];
    default:
      return state;
  }
};

export const jobTurns = (state = [], action) => {
  switch (action.type) {
    case 'START_JOB_PHASE':
      const currentPlayerTurnIndex = action.playerTurns.findIndex(p => p.currentPlayer);
      return [
        {
          ...action.playerTurns[currentPlayerTurnIndex],
          currentJobPlayer: true
        },
        ...action.playerTurns.slice(currentPlayerTurnIndex+1),
        ...action.playerTurns.slice(0, currentPlayerTurnIndex)
      ];
    case 'NEXT_JOB_TURN':
      const currentJobPlayerIndex = state.findIndex(p => p.currentJobPlayer);
      // there are still players left in the job phase
      if (currentJobPlayerIndex < state.length - 1) {
        return [
          ...state.slice(0, currentJobPlayerIndex),
          {
            ...state[currentJobPlayerIndex],
            currentJobPlayer: false
          },
          {
            ...state[currentJobPlayerIndex+1],
            currentJobPlayer: true
          },
          ...state.slice(currentJobPlayerIndex+2)
        ];
      }
      // we're at the end of the round
      return [
        ...state.slice(0, currentJobPlayerIndex),
        {
          ...state[currentJobPlayerIndex],
          currentJobPlayer: false
        }
      ];
    case 'END_JOB_PHASE':
      return [];
    default:
      return state;
  }
};
