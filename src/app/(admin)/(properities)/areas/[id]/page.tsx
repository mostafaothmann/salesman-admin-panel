"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button, ConfigProvider, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTypeStore } from "../../../../../stores/typesStore/data.store";
import AreaHospitals from "../../../components/sharedComponents/pagesComponents/areaPage/areaHospitals/AreaHospitals";
import AreaAssociations from "../../../components/sharedComponents/pagesComponents/areaPage/areaAssociations/AreaAssociations";
import AreaStreets from "../../../components/sharedComponents/pagesComponents/areaPage/areaStreets/AreaStreets";
import AreaMalls from "../../../components/sharedComponents/pagesComponents/areaPage/areaMalls/AreaMalls";
import AreaDoctorVisits from "../../../components/sharedComponents/pagesComponents/areaPage/areaDoctorVisits/AreaDoctorVisits";
import AreaPharmacistsVisits from "../../../components/sharedComponents/pagesComponents/areaPage/areaPharmacistVisits/AreaPharmacistVisits";
import AreaDoctors from "../../../components/sharedComponents/pagesComponents/areaPage/areaDoctors/AreaDoctors";
import AreaPharmacists from "../../../components/sharedComponents/pagesComponents/areaPage/areaPharmacists/AreaPharmacists";
import AreaDoctorSamples from "../../../components/sharedComponents/pagesComponents/areaPage/areaDoctorSamples/AreaDoctorSamples";
import AreaPharmacistSamples from "../../../components/sharedComponents/pagesComponents/areaPage/areaPharmacistSamples/AreaPharmacistSamples";
import AreaDoctorGifts from "../../../components/sharedComponents/pagesComponents/areaPage/areaDoctorGifts/AreaDoctorGifts";
import AreaPharmacistGifts from "../../../components/sharedComponents/pagesComponents/areaPage/areaPharmacistGifts/AreaPharmacistGifts";
import AreaOrders from "../../../components/sharedComponents/pagesComponents/areaPage/areaOrders/AreaOrders";

export default function AreaPag() {
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
                    <AreaDoctors profile_id={Number(params.id)}></AreaDoctors>
                </div>;
            case "2":
                return <div>
                    <AreaPharmacists profile_id={Number(params.id)}></AreaPharmacists>
                </div>;
            case "3":
                return <div>
                    <AreaDoctorVisits profile_id={Number(params.id)}></AreaDoctorVisits>
                </div>;
            case "4":
                return <div>
                    <AreaPharmacistsVisits profile_id={Number(params.id)}></AreaPharmacistsVisits>
                </div>
            case "5":
                return <div>
                    <AreaMalls profile_id={Number(params.id)}></AreaMalls>
                </div>
            case "6":
                return <div>
                    <AreaHospitals profile_id={Number(params.id)}></AreaHospitals>
                </div>;
            case "7":
                return <div>
                    <AreaAssociations profile_id={Number(params.id)}></AreaAssociations>
                </div>
            case "8":
                return <div>
                    <AreaStreets profile_id={Number(params.id)}></AreaStreets>
                </div>
            case "9":
                return <div>
                    <AreaDoctorSamples profile_id={Number(params.id)}></AreaDoctorSamples>
                </div>
            case "10":
                return <div>
                    <AreaPharmacistSamples profile_id={Number(params.id)}></AreaPharmacistSamples>
                </div>
            case "11":
                return <div>
                    <AreaDoctorGifts profile_id={Number(params.id)}></AreaDoctorGifts>
                </div>
            case "12":
                return <div>
                    <AreaPharmacistGifts profile_id={Number(params.id)}></AreaPharmacistGifts>
                </div>
            case "13":
                return <div>
                    <AreaOrders profile_id={Number(params.id)}></AreaOrders>
                </div>
            default:
                return null;
        }
    };
    const tabsItems = [
        {
            label: <div>الأطباء</div>, key: "1",
        },
        {
            label: <div>الصيادلة</div>, key: "2",
        },
        {
            label: <div>زيارات الأطباء</div>, key: "3",
        },
        {
            label: <div>زيارات الصيادلة</div>, key: "4",
        },
        {
            label: <div>المولات</div>, key: "5",
        },
        {
            label: <div>المشافي</div>, key: "6",
        },
        {
            label: <div>الجمعيات</div>, key: "7",
        },
        {
            label: <div>الشوارع</div>, key: "8",
        },
        {
            label: <div>عينات الأطباء</div>, key: "9",
        },
        {
            label: <div>عينات الصيادلة</div>, key: "10",
        },
        {
            label: <div>هدايا الأطباء</div>, key: "11",
        },
        {
            label: <div>هدايا الصيادلة</div>, key: "12",
        },
        {
            label: <div>الطلبات</div>, key: "13",
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