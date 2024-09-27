// pages/Contact.tsx
import { NextPage } from 'next';

const Contact: NextPage = () => {
  const handleDownloadVCard = async () => {
    const response = await fetch('/api/vcard');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact.vcf';
    a.click();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white text-black dark:bg-black dark:text-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Contact Information</h1>
        <p className="mb-4">Xinzayr Zylkó Dennón</p>
        <p className="mb-8">Phone: +1 999 999 999</p>
      </div>
    </div>
  );
};

export default Contact;
