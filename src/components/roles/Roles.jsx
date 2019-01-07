import * as React from "react"
import { connect } from "react-redux"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import RoleCard from "./RoleCard"
import actions from "../../actions/index_original"
import { ROLE_TITLE_TO_DESCRIPTIONS } from "./constants"

const Roles = ({
  roles,
  takeRole
}) => {
  return (
    <Row>
      {roles.map(role => {
        return (
          <Col md={2} key={role.id}>
            <RoleCard
              taken={role.taken}
              title={role.title}
              description={ROLE_TITLE_TO_DESCRIPTIONS[role.title]}
              incentive={role.incentive}
              onClick={() => {
                takeRole(role)
              }}
            />
          </Col>
        )
      })}
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    roles: state.roles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    takeRole: (role) => {
      dispatch(actions.takeRole(role.id))
    //   if (job.taken) {
    //     return
    //   }

    //   dispatch(actions.takeJob(job.id))

    //   dispatch(actions.setActiveJob(job.title))

    //   dispatch(actions.startJobPhase())

    //   dispatch(actions.modifyDoubloons(job.incentive))
    //   dispatch(actions.disincentivizeTakenJob(job.id))

    //   if (job.title === "prospector") {
    //     dispatch(actions.modifyDoubloons(1))

    //     dispatch(actions.jobHasResolved())
    //   }

    //   if (job.title === "mayor") {
    //     dispatch(actions.assignColonists())
    //   }

    //   if (job.title === "craftsman") {
    //     dispatch(actions.resolveCrafting())
    //     // dispatch(actions.showCraftingModal())
    //     // wait until crafting modal resolves
    //     dispatch(actions.jobHasResolved())
    //   }
    // }
    }
  }
}

const ConnectedRoles = connect(
  mapStateToProps,
  mapDispatchToProps
)(Roles)

export default ConnectedRoles
