import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Panel from 'react-bootstrap/lib/Panel';

const Job = ({
  onClick,
  taken,
  title,
  incentive
}) => {
  return (
    <Panel>
      <h3>{title}</h3>
      {!taken
        ? <Button onClick={onClick}>Take {incentive ? '(+'+incentive+' Doubloons)' : ''}</Button>
        : <Button disabled>Taken</Button>}
    </Panel>
  );
};

class Jobs extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnMount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    return (
        <Row>
          {state.jobs.map(job => {
            return (
              <Col md={2} key={job.id}>
                <Job
                taken={job.taken}
                title={job.title}
                incentive={job.incentive}
                key={job.id}
                onClick={() => {
                  if (!job.taken) {
                    initiateJob(job, store);
                  }
                }}
                />
              </Col>
            );
          })}
        </Row>
    );
  }
}
Jobs.contextTypes = {
  store: React.PropTypes.object
};

const initiateJob = (job, store) => {
  let currentPlayerTurnIndex = store.getState().turns.findIndex(player => player.currentPlayer);
  let currentPlayerID = store.getState().turns.find(player => player.currentPlayer).playerID;

  store.dispatch({
    type: 'TAKE_JOB',
    id: job.id,
    takenBy: currentPlayerID
  });

  store.dispatch({
    type: 'START_JOB_PHASE',
    playerTurns: store.getState().turns,
    currentPlayerTurnIndex
  });

  if (job.incentive > 0) {
    store.dispatch({
      type: 'MODIFY_DOUBLOONS',
      id: currentPlayerID,
      doubloons: job.incentive
    });

    store.dispatch({
      type: 'DISINCENTIVIZE_TAKEN_JOB',
      id: job.id
    });
  }

  store.dispatch({
    type: 'PLAYER_JOB_PICKED',
    playerID: currentPlayerID,
    jobID: job.id
  });

  if (job.title === 'prospector') {
    store.dispatch({
      type: 'MODIFY_DOUBLOONS',
      id: currentPlayerID,
      doubloons: 1
    });

    jobHasResolved(store);
  }
};

const jobHasResolved = (store) => {
  let currentPlayerTurnIndex = store.getState().turns.findIndex(player => player.currentPlayer);

  store.dispatch({
    type: 'END_JOB_PHASE'
  });

  store.dispatch({
    type: 'NEXT_TURN',
    currentPlayerIndex: currentPlayerTurnIndex
  });

  // the next player doesn't exist in the array which means we're done with this round
  if (currentPlayerTurnIndex + 1 === store.getState().turns.length) {
    store.dispatch({
      type: 'NEXT_ROUND'
    });

    store.dispatch({
      type: 'INCENTIVIZE_UNTAKEN_JOBS'
    });

    store.dispatch({
      type: 'RESET_JOBS'
    });
  }

  const currentPlayer = store.getState().turns.find(player => player.currentPlayer)
  const key = store.getState().boards.findIndex(player => currentPlayer.playerID === player.id);

  store.dispatch({
    type: 'UPDATE_ACTIVE_PLAYER_TAB',
    key: key
  });
};


export { Jobs, jobHasResolved }


