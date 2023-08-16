import { getActiveVideoStreams } from "~system/CommsApi"
import { updateTracks } from "./ui"

// Fetch the streams every 5 seconds
let refreshInterval = 0
export function fetchStreamsSystem(dt: number) {
  refreshInterval -= dt
  if (refreshInterval <= 0) {
    getActiveVideoStreams({}).then(({ streams }) => {
      updateTracks(streams)
    })
    refreshInterval = 5
  }
}
