import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

function DeleteButton({ onDelete }) {
    return (
        <Button floated="right" as="div" color="red" onClick={onDelete}>
            <Icon name="trash" style={{ margin: 0 }} />
        </Button>
    )
}

export default DeleteButton
