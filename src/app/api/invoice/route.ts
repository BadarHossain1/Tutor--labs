import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import jsPDF from "jspdf";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const paymentId = url.searchParams.get("payment_id");
  const format = url.searchParams.get("format") || "pdf"; // pdf or html
  
  if (!paymentId) {
    return Response.json({ error: "Payment ID required" }, { status: 400 });
  }

  try {
    // Get user data and payment info
    const user = await clerkClient.users.getUser(userId);
    const metadata = (user as any)?.unsafeMetadata || {};
    const payments = Array.isArray(metadata.payments) ? metadata.payments : [];
    const payment = payments.find((p: any) => p.id === paymentId);
    
    if (!payment) {
      return Response.json({ error: "Payment not found" }, { status: 404 });
    }

    // Generate invoice data
    const invoiceCode = payment.invoiceCode || `INV-${payment.id.slice(-8).toUpperCase()}-${new Date().getFullYear()}`;
    const invoiceDate = new Date(payment.createdAt).toLocaleDateString('en-GB');
    const userName = user.fullName || user.firstName + " " + user.lastName || "Customer";
    const userEmail = user.primaryEmailAddress?.emailAddress || payment.customer_email || "N/A";

    if (format === "html") {
      // Return HTML invoice for preview
      const invoiceHtml = generateInvoiceHTML({
        invoiceCode,
        invoiceDate,
        userName,
        userEmail,
        payment,
        metadata
      });

      return new Response(invoiceHtml, {
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': `inline; filename="invoice-${invoiceCode}.html"`,
        },
      });
    }

    // Generate PDF invoice
    const doc = new jsPDF();
    
    // Set font
    doc.setFont("helvetica");
    
    // Header
    doc.setFontSize(24);
    doc.setTextColor(255, 107, 53); // Orange color
    doc.text("Tutor Lab", 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Professional A-Level Tutoring Services", 20, 40);
    
    // Invoice title and details
    doc.setFontSize(28);
    doc.text("INVOICE", 20, 65);
    
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoiceCode}`, 20, 80);
    doc.text(`Invoice Date: ${invoiceDate}`, 20, 90);
    doc.text(`Payment ID: ${payment.id}`, 20, 100);
    doc.setTextColor(40, 167, 69); // Green color
    doc.text("Status: PAID", 20, 110);
    doc.setTextColor(0, 0, 0);
    
    // Customer info
    doc.setFontSize(14);
    doc.text("Bill To:", 20, 135);
    doc.setFontSize(12);
    doc.text(userName, 20, 150);
    doc.text(userEmail, 20, 160);
    if (metadata.refCode) {
      doc.text(`Reference Code: ${metadata.refCode}`, 20, 170);
    }
    
    // Items table header
    const tableTop = 190;
    doc.setFontSize(12);
    doc.text("Description", 20, tableTop);
    doc.text("Plan", 80, tableTop);
    doc.text("Subjects", 120, tableTop);
    doc.text("Amount", 160, tableTop);
    
    // Table line
    doc.line(20, tableTop + 5, 190, tableTop + 5);
    
    // Items
    const itemTop = tableTop + 15;
    doc.text(`Tutor Lab ${payment.plan === 'monthly' ? 'Monthly' : 'Annual'} Tutoring Plan`, 20, itemTop);
    doc.text(payment.plan, 80, itemTop);
    doc.text(payment.subjects, 120, itemTop);
    doc.text(`£${payment.amountGbp}`, 160, itemTop);
    
    // Total
    doc.setFontSize(14);
    doc.text(`Total: £${payment.amountGbp} ${payment.currency?.toUpperCase() || 'GBP'}`, 160, itemTop + 20);
    
    // Payment info section
    doc.setFontSize(14);
    doc.text("Payment Information", 20, itemTop + 50);
    doc.setFontSize(12);
    doc.text(`Payment Date: ${invoiceDate}`, 20, itemTop + 65);
    doc.text("Payment Method: Stripe Checkout", 20, itemTop + 75);
    doc.text(`Transaction ID: ${payment.id}`, 20, itemTop + 85);
    if (payment.paymentCode) {
      doc.text(`Payment Code: ${payment.paymentCode}`, 20, itemTop + 95);
    }
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const footerY = 270;
    doc.text("Thank you for choosing Tutor Lab! If you have any questions about this invoice, please contact us.", 20, footerY);
    doc.text("This is a computer-generated invoice and does not require a signature.", 20, footerY + 10);
    doc.text("Tutor Lab - Professional A-Level Biology, Chemistry & Maths Tutoring", 20, footerY + 20);

    // Convert to buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${invoiceCode}.pdf"`,
      },
    });

  } catch (error) {
    console.error("Invoice generation error:", error);
    return Response.json({ error: "Failed to generate invoice" }, { status: 500 });
  }
}

function generateInvoiceHTML({
  invoiceCode,
  invoiceDate,
  userName,
  userEmail,
  payment,
  metadata
}: {
  invoiceCode: string;
  invoiceDate: string;
  userName: string;
  userEmail: string;
  payment: any;
  metadata: any;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Invoice ${invoiceCode}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
            .header { border-bottom: 2px solid #ff6b35; padding-bottom: 20px; margin-bottom: 30px; }
            .company { font-size: 24px; font-weight: bold; color: #ff6b35; }
            .invoice-title { font-size: 28px; font-weight: bold; margin: 20px 0; }
            .invoice-details { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .customer-info { margin: 20px 0; }
            .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            .items-table th { background: #f8f9fa; font-weight: bold; }
            .total { text-align: right; font-size: 18px; font-weight: bold; margin: 20px 0; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
            .payment-info { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="company">Tutor Lab</div>
            <div>Professional A-Level Tutoring Services</div>
        </div>
        
        <div class="invoice-title">INVOICE</div>
        
        <div class="invoice-details">
            <strong>Invoice Number:</strong> ${invoiceCode}<br>
            <strong>Invoice Date:</strong> ${invoiceDate}<br>
            <strong>Payment ID:</strong> ${payment.id}<br>
            <strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">PAID</span>
        </div>
        
        <div class="customer-info">
            <h3>Bill To:</h3>
            <strong>${userName}</strong><br>
            ${userEmail}<br>
            ${metadata.refCode ? `Reference Code: ${metadata.refCode}` : ''}
        </div>
        
        <table class="items-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Plan</th>
                    <th>Subjects</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tutor Lab ${payment.plan === 'monthly' ? 'Monthly' : 'Annual'} Tutoring Plan</td>
                    <td style="text-transform: capitalize;">${payment.plan}</td>
                    <td>${payment.subjects}</td>
                    <td>£${payment.amountGbp}</td>
                </tr>
            </tbody>
        </table>
        
        <div class="total">
            <div>Total: £${payment.amountGbp} ${payment.currency?.toUpperCase() || 'GBP'}</div>
        </div>
        
        <div class="payment-info">
            <h3>Payment Information</h3>
            <strong>Payment Date:</strong> ${invoiceDate}<br>
            <strong>Payment Method:</strong> Stripe Checkout<br>
            <strong>Transaction ID:</strong> ${payment.id}<br>
            ${payment.paymentCode ? `<strong>Payment Code:</strong> ${payment.paymentCode}<br>` : ''}
        </div>
        
        <div class="footer">
            <p>Thank you for choosing Tutor Lab! If you have any questions about this invoice, please contact us.</p>
            <p>This is a computer-generated invoice and does not require a signature.</p>
            <p>Tutor Lab - Professional A-Level Biology, Chemistry & Maths Tutoring</p>
        </div>
    </body>
    </html>`;
}