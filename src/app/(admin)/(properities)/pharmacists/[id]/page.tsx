"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button, ConfigProvider, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTypeStore } from "../../../../../stores/typesStore/data.store";
import PharmacistSpecification from "../../../components/sharedComponents/pagesComponents/pharmacistPage/pharmacistSpecifications/PharmacistSpecifications";
import PharmacistVisits from "../../../components/sharedComponents/pagesComponents/pharmacistPage/pharmacistVisits/PharmacistVisits";
import PharmacistSamples from "../../../components/sharedComponents/pagesComponents/pharmacistPage/pharmacistSamples/PharmacistSamples";
import PharmacistNotes from "../../../components/sharedComponents/pagesComponents/pharmacistPage/pharmacistNotes/PharmacistNotes";
import PharmacistGifts from "../../../components/sharedComponents/pagesComponents/pharmacistPage/pharmacistGifts/PharmacistGifts";
import PharmacistOrders from "../../../components/sharedComponents/pagesComponents/pharmacistPage/pharmacistOrders/pharmacistOrders";


export default function PharmacistPage() {
    const params = useParams()
    const router = useRouter()
    const [activeKey, setActiveKey] = useState("1");
    const { typeD, getTypeData } = useTypeStore()
    useEffect(() => {
        getTypeData(Number(params?.id))
    }, [])

    const renderContent = () => {
        switch (activeKey) {
            case "1":
                return <div>
                    <PharmacistSpecification profile_id={Number(params.id)}></PharmacistSpecification>
                </div>;
            case "2":
                return <div>
                    <PharmacistVisits profile_id={Number(params.id)}></PharmacistVisits>
                </div>;
            case "3":
                return <div>
                    <PharmacistSamples profile_id={Number(params.id)}></PharmacistSamples>
                </div>
            case "4":
                return <div>
                    <PharmacistNotes profile_id={Number(params.id)}></PharmacistNotes>
                </div>
            case "5":
                return <div>
                    <PharmacistGifts profile_id={Number(params.id)}></PharmacistGifts>
                </div>
            case "6":
                return <div>
                    <PharmacistOrders profile_id={Number(params.id)}></PharmacistOrders>
                </div>
            default:
                return null;
        }
    };
    const tabsItems = [
        {
            label: <div>معلومات الطبيب</div>, key: "1",
        },
        {
            label: <div>الزيارات</div>, key: "2",
        },
        {
            label: <div>العينات</div>, key: "3",
        },
        {
            label: <div>الملاحظات</div>, key: "4",
        },
        {
            label: <div>الهدايا</div>, key: "5",
        },
        {
            label: <div>الطلبات</div>, key: "6",
        }
    ]
    return <div className="col-span-12">
        <Button onClick={() => router.back()}>
            رجوع
        </Button>
        <ConfigProvider direction="rtl" >
            <Tabs
                defaultActiveKey="1"
                tabPlacement={'top'}
                onChange={setActiveKey}
                style={{
                    borderColor: "#592C46",
                    //    color:
                }}
                items={tabsItems}
                tabBarStyle={{ height: 50, maxWidth: "100%", marginRight: 0 }}
            />
        </ConfigProvider>

        {/* Content in another place */}
        <div style={{ padding: 20, maxHeight: 200, maxWidth: '100%', }}>
            {renderContent()}
        </div>

    </div>
}