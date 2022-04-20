import React from "react";
import A1_Header from "./Header";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { useState } from "react";
import { Button } from "react-bootstrap";

function Showpdf() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDoucumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  function changePage(offset) {
    setPageNumber((prePageNumber) => prePageNumber + offset);
  }
  function changePageBack() {
    changePage(-1);
  }
  function changePageNext() {
    changePage(+1);
  }
  return (
    <div className="pdfcontainer">
      <Document file="/RedBlackTree.pdf" onLoadSuccess={onDoucumentLoadSuccess}>
        <Page height="1000" pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {pageNumber > 1 && (
          <Button variant="secondary" onClick={changePageBack}>
            Previous Page
          </Button>
        )}
        {pageNumber < numPages && (
          <Button variant="secondary" onClick={changePageNext}>
            Next Page
          </Button>
        )}
      </div>
    </div>
  );
}

function RBTdocument() {
  return (
    <div className="A1">
      <div className="showPDF">
        <Showpdf />
      </div>
    </div>
  );
}

export default RBTdocument;
