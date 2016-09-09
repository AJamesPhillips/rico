const turns = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_TURNS':
      return action.players.map((player, index) => {
        return {
          playerID: player.id,
          currentPlayer: index === 0
        };
      });
    case 'NEXT_TURN':
      // there are still players left in the round
      if (action.currentPlayerIndex < state.length - 1) {
        return [
          ...state.slice(0, action.currentPlayerIndex),
          {
            ...state[action.currentPlayerIndex],
            currentPlayer: false
          },
          {
            ...state[action.currentPlayerIndex+1],
            currentPlayer: true
          },
          ...state.slice(action.currentPlayerIndex+2)
        ];
      }

      // we're at the end of the round
      return [
        ...state.slice(0, action.currentPlayerIndex),
        {
          ...state[action.currentPlayerIndex],
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

const jobTurns = (state = [], action) => {
  switch (action.type) {
    case 'START_JOB_PHASE':
      return [
        {
          ...action.playerTurns[action.currentPlayerTurnIndex],
          currentJobPlayer: true
        },
        ...action.playerTurns.slice(action.currentPlayerTurnIndex+1),
        ...action.playerTurns.slice(0, action.currentPlayerTurnIndex)
      ];
    case 'NEXT_JOB_TURN':
      // there are still players left in the job phase
      if (action.currentJobPlayerIndex < state.length - 1) {
        return [
          ...state.slice(0, action.currentJobPlayerIndex),
          {
            ...state[action.currentJobPlayerIndex],
            currentJobPlayer: false
          },
          {
            ...state[action.currentJobPlayerIndex+1],
            currentJobPlayer: true
          },
          ...state.slice(action.currentJobPlayerIndex+2)
        ];
      }
      // we're at the end of the round
      return [
        ...state.slice(0, action.currentJobPlayerIndex),
        {
          ...state[action.currentJobPlayerIndex],
          currentJobPlayer: false
        }
      ];
    case 'END_JOB_PHASE':
      return [];
    default:
      return state;
  }
};

const activePlayerTab = (state = 0, action) => {
  switch (action.type) {
    case 'UPDATE_ACTIVE_PLAYER_TAB':
      return action.key;
    default:
      return state;
  }
};

export { activePlayerTab, turns, jobTurns  }
