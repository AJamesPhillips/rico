import * as React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import JobCard from './JobCard';
import actions from '../../actions';

let Jobs = ({
  jobs,
  initiateJob
}) => {
  return (
    <Row>
      {jobs.map(job => {
        return (
          <Col md={2} key={job.id}>
            <JobCard
            taken={job.taken}
            title={job.title}
            incentive={job.incentive}
            key={job.id}
            onClick={() => {
              initiateJob(job);
            }}
            />
          </Col>
        );
      })}
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initiateJob: (job) => {
      if (job.taken) {
        return;
      }

      dispatch(actions.takeJob(job.id));

      dispatch(actions.setActiveJob(job.title));

      dispatch(actions.startJobPhase());

      if (job.incentive > 0) {
        dispatch(actions.modifyDoubloons(job.incentive));
        dispatch(actions.disincentivizeTakenJob(job.id));
      }

      if (job.title === 'prospector') {
        dispatch(actions.modifyDoubloons(1));

        dispatch(actions.jobHasResolved());
      }

      if (job.title === 'mayor') {
        dispatch(actions.assignColonists());
      }

      if (job.title === 'craftsman') {
        dispatch(actions.resolveCrafting());
        dispatch(actions.showCraftingModal());
        // wait until crafting modal resolves
        // dispatch(actions.jobHasResolved());
      }
    }
  };
};

Jobs = connect(
  mapStateToProps,
  mapDispatchToProps
)(Jobs);

export default Jobs;
