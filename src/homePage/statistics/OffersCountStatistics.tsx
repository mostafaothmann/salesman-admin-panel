"use client";
import { useEffect, useState } from "react";
import { Area, ArrowUpIcon, Building2Icon, DoctorVisit, Offer } from "../../icons";
import { Badge } from "antd";
import { useMedicalStore } from "../../stores/medicalStore/data.store";
import { usePlacesStore } from "../../stores/placesStore/data.store";
import { apiDoctorVisit, apiOffer, apiVisit } from "../../stores/apis";

export default function OffersCountStatistics() {

    const [res, setRes] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiRes = await apiOffer.get(`/show`);
                setRes(apiRes.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    },);
    return (
        <div className="w-full grid grid-cols-4 gap-4 sm:grid-cols-2 md:gap-6">
            {/* <!-- Metric Item Start --> */}
            <div className="w-full col-span-full rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <Offer className="text-gray-800 size-6 dark:text-white/90" />
                </div>
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          العروض المباعة
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            {res?.length}
                        </h4>
                    </div>
                   
                </div>
            </div>
            {/* <!-- Metric Item End --> */}

        </div>
    );
};
