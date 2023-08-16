import { VideoTracksActiveStreamsData } from '~system/CommsApi'
import ReactEcs, { ReactEcsRenderer, UiEntity, Label, Dropdown } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { VideoPlayer, engine } from '@dcl/sdk/ecs'
import { ScreenComponent } from './factory'
import { VideoTrackSourceType, formatAddress, getSourceType } from './utils'

let streams: VideoTracksActiveStreamsData[] = []


export function updateTracks(tracks: VideoTracksActiveStreamsData[]) {
  streams = [
    { identity: 'No video', trackSid: '', sourceType: VideoTrackSourceType.VTST_UNKNOWN },
    ...tracks
  ]
}

// on Dropdown change, update the screen video player
function handleChangeTrack(src: string) {
  const [[screenEntity]] = engine.getEntitiesWith(ScreenComponent)
  if (!screenEntity) throw new Error("Invalid screen")

  // Remove video player if there is no selected
  if (src === "") {
    VideoPlayer.deleteFrom(screenEntity)
    return
  }

  VideoPlayer.createOrReplace(screenEntity, {
    src,
    playing: true
  })
}

const uiComponent = () => {
  return (
    <UiEntity
      uiTransform={{
        positionType: 'absolute',
        flexDirection: 'column',
        width: 500,
        height: 50,
        alignSelf: 'flex-start',
        position: { right: 100, top: 15 },
        alignContent: 'stretch',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        overflow: 'scroll'
      }}
    >
      { streams.length <= 1
        ? [<Label key="label 1" uiTransform={{ width: '100%', height: 30 }} fontSize={20} value="No streams available" />, <Label key="label 2" uiTransform={{ width: '100%', height: 30 }} fontSize={20} value="Please go to https://cast.decentraland.org/" />]
        : <Dropdown
          acceptEmpty
          disabled={streams.length <= 1}
          emptyLabel='Select streaming video'
          options={streams.map((s) => `${formatAddress(s.identity)} (${getSourceType[s.sourceType]})`)}
          color={Color4.Black()}
          fontSize={20}
          uiBackground={{ color: Color4.White() }}
          onChange={(index) => handleChangeTrack(streams[index].trackSid)}
        />
      }
    </UiEntity>
  )
}


export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}