"use client";

import { Type } from "../../../../stores/types-store-interfaces";
import { useTypeStore } from "../../../../stores/typesStore/data.store";
import { useEffect, useState } from "react";
import { Input, InputNumber } from "antd";

export default function TypesSpecifications({
    name,
    admin_description,
    salesman_description,
    id,
    grouptype_id,
    brand,
    manufacturing_date,
    price_for_piece,
    percentage,
    online_percentage,
    quantity,
    type,
    delivery_percentage
}: Type) {

    const { TextArea } = Input;
    const { dataIngredientsForType, getIngredientsForType, dataGroupTypes } = useTypeStore();

    useEffect(() => { getIngredientsForType(+id); }, []);

    const grouptype = dataGroupTypes?.find(e => e.id == grouptype_id);

    const [page_name, setPageName] = useState(name);
    const [page_brand, setPageBrand] = useState(brand);
    const [page_grouptype_id, setPageGroupTypeId] = useState(grouptype?.name);
    const [page_admin_description, setAdminDescription] = useState(admin_description);
    const [page_salesman_description, setSalesmanDescription] = useState(salesman_description);
    const [page_manufacturing_date, setManufacturingDate] = useState(manufacturing_date.slice(0, 10));

    const [page_quantity, setQuantity] = useState<number | null>(quantity);
    const [page_price_for_piece, setPriceForPiece] = useState<number | null>(price_for_piece);
    const [page_percentage, setPercentage] = useState<number | null>(percentage);
    const [page_online_percentage, setOnlinePercentage] = useState<number | null>(online_percentage);
    const [page_delivery_percentage, setDeliveryPercentage] = useState<number | null>(delivery_percentage);

    return (
        <div className="grid grid-cols-12 gap-2">
            <div className="grid grid-cols-12 col-span-12 xl:col-span-6 gap-2">

                {/* BRAND */}
                <div className="col-span-12 xl:col-span-6">
                    <h3>براند الصنف :</h3>
                    <Input
                        value={page_brand}
                        onChange={(e) => setPageBrand(e.target.value)}
                    />
                </div>

                {/* NAME */}
                <div className="col-span-12 xl:col-span-6">
                    <h3>اسم الصنف :</h3>
                    <Input
                        value={page_name}
                        onChange={(e) => setPageName(e.target.value)}
                    />
                </div>

                {/* GROUP TYPE */}
                <div className="col-span-12 xl:col-span-6">
                    <h3>مجموعة الصنف :</h3>
                    <Input
                        value={page_grouptype_id}
                        onChange={(e) => setPageGroupTypeId(e.target.value)}
                    />
                </div>

                {/* MANUFACTURING DATE */}
                <div className="col-span-12 xl:col-span-6">
                    <h3>تاريخ التصنيع :</h3>
                    <Input
                        value={page_manufacturing_date}
                        onChange={(e) => setManufacturingDate(e.target.value)}
                    />
                </div>

                {/* QUANTITY */}
                <div className="col-span-12 sm:col-span-6">
                    <h3>الكمية :</h3>
                    <InputNumber
                        value={page_quantity}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(value) => setQuantity(value)}
                    />
                </div>

                {/* PRICE */}
                <div className="col-span-12 sm:col-span-6">
                    <h3>سعر القطعة :</h3>
                    <InputNumber
                        value={page_price_for_piece}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(value) => setPriceForPiece(value)}
                    />
                </div>

                {/* PERCENTAGE */}
                <div className="col-span-12 sm:col-span-6">
                    <h3>النسبة :</h3>
                    <InputNumber
                        value={page_percentage}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(value) => setPercentage(value)}
                    />
                </div>

                {/* ONLINE PERCENTAGE */}
                <div className="col-span-12 sm:col-span-6">
                    <h3>نسبة الأونلاين :</h3>
                    <InputNumber
                        value={page_online_percentage}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(value) => setOnlinePercentage(value)}
                    />
                </div>

                {/* DELIVERY PERCENTAGE */}
                <div className="col-span-12 sm:col-span-6">
                    <h3>نسبة التوصيل :</h3>
                    <InputNumber
                        value={page_delivery_percentage}
                        style={{ width: '100%' }}
                        min={0}
                        onChange={(value) => setDeliveryPercentage(value)}
                    />
                </div>
            </div>


            <div className="grid grid-cols-12 col-span-12 xl:col-span-6 gap-2">

                {/* ADMIN DESCRIPTION */}
                <div className="col-span-12">
                    <h3>وصف الإدارة :</h3>
                    <TextArea
                        value={page_admin_description}
                        onChange={(e) => setAdminDescription(e.target.value)}
                        rows={4}
                    />
                </div>

                {/* SALESMAN DESCRIPTION ✅ FIXED */}
                <div className="col-span-12">
                    <h3>وصف المندوبين :</h3>
                    <TextArea
                        value={page_salesman_description}
                        onChange={(e) => setSalesmanDescription(e.target.value)}
                        rows={4}
                    />
                </div>

                {/* INGREDIENTS */}
                {dataIngredientsForType?.map(e => (
                    <div key={e.id}>{e.name}</div>
                ))}

            </div>
        </div>
    );
}