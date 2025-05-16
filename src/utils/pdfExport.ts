
import { Invoice, InvoiceItem } from "@/contexts/AppContext";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { toast } from "@/hooks/use-toast";

// Necesitamos extender el tipo jsPDF para incluir el método autoTable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const exportInvoiceToPDF = (invoice: Invoice) => {
  try {
    // Crear un nuevo documento PDF
    const doc = new jsPDF();
    
    // Añadir título
    doc.setFontSize(20);
    doc.text("FACTURA", 105, 20, { align: "center" });
    
    // Información de la factura
    doc.setFontSize(12);
    doc.text(`Factura #: ${invoice.id}`, 14, 40);
    doc.text(`Fecha: ${invoice.date}`, 14, 48);
    doc.text(`Cliente: ${invoice.client}`, 14, 56);
    doc.text(`Estado: ${invoice.status}`, 14, 64);
    
    // Línea separadora
    doc.setLineWidth(0.5);
    doc.line(14, 70, 196, 70);
    
    // Tabla de items
    if (invoice.items && invoice.items.length > 0) {
      const tableColumn = ["Producto", "Cantidad", "Precio", "Total"];
      const tableRows = invoice.items.map(item => [
        item.productName,
        item.quantity.toString(),
        `$${item.price.toFixed(2)}`,
        `$${item.total.toFixed(2)}`
      ]);
      
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 75,
        theme: 'grid',
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: 'bold'
        },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { cellWidth: 30, halign: 'center' },
          2: { cellWidth: 40, halign: 'right' },
          3: { cellWidth: 40, halign: 'right' }
        }
      });
      
      const finalY = (doc as any).lastAutoTable.finalY || 120;
      
      // Subtotal, IVA y total
      const subtotal = invoice.total / 1.16; // Asumiendo IVA del 16%
      const iva = invoice.total - subtotal;
      
      doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 140, finalY + 20);
      doc.text(`IVA (16%): $${iva.toFixed(2)}`, 140, finalY + 28);
      doc.setFontSize(14);
      doc.text(`Total: $${invoice.total.toFixed(2)}`, 140, finalY + 38);
    } else {
      doc.text("No hay items en esta factura", 14, 80);
    }
    
    // Pie de página
    doc.setFontSize(10);
    doc.text("Gracias por su compra", 105, 280, { align: "center" });
    
    // Guardar el PDF
    doc.save(`factura-${invoice.id}.pdf`);
    
    toast({
      title: "PDF generado correctamente",
      description: `La factura ${invoice.id} ha sido exportada como PDF.`,
      duration: 3000
    });
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    toast({
      title: "Error al generar PDF",
      description: "No se pudo generar el archivo PDF. Por favor, intente nuevamente.",
      variant: "destructive",
      duration: 5000
    });
  }
};
