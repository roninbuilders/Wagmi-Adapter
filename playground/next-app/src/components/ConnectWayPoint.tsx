'use client'

import { useRoninConnect } from '@roninbuilders/wagmi-adapter/hooks'

function ConnectWaypoint() {
  const { connectWaypoint, isError, error } = useRoninConnect()

  return (
    <>
      <button onClick={connectWaypoint} >Connect With Waypoint</button>
      {isError && error?.message}
    </>
  )
}

export default ConnectWaypoint