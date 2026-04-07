"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button, ConfigProvider, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTypeStore } from "../../../../../stores/typesStore/data.store";
import AssistantDoctorVisits from "../../../components/sharedComponents/pagesComponents/assistantPage/assistantDoctorVisits/AssistantDoctorVisits";
import AssistantPharmacistsVisits from "../../../components/sharedComponents/pagesComponents/assistantPage/salesmanPharmacistVisits/AssistantPharmacistVisits";
import AssistantOrders from "../../../components/sharedComponents/pagesComponents/salesmanPage/salesmanOrders/SalesmanOrders";

export default function AssistantPage() {
    const params = useParams()
    const router = useRouter()
    const [activeKey, setActiveKey] = useState("1");
    const { typeD, getTypeData } = useTypeStore()
    useEffect(() => {
        getTypeData(Number(params?.id))
    }, [])

    const renderContent = () => {
        switch (activeKey) {
            /*   case "1":
                  return <div>
                      <AssistantSpecification profile_id={Number(params.id)}></AssistantSpecification>
                  </div>; */
            case "1":
                return <div>
                    <AssistantDoctorVisits profile_id={Number(params.id)}></AssistantDoctorVisits>
                </div>;
            case "2":
                return <div>
                    <AssistantPharmacistsVisits profile_id={Number(params.id)}></AssistantPharmacistsVisits>
                </div>
            case "3":
                return <div>
                    <AssistantOrders profile_id={Number(params.id)}></AssistantOrders>
                </div>
            default:
                return null;
        }
    };
    const tabsItems = [
        {
            label: <div>زيارات الأطباء</div>, key: "1",
        },
        {
            label: <div>زيارات الصيادلة</div>, key: "2",
        },
        {
            label: <div>الطلبات</div>, key: "3",
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