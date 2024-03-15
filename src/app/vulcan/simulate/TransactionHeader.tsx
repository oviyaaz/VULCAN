'use client'

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import AddSimulate from './AddSimulate';
import { addNewSimulate } from '@/service/simulator/SimulatorService';
import { getUser } from '../workspace/WorkspaceListLayout';
import { CurrentUser } from '@/service/ServerDetail';

const TransactionHeader = (props: {
    onUploadSuccess: () => void;
}) => {

    const [user, setUser] = useState<CurrentUser>();
    useEffect(() => {
        const user = getUser();
        setUser(user);
        // handleWorkspaceList(user);
    }, []);
    return (
        <Box
            sx={{
                display: "flex",
                width: "99%",
                justifyContent: "end",
            }}
        >
            <AddSimulate
                label="RUN PIPELINE"
                onUploadSuccess={(dropzoneState, transaction) => {
                    let formData = new FormData();
                    dropzoneState.acceptedFiles.forEach((file: string | Blob) =>
                        formData.append("file", file)
                    );
                    user && addNewSimulate(user, transaction, formData).then(() => props.onUploadSuccess());
                }}
            />
        </Box>
    )
}

export default TransactionHeader;