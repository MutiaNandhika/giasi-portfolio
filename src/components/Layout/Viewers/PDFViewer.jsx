import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  FaFilePdf,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import { checkPDFExists } from "../../../utils/pdfUtils";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

/*
 * PDF.js worker configuration for Vite.
 */
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function PDFViewer({
  pdfPath,
  title = "Document",
  className = "",
  showControls = true,
  defaultScale = 1.0,
  onLoadSuccess,
  onError,
}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(defaultScale);

  const [isLoading, setIsLoading] = useState(true);
  const [pdfExists, setPdfExists] = useState(false);

  const [useIframeFallback, setUseIframeFallback] =
    useState(false);

  /*
   * Check whether PDF exists.
   */
  useEffect(() => {
    let isMounted = true;

    const checkPDF = async () => {
      if (!pdfPath) {
        if (isMounted) {
          setPdfExists(false);
          setIsLoading(false);
        }

        return;
      }

      setIsLoading(true);
      setPdfExists(false);
      setUseIframeFallback(false);
      setPageNumber(1);
      setNumPages(null);

      const exists = await checkPDFExists(pdfPath);

      if (!isMounted) {
        return;
      }

      setPdfExists(exists);

      if (!exists) {
        setIsLoading(false);
      }
    };

    checkPDF();

    return () => {
      isMounted = false;
    };
  }, [pdfPath]);

  /*
   * PDF loaded successfully.
   */
  const onDocumentLoadSuccess = ({
    numPages: totalPages,
  }) => {
    setNumPages(totalPages);
    setPageNumber(1);
    setIsLoading(false);

    if (onLoadSuccess) {
      onLoadSuccess(totalPages);
    }
  };

  /*
   * PDF loading error.
   */
  const onDocumentLoadError = (error) => {
    console.error("PDF loading error:", error);

    setIsLoading(false);

    const errorMessage =
      error?.message?.toLowerCase() || "";

    /*
     * If PDF.js worker fails, use browser iframe viewer.
     */
    if (
      errorMessage.includes("worker") ||
      errorMessage.includes("module") ||
      errorMessage.includes("specifier")
    ) {
      setUseIframeFallback(true);
    }

    if (onError) {
      onError(error);
    }
  };

  /*
   * Previous page.
   */
  const goToPrevPage = () => {
    setPageNumber((previous) =>
      Math.max(previous - 1, 1)
    );
  };

  /*
   * Next page.
   */
  const goToNextPage = () => {
    if (!numPages) {
      return;
    }

    setPageNumber((previous) =>
      Math.min(previous + 1, numPages)
    );
  };

  /*
   * Zoom in.
   */
  const zoomIn = () => {
    setScale((previous) =>
      Math.min(previous + 0.2, 3)
    );
  };

  /*
   * Zoom out.
   */
  const zoomOut = () => {
    setScale((previous) =>
      Math.max(previous - 0.2, 0.5)
    );
  };

  /*
   * No PDF path.
   */
  if (!pdfPath) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 p-10 ${className}`}
      >
        <div className="text-center">
          <FaFilePdf className="mx-auto mb-4 text-5xl text-amber-500" />

          <p className="text-neutral-300">
            No PDF document provided.
          </p>
        </div>
      </div>
    );
  }

  /*
   * PDF does not exist.
   */
  if (!pdfExists && !isLoading) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 p-10 ${className}`}
      >
        <div className="text-center">
          <FaFilePdf className="mx-auto mb-4 text-5xl text-red-400" />

          <h3 className="mb-2 text-lg font-semibold text-white">
            Document Not Found
          </h3>

          <p className="text-sm text-neutral-400">
            The requested PDF document could not be found.
          </p>

          <p className="mt-2 text-xs text-neutral-500">
            {pdfPath}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 shadow-lg ${className}`}
    >
      {/* =========================================================
          PDF HEADER & CONTROLS
          ========================================================= */}
      {showControls && !useIframeFallback && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 bg-neutral-900 px-4 py-3">
          {/* Title & Page */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              {title}
            </h3>

            {numPages && (
              <p className="mt-1 text-xs text-neutral-400">
                Page {pageNumber} of {numPages}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              type="button"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-700 bg-neutral-800 text-neutral-300 transition hover:border-amber-500 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaArrowLeft className="text-xs" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={goToNextPage}
              disabled={
                !numPages ||
                pageNumber >= numPages
              }
              aria-label="Next page"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-700 bg-neutral-800 text-neutral-300 transition hover:border-amber-500 hover:text-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaArrowRight className="text-xs" />
            </button>

            {/* Divider */}
            <div className="mx-1 h-6 w-px bg-neutral-700" />

            {/* Zoom Out */}
            <button
              type="button"
              onClick={zoomOut}
              aria-label="Zoom out"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-700 bg-neutral-800 text-lg text-neutral-300 transition hover:border-amber-500 hover:text-amber-400"
            >
              −
            </button>

            {/* Zoom Percentage */}
            <span className="flex h-9 min-w-[60px] items-center justify-center rounded-md border border-neutral-800 bg-neutral-950 px-2 text-xs text-neutral-400">
              {Math.round(scale * 100)}%
            </span>

            {/* Zoom In */}
            <button
              type="button"
              onClick={zoomIn}
              aria-label="Zoom in"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-700 bg-neutral-800 text-lg text-neutral-300 transition hover:border-amber-500 hover:text-amber-400"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          PDF CONTENT
          ========================================================= */}
      <div className="pdf-content min-h-[400px] bg-neutral-800">
        {/* Loading */}
        {isLoading && pdfExists && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-amber-500" />

              <p className="text-sm text-neutral-400">
                Loading PDF...
              </p>
            </div>
          </div>
        )}

        {/* =====================================================
            REACT PDF VIEWER
            ===================================================== */}
        {pdfExists && !useIframeFallback && (
          <div className="flex justify-center overflow-auto p-4 sm:p-6">
            <Document
              file={pdfPath}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex min-h-[400px] items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-amber-500" />

                    <p className="text-sm text-neutral-400">
                      Loading PDF document...
                    </p>
                  </div>
                </div>
              }
              error={
                <div className="flex min-h-[400px] items-center justify-center p-6">
                  <div className="text-center">
                    <FaFilePdf className="mx-auto mb-4 text-5xl text-red-400" />

                    <p className="mb-4 text-sm text-neutral-400">
                      Failed to load PDF document.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setUseIframeFallback(true)
                      }
                      className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400"
                    >
                      Open Browser Viewer
                    </button>
                  </div>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                className="shadow-xl"
                renderTextLayer={true}
                renderAnnotationLayer={true}
                loading={
                  <div className="flex min-h-[400px] items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-neutral-700 border-t-amber-500" />

                      <p className="text-xs text-neutral-400">
                        Loading page...
                      </p>
                    </div>
                  </div>
                }
                error={
                  <div className="flex min-h-[400px] items-center justify-center p-6">
                    <p className="text-sm text-red-400">
                      Failed to load page{" "}
                      {pageNumber}.
                    </p>
                  </div>
                }
              />
            </Document>
          </div>
        )}

        {/* =====================================================
            IFRAME FALLBACK
            ===================================================== */}
        {pdfExists && useIframeFallback && (
          <div className="w-full p-4 sm:p-6">
            <div className="mb-4 rounded-lg border border-neutral-700 bg-neutral-900 p-3">
              <p className="text-xs text-neutral-400">
                PDF.js could not load the document.
                The browser's built-in PDF viewer is
                being used instead.
              </p>
            </div>

            <iframe
              src={pdfPath}
              title={title}
              className="h-[600px] w-full rounded-lg border border-neutral-700 bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PDFViewer;