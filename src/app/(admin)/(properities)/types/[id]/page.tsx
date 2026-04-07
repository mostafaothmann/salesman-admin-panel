"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { TypeSpecializations } from "../../../components/sharedComponents/pagesComponents/typePage/typeSpecializations/TypeSpecializations";
import { Button, ConfigProvider, Tabs } from "antd";
import { useEffect, useState } from "react";
import TypesSpecifications from "../../../components/sharedComponents/pagesComponents/typePage/typeSpecifications/TypeSpecifications";
import { useTypeStore } from "../../../../../stores/typesStore/data.store";
import TypeProducts from "../../../components/sharedComponents/pagesComponents/typePage/typeProducts/TypeProducts";
import TypeDoctorsVisits from "../../../components/sharedComponents/pagesComponents/typePage/typeDoctorsVisits/TypeDoctorsVisits";
import TypePharmacistsVisits from "../../../components/sharedComponents/pagesComponents/typePage/typePhramacistsVisits/TypePharmacistsVisits";
import TypeDoctorsSamples from "../../../components/sharedComponents/pagesComponents/typePage/typeDoctorsSamples/TypeDoctorsSamples";
import TypePharmacistsSamples from "../../../components/sharedComponents/pagesComponents/typePage/typePharmacistsSamples/TypePharmacistsSamples";
import TypeBaseOffers from "../../../components/sharedComponents/pagesComponents/typePage/typeBaseOffers/TypeBaseOffers";
import TypeOrdersPage from "../../../components/sharedComponents/pagesComponents/typePage/typeOrders/TypeOrders";
import TypeOrders from "../../../components/sharedComponents/pagesComponents/typePage/typeOrders/TypeOrders";


export default function TypePage() {
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
                    <TypesSpecifications profile_id={Number(params.id)}></TypesSpecifications>
                </div>;
            case "2":
                return <div>
                    <TypeSpecializations profile_id={Number(params.id)}></TypeSpecializations>
                </div>;
            case "3":
                return <div>
                    <TypeBaseOffers profile_id={Number(params.id)}></TypeBaseOffers>
                </div>
            case "4":
                return <div>
                    <TypeOrders profile_id={Number(params.id)}></TypeOrders>
                </div>
            case "5":
                return <div>
                    <TypeDoctorsVisits profile_id={Number(params.id)}></TypeDoctorsVisits>
                </div>
            case "6":
                return <div>
                    <TypePharmacistsVisits profile_id={Number(params.id)}></TypePharmacistsVisits>
                </div>
            case "7":
                return <div>
                    <TypeDoctorsSamples profile_id={Number(params.id)}></TypeDoctorsSamples>
                </div>
            case "8":
                return <div>
                    <TypePharmacistsSamples profile_id={Number(params.id)}></TypePharmacistsSamples>
                </div>
            default:
                return null;
        }
    };
    const tabsItems = [
        {
            label: <div>خصائص الصنف</div>, key: "1",
        },
        {
            label: <div>الاختصاصات</div>, key: "2",
        },
        {
            label: <div>العروض الأساسية</div>, key: "3",
        },
        {
            label: <div>الطلبات</div>, key: "4",
        },
        {
            label: <div>زيارات الأطباء</div>, key: "5",
        },
        {
            label: <div>زيارات الصيادلة</div>, key: "6",
        },
        {
            label: <div> عينات الأطباء</div>, key: "7",
        },
        {
            label: <div> عينات الصيادلة</div>, key: "8",
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