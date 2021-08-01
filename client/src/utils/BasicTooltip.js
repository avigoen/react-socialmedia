import React from 'react'
import { Popup } from 'semantic-ui-react'

function BasicTooltip({ content, children }) {
    return (
        <Popup content={content} inverted trigger={children} />
    )
}

export default BasicTooltip