import * as React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import JobCard from './JobCard';
import { initiateJob } from './service';

class Jobs extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() =>
      this.forceUpdate()
    );
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
              <JobCard
              taken={job.taken}
              title={job.title}
              incentive={job.incentive}
              key={job.id}
              onClick={() => {
                initiateJob(job, store);
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

export default Jobs;
