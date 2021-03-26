import React from 'react'
import AskModal from '../common/AskModal'

const AskRemoveModal = ({ visible, onConfirm, onCancel }) => {
    return (
        <AskModal 
            visible={visible}
            title={"POST DELETE"}
            description="Are you sure delete this post?"
            confirmText="DELTE"
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    )
}

export default AskRemoveModal
