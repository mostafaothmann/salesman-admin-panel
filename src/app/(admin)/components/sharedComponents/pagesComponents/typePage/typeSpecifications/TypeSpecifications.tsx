"use client";

import { Type } from "../../../../../../../stores/types-store-interfaces";
import { useTypeStore } from "../../../../../../../stores/typesStore/data.store";
import { useEffect, useState } from "react";
import { Divider, Input, InputNumber, Skeleton } from "antd";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";
import { apiType } from "../../../../../../../stores/apis";

export default function TypesSpecifications({ profile_id }: profileComponent) {

    const { TextArea } = Input;
    const { dataGroupTypes } = useTypeStore();
    const [typeD, setTypeData] = useState(null)
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    typeData
                ] = await Promise.all([
                    apiType.get(`/${profile_id}`),
                ]);
                setTypeData(typeData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData().finally(() => setPageLoading(false));
    }, []);



    const [grouptype, setGroupType] = useState<object | null>(null)
    const [page_name, setName] = useState<string | null>();
    const [page_brand, setBrand] = useState<string | null>();
    const [page_grouptype_id, setGroupTypeId] = useState<string | null>();
    const [page_admin_description, setAdminDescription] = useState<string | null>();
    const [page_salesman_description, setSalesmanDescription] = useState<string | null>();
    const [page_manufacturing_date, setManufacturingDate] = useState<string | null>();

    const [page_type, setType] = useState<number | null>();

    const [page_price_for_sale, setPriceForSale] = useState<number | null>();
    const [page_quantity, setQuantity] = useState<number | null>();
    const [page_price_for_piece, setPriceForPiece] = useState<number | null>();
    const [page_percentage, setPercentage] = useState<number | null>();
    const [page_online_percentage, setOnlinePercentage] = useState<number | null>();
    const [page_delivery_percentage, setDeliveryPercentage] = useState<number | null>();

    useEffect(() => {
        if (!typeD) return;

        setName(typeD.name || "");
        setBrand(typeD.brand || "");
        setGroupTypeId(typeD.grouptype_id || null);
        setAdminDescription(typeD.admin_description || "");
        setSalesmanDescription(typeD.salesman_description || "");
        setManufacturingDate(typeD.manufacturing_date?.slice(0, 10) || "");

        setType(typeD.type ?? null);
        setPriceForSale(typeD.price_for_sale ?? null);
        setQuantity(typeD.quantity ?? null);
        setPriceForPiece(typeD.price_for_piece ?? null);
        setPercentage(typeD.percentage ?? null);
        setOnlinePercentage(typeD.online_percentage ?? null);
        setDeliveryPercentage(typeD.delivery_percentage ?? null);
        setGroupType(dataGroupTypes?.find(e => e.id == typeD.grouptype_id));


    }, [typeD]);
    return (pageLoading) ? <Skeleton className="h-full w-full" paragraph={{ rows: 10 }} />
        :
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white p-5 shadow-md border border-gray-100">

                {/* LEFT SIDE */}
                <div className="grid grid-cols-12 col-span-12 xl:col-span-6 gap-4">

                    {/* BRAND */}
                    <div className="col-span-12 xl:col-span-6">
                        <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                            براند الصنف :
                        </h3>
                        <Input
                            value={page_brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700"
                        />
                    </div>

                    {/* NAME */}
                    <div className="col-span-12 xl:col-span-6">
                        <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                            اسم الصنف :
                        </h3>
                        <Input
                            value={page_name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700"
                        />
                    </div>

                    {/* GROUP TYPE */}
                    <div className="col-span-12 xl:col-span-6">
                        <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                            مجموعة الصنف :
                        </h3>
                        <Input
                            value={page_grouptype_id}
                            onChange={(e) => setGroupTypeId(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700"
                        />
                    </div>

                    {/* TYPE */}
                    <div className="col-span-12 xl:col-span-6 w-full">
                        <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                            نوع الصنف :
                        </h3>
                        <InputNumber
                            className="w-full bg-gray-50 border border-gray-200 text-gray-700"
                            value={page_type}
                            onChange={(value) => setType(value)}
                        />
                    </div>

                    {/* MANUFACTURING DATE */}
                    <div className="col-span-12 xl:col-span-6">
                        <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                            تاريخ التصنيع :
                        </h3>
                        <Input
                            value={page_manufacturing_date}
                            onChange={(e) => setManufacturingDate(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700"
                        />
                    </div>

                    { /* QUANTITY (unchanged) */}

                    { /* PRICE (unchanged) */}

                </div>

                {/* RIGHT SIDE */}
                <div className="grid grid-cols-12 col-span-12 xl:col-span-6 gap-4">

                    {/* ADMIN DESCRIPTION */}
                    <div className="col-span-12">
                        <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                            وصف الإدارة :
                        </h3>
                        <TextArea
                            value={page_admin_description}
                            onChange={(e) => setAdminDescription(e.target.value)}
                            rows={4}
                            className="bg-gray-50 border border-gray-200 text-gray-700"
                        />
                    </div>

                    {/* SALESMAN DESCRIPTION */}
                    <div className="col-span-12">
                        <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                            وصف المندوبين :
                        </h3>
                        <TextArea
                            value={page_salesman_description}
                            onChange={(e) => setSalesmanDescription(e.target.value)}
                            rows={4}
                            className="bg-gray-50 border border-gray-200 text-gray-700"
                        />
                    </div>

                </div>

            </div>
        </div>

}