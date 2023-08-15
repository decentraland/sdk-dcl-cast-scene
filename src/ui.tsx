import { VideoTrackSourceType, VideoTracksActiveStreamsData } from '~system/CommsApi'
import ReactEcs, { ReactEcsRenderer, UiEntity, Label, Button, Dropdown } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'

let streams: VideoTracksActiveStreamsData[] = []
let onTrackSelected: (scr: string) => void

const uiComponent = () => {
  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        flexDirection: 'column',
        width: 500,
        height: 700,
        alignSelf: 'flex-start',
        position: { right: 100, top: 15 },
        alignContent: 'stretch',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        overflow: 'scroll'
      }}
    >
      {
        <Dropdown
          options={streams.map((s) => `${s.identity}:${s.trackSid}`)}
          color={Color4.Black()}
          fontSize={20}
          uiBackground={{ color: Color4.White() }}
          onChange={(index) => onTrackSelected(streams[index].trackSid)}
        ></Dropdown>
      }
    </UiEntity>
  )
}

export function setupUi(onClickCallback: (scr: string) => void) {
  onTrackSelected = onClickCallback
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

export function updateTracks(tracks: VideoTracksActiveStreamsData[]) {
  streams = [{ identity: '', trackSid: '', sourceType: VideoTrackSourceType.VTST_UNKNOWN }]
  streams = streams.concat(tracks)
}
