// Contact.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            className="mx-auto h-24 w-24 rounded-full"
            src="https://avatars.githubusercontent.com/u/98981073?v=4"
            alt="Profile Picture"
            width={96}
            height={96}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Contact Xinzayr
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <Link href="https://github.com/Xinzayr">
              github.com/Xinzayr
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
