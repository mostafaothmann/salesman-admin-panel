import { Metadata } from "next";
import DoctorsCountStatistics from "../../homePage/statistics/DoctorsCountStatistics";
import AreasCountStatistics from "../../homePage/statistics/AreasCountStatistics";
import PharmacistsCountStatistics from "../../homePage/statistics/PharmacistsCountStatistics";
import AssociationsCountStatistics from "../../homePage/statistics/AssociationsCountStatistics";
import TypesCountStatistics from "../../homePage/statistics/TypesCountStatistics";
import MallsCountStatistics from "../../homePage/statistics/MallsCountStatistics";
import HospitalsCountStatistics from "../../homePage/statistics/HospitalsCountStatistics";
import VideosCountStatistics from "../../homePage/statistics/VideosCountStatistics";
import BaseOffersCountStatistics from "../../homePage/statistics/BaseOffersCountStatistics";
import BaseGiftsCountStatistics from "../../homePage/statistics/BaseGiftsCountStatistics";
import SamplesCountStatistics from "../../homePage/statistics/SamplesCountStatistics";
import GiftsCountStatistics from "../../homePage/statistics/GfitsCountStatistics";
import OffersCountStatistics from "../../homePage/statistics/OffersCountStatistics";
import OrdersCountStatisticts from "../../homePage/statistics/AcceptedOrdersCountStatistics";
import AcceptedOrdersCountStatisticts from "../../homePage/statistics/AcceptedOrdersCountStatistics";
import UnderReviewOrdersCountStatisticts from "../../homePage/statistics/UnderReviewOrdersCountStatisticts";
import AcceptedDoctorsVisitsStatistics from "../../homePage/statistics/AcceptedDoctorsVisitsCountStatistics";
import UnderReviewDoctorsVisitsStatistics from "../../homePage/statistics/UnderReviewDoctorsVisitsCountStatisticts";
import UnderReviewPharmacistsVisitsStatistics from "../../homePage/statistics/UnderReviewPharmacistsVisitsCountStatistics";
import AcceptedPharmacistsVisitsStatistics from "../../homePage/statistics/AcceptedPharmacistsVisitsCountStatistics";

export const metadata: Metadata = {
  title:
    "Emaar Admin Panel",
  description: "Emaar Admin Panel",
};

export default function GlobalStatistics() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* <!-- Statistics --> */}
      <div className="col-span-6 space-y-6 xl:col-span-4">
        <TypesCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <AreasCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <DoctorsCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <PharmacistsCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <AcceptedDoctorsVisitsStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <UnderReviewDoctorsVisitsStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <AcceptedPharmacistsVisitsStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <UnderReviewPharmacistsVisitsStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <AssociationsCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <MallsCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <HospitalsCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <VideosCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <BaseOffersCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <OffersCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <BaseGiftsCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <GiftsCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <SamplesCountStatistics />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <AcceptedOrdersCountStatisticts />
      </div>

      <div className="col-span-6 space-y-6 xl:col-span-4">
        <UnderReviewOrdersCountStatisticts />
      </div>
    </div>
  );
}
