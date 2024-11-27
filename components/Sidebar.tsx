'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  return (
      <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
        {/* Sidebar Header */}
       
        
        <div className="flex flex-1 flex-col gap-6">
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
            
            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn(
                  'flex gap-4 items-center p-4 rounded-lg justify-start',
                  {
                    'bg-blue-1': isActive,
                  }
                )}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={24}
                  height={24}
                />
                <p className="text-lg font-semibold max-lg:hidden">
                  {item.label}
                </p>
              </Link>
            );
          })}

       
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 bg-gray-900">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Logout
          </button>
        </div>
      </section>
  );
};

export default Sidebar;
