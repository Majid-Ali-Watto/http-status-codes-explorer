import jsPDF from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";
import { StatusCodeDetails } from "@/types";
import { formatResponseHeaders } from "@/utils/formatHeaders";

const FILE_NAME = "http-status-codes-by-Majid-Ali";


const downloadPDFTable = (statusCodes: Array<StatusCodeDetails>) => {
    const doc = new jsPDF();
    let pageCount: number = 0;

    // Add header
    doc.setFontSize(18);
    doc.setFont("Helvetica", "bold");
    doc.text("Http Status Codes Table", 14, 15);

    // Each code is a summary row followed by one full-width monospace row with its examples.
    const tableColumn = ["Code", "Name", "Description", "Example"];
    const tableRows: RowInput[] = statusCodes.flatMap((status) => [
        [
            { content: String(status.code), styles: { fontStyle: "bold", fillColor: [235, 242, 255] } },
            { content: status.title, styles: { fontStyle: "bold", fillColor: [235, 242, 255] } },
            { content: status.description, styles: { fillColor: [235, 242, 255] } },
            { content: status.example, styles: { fillColor: [235, 242, 255] } },
        ],
        [{
            colSpan: 4,
            content: [
                "Request payload:", status.payload ?? "(none)",
                "",
                "Response headers:", formatResponseHeaders(status),
                "",
                "Response body:", status.response ?? "(none)",
            ].join("\n"),
            styles: { font: "courier", fontSize: 8, textColor: [40, 40, 40] },
        }],
    ]);
    const columnStyles = {
        0: { cellWidth: 16 },
        1: { cellWidth: 40 },
        2: { cellWidth: 64 },
        3: { cellWidth: "auto" as const }
    };

    // Add table to PDF
    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        columnStyles,
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 2.5, overflow: "linebreak" },
        headStyles: { fillColor: [0, 100, 255], textColor: [255, 255, 255], fontSize: 11, fontStyle: "bold" },
        pageBreak: "auto",
        rowPageBreak: "avoid",
        didDrawPage: (data) => {
            pageCount = data.pageNumber;
            addFooter(doc, pageCount);
        }
    });

    // Save the PDF
    doc.save(FILE_NAME + ".pdf");
};

export const addFooter = (doc: jsPDF, pageCount: number) => {
    const dev = "Developer and Author - Majid Ali";
    const footerText = `Page No. ${pageCount} - ${dev}`;
    const pageWidth = doc.internal.pageSize.width;
    const textWidth = doc.getTextWidth(footerText);
    const x = (pageWidth - textWidth) / 2;
    const y = doc.internal.pageSize.height - 10;

    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    doc.textWithLink(footerText, x + 30, y, { url: "https://majidev.netlify.app/" });
};
export { downloadPDFTable, };
