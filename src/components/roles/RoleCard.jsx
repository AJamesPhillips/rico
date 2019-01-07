import * as React from 'react'
import Button from 'react-bootstrap/lib/Button'
import Panel from 'react-bootstrap/lib/Panel'

const JobCard = ({
  onClick,
  taken,
  title,
  description,
  incentive
}) => {
  let incentiveText = ''
  if (incentive) {
    incentiveText = '(+'+incentive+' Doubloons)'
  }
  const { action, privilege } = description

  const button = taken
    ? <Button disabled>Taken</Button>
    : <Button onClick={onClick}>Take {' ' + incentiveText}</Button>

  return (
    <Panel>
      <h3>{title}</h3>
      <p>Action: {action}</p>
      <p>Privilege: {privilege}</p>
      {button}
    </Panel>
  )
}

export default JobCard
