import React from 'react';
import BusinessPlan from '@/components/BusinessPlan';
import { Button } from '@/components/ui/button';

const BusinessPlanPage = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Print Button */}
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <Button 
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          📄 Descargar PDF
        </Button>
      </div>

      {/* Business Plan Content */}
      <BusinessPlan />
      
      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body { 
              font-size: 12px; 
              line-height: 1.3;
              margin: 0;
              padding: 0;
            }
            .print\\:hidden { display: none !important; }
            .print\\:shadow-none { box-shadow: none !important; }
            
            /* Page breaks */
            .mb-12 { 
              page-break-inside: avoid; 
              break-inside: avoid;
            }
            
            h2 { 
              page-break-after: avoid; 
              break-after: avoid;
            }
            
            /* Ensure readability */
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          }
          
          @page {
            size: A4;
            margin: 0.75in;
          }
        `
      }} />
    </div>
  );
};

export default BusinessPlanPage;