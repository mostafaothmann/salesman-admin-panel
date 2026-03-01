import { Metadata } from "next";
import SalesmansCountStatistics from "../../myComponents/statistics/SalesmansCountStatistics";
import DoctorsCountStatistics from "../../myComponents/statistics/DoctorsCountStatistics";

export const metadata: Metadata = {
  title:
    "Emaar Admin Panel",
  description: "Emaar Admin Panel",
};

export default function GlobalStatistics() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* <!-- Statistics --> */}
      <div className="col-span-6 space-y-6 xl:col-span-6">
        <SalesmansCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-6">
        <DoctorsCountStatistics />
      </div>
       </div>
  );
}
