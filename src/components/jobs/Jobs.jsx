import * as React from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import JobCard from './JobCard';
import { initiateJobs } from './service';

let Jobs = ({ jobs }) => {
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
              initiateJob(job, store);
            }}
            />
          </Col>
        );
      })}
    </Row>
  );
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs
  };
};

Jobs = connect(
  mapStateToProps,
  null
)(Jobs);


export default Jobs;
