import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Document,
  Packer,
  Table,
  TableRow,
  TableCell,
  Paragraph,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import { format } from "date-fns";

interface ExportData {
  workers: Array<{
    id: number;
    name: string;
    role: string;
    schedule?: {
      rota: string;
      startTime: string;
      endTime: string;
    };
    totalHours: number;
  }>;
  timeSlots: string[];
  selectedDate: Date;
}

export const exportToExcel = (data: ExportData) => {
  const workbook = XLSX.utils.book_new();

  // Create header row
  const headers = [
    "Caregiver",
    "Role",
    "Rota",
    "Schedule",
    "Total Hours",
    ...data.timeSlots,
  ];

  // Create data rows
  const rows = data.workers.map((worker) => [
    worker.name,
    worker.role,
    worker.schedule?.rota || "Not Assigned",
    worker.schedule
      ? `${worker.schedule.startTime} - ${worker.schedule.endTime}`
      : "Not Scheduled",
    `${worker.totalHours}h`,
    ...data.timeSlots.map((slot) => {
      const hour = parseInt(slot.split(":")[0]);
      const schedule = worker.schedule;
      if (!schedule) return "";

      const startHour = parseInt(schedule.startTime.split(":")[0]);
      const endHour = parseInt(schedule.endTime.split(":")[0]);

      if (endHour <= startHour) {
        // Overnight shift
        return hour >= startHour || hour < endHour ? schedule.rota : "";
      } else {
        // Regular shift
        return hour >= startHour && hour < endHour ? schedule.rota : "";
      }
    }),
  ]);

  const worksheetData = [headers, ...rows];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Set column widths
  const colWidths = [
    { wch: 20 }, // Caregiver
    { wch: 15 }, // Role
    { wch: 15 }, // Rota
    { wch: 20 }, // Schedule
    { wch: 12 }, // Total Hours
    ...data.timeSlots.map(() => ({ wch: 8 })), // Time slots
  ];
  worksheet["!cols"] = colWidths;

  XLSX.utils.book_append_sheet(workbook, worksheet, "Care Plan Schedule");

  const fileName = `care-plan-schedule-${format(
    data.selectedDate,
    "yyyy-MM-dd"
  )}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

export const exportToPDF = (data: ExportData) => {
  const doc = new jsPDF("l", "mm", "a4"); // Landscape orientation

  // Add title
  doc.setFontSize(16);
  doc.text(`Care Plan Schedule - ${format(data.selectedDate, "PPP")}`, 14, 20);

  // Create the graphical grid similar to the schedule display
  const timeHeaders = ["Caregiver", ...data.timeSlots];

  // Prepare grid data with visual representation
  const gridRows = data.workers.map((worker) => {
    const row = [worker.name];

    // Track if we've added the shift info for this worker
    let shiftInfoAdded = false;

    // For each time slot, determine what to show
    data.timeSlots.forEach((timeSlot) => {
      const hour = parseInt(timeSlot.split(":")[0]);
      const schedule = worker.schedule;

      if (!schedule) {
        row.push(""); // Empty cell
        return;
      }

      const startHour = parseInt(schedule.startTime.split(":")[0]);
      const endHour = parseInt(schedule.endTime.split(":")[0]);

      let isInShift = false;
      if (endHour <= startHour) {
        // Overnight shift
        isInShift = hour >= startHour || hour < endHour;
      } else {
        // Regular shift
        isInShift = hour >= startHour && hour < endHour;
      }

      if (isInShift && !shiftInfoAdded) {
        // Add detailed shift info including total hours on the first shift cell
        row.push(
          `${schedule.rota}\n${schedule.startTime}-${schedule.endTime}\n${worker.totalHours}h total`
        );
        shiftInfoAdded = true;
      } else if (isInShift) {
        // Just show the rota name for subsequent cells in the shift
        row.push(schedule.rota);
      } else {
        row.push(""); // Empty cell
      }
    });

    return row;
  });

  // Create the visual grid table
  autoTable(doc, {
    head: [timeHeaders],
    body: gridRows,
    startY: 30,
    styles: {
      fontSize: 6,
      cellPadding: 1,
      halign: "center",
      valign: "middle",
    },
    headStyles: {
      fillColor: [66, 139, 202],
      fontSize: 7,
      fontStyle: "bold",
    },
    columnStyles: {
      0: {
        // Caregiver column
        cellWidth: 25,
        halign: "left",
        fontSize: 7,
        fontStyle: "bold",
      },
    },
    didParseCell: function (data) {
      // Color code the rota cells
      if (data.row.index > 0 && data.column.index > 0) {
        // Skip header and caregiver column
        const cellText = data.cell.text[0];
        if (cellText && cellText.includes("AM Rota")) {
          data.cell.styles.fillColor = [255, 235, 59]; // Yellow
          data.cell.styles.textColor = [0, 0, 0];
        } else if (cellText && cellText.includes("PM Rota")) {
          data.cell.styles.fillColor = [255, 152, 0]; // Orange
          data.cell.styles.textColor = [0, 0, 0];
        } else if (cellText && cellText.includes("Night Rota")) {
          data.cell.styles.fillColor = [63, 81, 181]; // Indigo
          data.cell.styles.textColor = [255, 255, 255];
        }
      }
    },
    margin: { top: 30, left: 10, right: 10 },
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const finalY = (doc as unknown).lastAutoTable.finalY + 10;
  doc.setFontSize(10);
  doc.text("Schedule Legend:", 14, finalY);

  // Legend items
  const legendY = finalY + 8;

  // AM Rota legend
  doc.setFillColor(255, 235, 59);
  doc.rect(14, legendY - 3, 8, 4, "F");
  doc.setTextColor(0, 0, 0);
  doc.text("AM Rota (07:00-15:00)", 25, legendY);

  // PM Rota legend
  doc.setFillColor(255, 152, 0);
  doc.rect(70, legendY - 3, 8, 4, "F");
  doc.setTextColor(0, 0, 0);
  doc.text("PM Rota (15:00-23:00)", 81, legendY);

  // Night Rota legend
  doc.setFillColor(63, 81, 181);
  doc.rect(130, legendY - 3, 8, 4, "F");
  doc.setTextColor(255, 255, 255);
  doc.text("Night Rota (23:00-07:00)", 141, legendY);

  const fileName = `care-plan-schedule-${format(
    data.selectedDate,
    "yyyy-MM-dd"
  )}.pdf`;
  doc.save(fileName);
};

export const exportToWord = async (data: ExportData) => {
  const tableRows = [
    // Header row
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph("Caregiver")] }),
        new TableCell({ children: [new Paragraph("Role")] }),
        new TableCell({ children: [new Paragraph("Rota")] }),
        new TableCell({ children: [new Paragraph("Schedule")] }),
        new TableCell({ children: [new Paragraph("Total Hours")] }),
      ],
    }),
    // Data rows
    ...data.workers.map(
      (worker) =>
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(worker.name)] }),
            new TableCell({ children: [new Paragraph(worker.role)] }),
            new TableCell({
              children: [
                new Paragraph(worker.schedule?.rota || "Not Assigned"),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  worker.schedule
                    ? `${worker.schedule.startTime} - ${worker.schedule.endTime}`
                    : "Not Scheduled"
                ),
              ],
            }),
            new TableCell({
              children: [new Paragraph(`${worker.totalHours}h`)],
            }),
          ],
        })
    ),
  ];

  const table = new Table({
    rows: tableRows,
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },
  });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: `Care Plan Schedule - ${format(data.selectedDate, "PPP")}`,
            heading: "Heading1",
          }),
          table,
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const fileName = `care-plan-schedule-${format(
    data.selectedDate,
    "yyyy-MM-dd"
  )}.docx`;
  saveAs(blob, fileName);
};
