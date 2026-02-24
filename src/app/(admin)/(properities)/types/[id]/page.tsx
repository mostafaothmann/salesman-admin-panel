"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { useMedicalStore } from "../../../../../stores/medicalStore/data.store";
import { TypeSpecializationsChart } from "../../../../../sharedComponents/pagesComponents/typeSpecializationsChart/TypeSpecializationsChart";
import { Button, Tabs } from "antd";
import { useState } from "react";
export default function TypePage() {
    const params = useParams()
    const router = useRouter()
    const [activeKey, setActiveKey] = useState("1");
    const renderContent = () => {
        switch (activeKey) {
            case "0":
                return <div>
                    <TypeSpecializationsChart id={Number(params.id)}></TypeSpecializationsChart>
                </div>;
            case "1":
                return <div>

                </div>;
            case "2":
                return <div>Content of Tab 3</div>;
            case "3":
                return <div>Content of Tab 4</div>;
            default:
                return null;
        }
    };
    const tabsItems = [{
        label: <div>  الاختصاصات </div>, key: "0",

    },
    {
        label: <div>زيارات الأطباء بالصنف</div>, key: "1",

    },
    {
        label: <div> زيارات الصيادلة بالصنف</div>, key: "2",

    },
    {
        label: <div>مكونات الصنف</div>, key: "3",

    },
    {
        label: <div> عينات الصيادلة</div>, key: "4",

    },
    {
        label: <div> عينات الأطباء</div>, key: "5",

    }
        ,
    {
        label: <div>خصائص الصنف</div>, key: "6",

    },
    {
        label: <div>الأطباء</div>, key: "7",

    },
    {
        label: <div>الصيادلة</div>, key: "8",

    }
    ]
    return <div className="col-span-12">
        <Button onClick={() => router.back()}>
            رجوع
        </Button>
        <Tabs
            defaultActiveKey="1"
            tabPlacement={'top'}
            onChange={setActiveKey}
            centered={true}
            style={{}}
            items={tabsItems}
            tabBarStyle={{ height: 50, maxWidth: "100%" }}
        />

        {/* Content in another place */}
        <div style={{ padding: 20, maxHeight: 200, maxWidth: '100%', }}>
            {renderContent()}
        </div>

    </div>
}