import * as React from 'react'

import * as style from './style.less'

export default function() {
  return (
    <div className={style.home_wrap}>
      <div className={`${style.home_title} ${style.red_title}`}>css-types-loader</div>
      <h2 className={style.home_info}>Thanks for using!</h2>
    </div>
  )
}