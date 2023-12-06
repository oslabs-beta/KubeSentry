import Sidebar from '@/src/app/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden bg-primaryDark text-slate-400'>
      <div className='w-full flex-none md:w-64 mt-8'>
        <Sidebar />
      </div>
      <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>{children}</div>
    </div>
  );
}
