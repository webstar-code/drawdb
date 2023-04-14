import { useAppSelector } from '../hooks/useRedux';

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.userSlice);
  return (
    <div className="relative w-full h-screen flex flex-col">
      <div className="absolute w-full h-full top-0 left-0 flex flex-col -z-10">
        <div className="w-full h-[40%] bg-[#434190]"></div>
        <div className="w-full h-[60%] bg-background"></div>
      </div>

      <div className="w-4/5 mx-auto h-full">
        <div className="w-full h-14 p-4 py-2 flex items-center border border-primary">
          <h1 className="text-white">Hello {user?.email}</h1>
        </div>

        {/* <div className="w-full flex flex-col gap-10 mt-10">
          <h1 className="text-4xl font-bold text-[#C3DAFE]">Database Diagrams</h1>
          <div className="w-full h-full bg-white rounded-xl drop-shadow-md">
            <h1 className="text-black">All Diagrams</h1>
          </div>

        </div> */}
      </div>
    </div>
  );
}
