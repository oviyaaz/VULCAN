import React from 'react';
import XLSX from 'sheetjs-style';
import { Tooltip } from '@mui/material';
import * as FileSaver from 'file-saver';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {IconButton} from '@mui/material';

const ExcelExport = (props:any) => {

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
        const fileExtension = '.xlsx';
        const exportToExcel = async () => {
            const ws = XLSX.utils.json_to_sheet (props.excelData);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array' });
            const data = new Blob ([excelBuffer], { type: fileType });
            FileSaver.saveAs (data, props.fileName + fileExtension);
        }
       
    return (
                <>
                    <Tooltip title="Download">
                        <IconButton onClick={(e) => exportToExcel()}>
                            <FileDownloadIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </>
            )
}

export default ExcelExport;
