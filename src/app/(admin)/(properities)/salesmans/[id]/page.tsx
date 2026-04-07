"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button, ConfigProvider, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTypeStore } from "../../../../../stores/typesStore/data.store";
import SalesmanPharmacistSamples from "../../../components/sharedComponents/pagesComponents/salesmanPage/salesmanPharmacistSamples/SalesmanPharmacistSamples";
import SalesmanDoctorSamples from "../../../components/sharedComponents/pagesComponents/salesmanPage/salesmanDoctorSamples/SalesmanDoctorSamples";
import SalesmanDoctorVisits from "../../../components/sharedComponents/pagesComponents/salesmanPage/salesmanDoctorVisits/SalesmanDoctorVisits";
import SalesmanPharmacistVisits from "../../../components/sharedComponents/pagesComponents/salesmanPage/salesmanPharmacistVisits/SalesmanPharmacistVisits";
import SalesmanDoctorGifts from "../../../components/sharedComponents/pagesComponents/salesmanPage/salesmanDoctorGifts/SalesmanDoctorGifts";
import SalesmanPharmacistGifts from "../../../components/sharedComponents/pagesComponents/salesmanPage/salesmanPharmacistGifts/SalesmanPharmacistGifts";
import SalesmanOrders from "../../../components/sharedComponents/pagesComponents/salesmanPage/salesmanOrders/SalesmanOrders";
import SalesmanAreas from "../../../components/sharedComponents/pagesComponents/salesmanPage/salesmanAreas/SalesmanAreas";


export default function DoctorPage() {
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
                      <DoctorSpecification profile_id={Number(params.id)}></DoctorSpecification>
                  </div>; */
            case "1":
                return <div>
                    <SalesmanDoctorVisits profile_id={Number(params.id)}></SalesmanDoctorVisits>
                </div>;
            case "2":
                return <div>
                    <SalesmanDoctorSamples profile_id={Number(params.id)}></SalesmanDoctorSamples>
                </div>
            case "3":
                return <div>
                    <SalesmanDoctorGifts profile_id={Number(params.id)}></SalesmanDoctorGifts>
                </div>
            case "4":
                return <div>
                    <SalesmanPharmacistVisits profile_id={Number(params.id)}></SalesmanPharmacistVisits>
                </div>
            case "5":
                return <div>
                    <SalesmanPharmacistSamples profile_id={Number(params.id)}></SalesmanPharmacistSamples>
                </div>
            case "6":
                return <div>
                    <SalesmanPharmacistGifts profile_id={Number(params.id)}></SalesmanPharmacistGifts>
                </div>
            case "7":
                return <div>
                    <SalesmanAreas profile_id={Number(params.id)}></SalesmanAreas>
                </div>
            case "8":
                return <div>
                    <SalesmanOrders profile_id={Number(params.id)}></SalesmanOrders>
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
            label: <div> عينات الأطباء</div>, key: "2",
        },
        {
            label: <div>هدايا الأطباء</div>, key: "3",
        },
        {
            label: <div>زيارات الصيادلة</div>, key: "4",
        },
        {
            label: <div> عينات الصيادلة</div>, key: "5",
        },
        {
            label: <div>هدايا الصيادلة</div>, key: "6",
        },
        {
            label: <div>المناطق</div>, key: "7",
        },
        {
            label: <div>الطلبات</div>, key: "8",
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