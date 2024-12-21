import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const FILE_NAME = "http-status-codes-by-Majid-Ali";

interface StatusCodeDetails {
    code: number;
    title: string;
    description: string;
    example: string;
}

const downloadPDFTable = (statusCodes: Array<StatusCodeDetails>) => {
    const doc = new jsPDF();
    let pageCount: number = 0;

    // Add header
    doc.setFontSize(18);
    doc.setFont("Helvetica", "bold");
    doc.text("Http Status Codes Table", 14, 15);

    // Define table content and styles
    const tableColumn = ["Name", "Description", "Example", "Code"];
    const tableRows = statusCodes.map((command) => [command.title || "", command.description || "", command.example || "", command.code || ""]);
    const columnStyles = {
        0: { cellWidth: 50 },
        1: { cellWidth: 40 },
        2: { cellWidth: 40 },
        3: { cellWidth: 50 }
    };

    // Add table to PDF
    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        columnStyles,
        theme: "grid",
        styles: { fontSize: 12, cellPadding: 3, overflow: "linebreak" },
        headStyles: { fillColor: [0, 100, 255], textColor: [255, 255, 255], fontSize: 14, fontStyle: "bold" },
        pageBreak: "auto",
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
