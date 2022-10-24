import React from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import FileSaver from "file-saver";

function DownloadDatabase({ currentDatabase }) {
  const handleDownload = () => {
    // const { currentDatabase } = this.props;

    const blob = new Blob([currentDatabase.export()], {
      type: `application/x-sqlite-3`,
    });

    FileSaver.saveAs(blob, "testSQL.sqlite");
  };

  // render() {
  return (
    <Tooltip title="Download Database">
      <IconButton onClick={handleDownload} aria-label="Download Database">
        <CloudDownloadIcon />
      </IconButton>
    </Tooltip>
  );
}

export default DownloadDatabase;
