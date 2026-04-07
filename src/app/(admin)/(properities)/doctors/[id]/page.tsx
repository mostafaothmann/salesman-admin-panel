"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Button, ConfigProvider, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useTypeStore } from "../../../../../stores/typesStore/data.store";
import DoctorSpecification from "../../../components/sharedComponents/pagesComponents/doctorPage/doctorSpecifications/DoctorSpecifications";
import DoctorVisits from "../../../components/sharedComponents/pagesComponents/doctorPage/doctorVisits/DoctorVisits";
import DoctorSamples from "../../../components/sharedComponents/pagesComponents/doctorPage/doctorSamples/DoctorSamples";
import DoctorNotes from "../../../components/sharedComponents/pagesComponents/doctorPage/doctorNotes/DoctorNotes";
import DoctorAssociations from "../../../components/sharedComponents/pagesComponents/doctorPage/doctorAssociations/DotorAssociations";
import DoctorHospitals from "../../../components/sharedComponents/pagesComponents/doctorPage/doctorHospitals/DoctorHospitals";
import DoctorPharmacists from "../../../components/sharedComponents/pagesComponents/doctorPage/doctorPharmacists/DoctorPharmacists";
import DoctorGifts from "../../../components/sharedComponents/pagesComponents/doctorPage/doctorGifts/DoctorGifts";


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
            case "1":
                return <div>
                    <DoctorSpecification profile_id={Number(params.id)}></DoctorSpecification>
                </div>;
            case "2":
                return <div>
                    <DoctorVisits profile_id={Number(params.id)}></DoctorVisits>
                </div>;
            case "3":
                return <div>
                    <DoctorSamples profile_id={Number(params.id)}></DoctorSamples>
                </div>
            case "4":
                return <div>
                    <DoctorNotes profile_id={Number(params.id)}></DoctorNotes>
                </div>

            case "5":
                return <div>
                    <DoctorAssociations profile_id={Number(params.id)}></DoctorAssociations>
                </div>

            case "6":
                return <div>
                    <DoctorHospitals profile_id={Number(params.id)}></DoctorHospitals>
                </div>
            case "7":
                return <div>
                    <DoctorPharmacists profile_id={Number(params.id)}></DoctorPharmacists>
                </div>
            case "8":
                return <div>
                    <DoctorGifts profile_id={Number(params.id)}></DoctorGifts>
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
            label: <div>الجمعيات</div>, key: "5",
        },
        {
            label: <div>المستشفيات</div>, key: "6",
        },
        {
            label: <div>الصيدليات</div>, key: "7",
        }
        ,
        {
            label: <div>الهدايا</div>, key: "8",
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