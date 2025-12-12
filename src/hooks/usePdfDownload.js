import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function usePdfDownloader(
  ref,
  defaultFileName = "download.pdf"
) {
  const downloadPDF = async (fileName = defaultFileName) => {
    if (!ref?.current) return;

    try {
      const element = ref.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight <= pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        let remainingHeight = canvas.height;
        let pageCanvas = document.createElement("canvas");
        const pagePixelHeight = Math.floor(
          (canvas.width * pdfHeight) / imgWidth
        );
        let pageY = 0;

        while (remainingHeight > 0) {
          pageCanvas.width = canvas.width;
          pageCanvas.height = Math.min(pagePixelHeight, remainingHeight);

          const ctx = pageCanvas.getContext("2d");

          ctx.drawImage(
            canvas,
            0,
            pageY,
            canvas.width,
            pageCanvas.height,
            0,
            0,
            canvas.width,
            pageCanvas.height
          );

          const pageImg = pageCanvas.toDataURL("image/png");
          const pageMmHeight = (pageCanvas.height * imgWidth) / canvas.width;

          pdf.addImage(pageImg, "PNG", 0, 0, imgWidth, pageMmHeight);

          remainingHeight -= pageCanvas.height;
          pageY += pageCanvas.height;

          if (remainingHeight > 0) pdf.addPage();
        }
      }

      pdf.save(fileName);
    } catch (error) {
      console.error("PDF Download Error:", error);
      alert("Failed to generate PDF");
    }
  };

  return { downloadPDF };
}
