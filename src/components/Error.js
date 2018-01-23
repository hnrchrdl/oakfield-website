import './Error.css'

import React from 'react'

export default props => (
  <div class="container error">{props.errorMsg.toString()}</div>
)
