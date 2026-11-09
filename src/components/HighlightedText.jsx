import { Fragment } from 'react'
import { splitWords } from '../utils/words'

function Words({ text }) {
  return splitWords(text).map(({ text: part, isSpace }, i) => {
    if (isSpace) return part
    return <span className="wd" key={`${i}-${part}`}>{part}</span>
  })
}

function HighlightedText({ segments }) {
  return segments.map(({ text, isHighlight }, i) => (
    <Fragment key={`${i}-${text}`}>
      {isHighlight ? <mark><Words text={text} /></mark> : <Words text={text} />}
    </Fragment>
  ))
}

export default HighlightedText
