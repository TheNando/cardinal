import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { InteractionPoint } from 'components'
import { useEditorContext } from 'contexts/EditorContext'
import { Firebase } from 'lib/data'
import { styleDelta, styleRender } from 'lib/utils'
import { useMemo } from 'preact/hooks'

const MIN_SIZE = 8
const CARD_HEIGHT = 350
const CARD_WIDTH = 250

const applyOps = ops => (scale, setValue) => point =>
  setValue(
    ops.reduce(
      (result, fn) => ({
        ...result,
        ...fn(scale)(point),
      }),
      {}
    )
  )

const t = {
  t: scale => ({ x, y }) => ({ top: y / scale }),
  l: scale => ({ x, y }) => ({ left: x / scale }),
  h: scale => ({ x, y }) => ({ height: y / scale }),
  hi: scale => ({ x, y }) => ({ height: -y / scale }),
  w: scale => ({ x, y }) => ({ width: x / scale }),
  wi: scale => ({ x, y }) => ({ width: -x / scale }),
}

const tMap = {
  move: applyOps([t.t, t.l]),
  size: applyOps([t.h, t.w]),
}

const labelCss = css`
  background-color: #888;
  color: #fff;
  font-size: 10px;
  margin-top: -15px;
  padding: 2px 3px;
  position: relative;
  text-align: center;
  user-select: none;
  width: 70px;
  z-index: 101;
`

const mainCss = css`
  outline: 1px dotted var(--clr-accent);
  cursor: pointer;
  position: absolute;
`

ElementModifier.proptypes = {
  element: PropTypes.object.isRequired,
}

/*
  TODO:
  * Figure out why only first transform (move/resize) works correctly
    - Is bounds updating properly?
  * Finalize style for move and resize
  * Troubleshoot issue during excessive resize/move
*/

export function ElementModifier({ element }) {
  const { delta, refresh, scale, set } = useEditorContext()

  const style = styleRender(element, {}, delta)
  const { left, top, width, height } = style

  const saveTransform = async delta => {
    const data = { style: styleDelta(element, delta) }
    await Firebase.update(element, data)
    set.refresh(Symbol())
  }

  const bounds = useMemo(() => {
    const { width: w, height: h, left: l, top: t } = element.style
    return {
      size: {
        minX: -(w.value - MIN_SIZE) * scale,
        maxX: (CARD_WIDTH - l.value - w.value) * scale,
        minY: -(h.value - MIN_SIZE) * scale,
        maxY: (CARD_HEIGHT - t.value - h.value) * scale,
      },
      move: {
        minX: -(l.value * scale),
        maxX: (CARD_WIDTH - l.value - w.value) * scale,
        minY: -(t.value * scale),
        maxY: (CARD_HEIGHT - t.value - h.value) * scale,
      },
    }
  }, [refresh, scale])

  return (
    <>
      <div class={labelCss} style={{ left, top }}>
        {element.name}
      </div>

      <div class={mainCss} style={style}>
        <InteractionPoint
          bounds={bounds.move}
          onDrag={tMap.move(scale, set.delta)}
          onDragEnd={tMap.move(scale, saveTransform)}
          type="move"
        />
        <InteractionPoint
          bounds={bounds.size}
          onDrag={tMap.size(scale, set.delta)}
          onDragEnd={tMap.size(scale, saveTransform)}
          type="size"
        />
      </div>
    </>
  )
}
