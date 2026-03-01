"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { TypeSpecializations } from "../../../../../sharedComponents/pagesComponents/typePage/typeSpecializations/TypeSpecializations";
import { Button, ConfigProvider, Tabs } from "antd";
import { useEffect, useState } from "react";
import TypesSpecifications from "../../../../../sharedComponents/pagesComponents/typePage/typeSpecifications/TypeSpecifications";
import { useTypeStore } from "../../../../../stores/typesStore/data.store";
export default function TypePage() {
    const params = useParams()
    const router = useRouter()
    const [activeKey, setActiveKey] = useState("1");
    const {typeD,getTypeData}=useTypeStore()
    useEffect(()=>{getTypeData(Number(params?.id))},[])

    const renderContent = () => {
        switch (activeKey) {
            case "1":
                return <div>
                      <TypesSpecifications {...typeD}></TypesSpecifications>
                </div>;
            case "2":
                return <div>
                    <TypeSpecializations id={Number(params.id)}></TypeSpecializations>
                </div>;
            case "3":
                return <div>Content of Tab 4</div>;
            default:
                return null;
        }
    };
    const tabsItems = [
        {
            label: <div>خصائص الصنف</div>, key: "1",

        },
        {
            label: <div>  الاختصاصات </div>, key: "2",

        },
        {
            label: <div>طلبات الصنف</div>, key: "3",

        },
        {
            label: <div>طلبات الأونلاين للصنف</div>, key: "4",

        },
        {
            label: <div>زيارات الأطباء بالصنف</div>, key: "5",

        },
        {
            label: <div> زيارات الصيادلة بالصنف</div>, key: "6",

        },
        {
            label: <div>مكونات الصنف</div>, key: "7",

        },
        {
            label: <div> عينات الصيادلة</div>, key: "8",

        },
        {
            label: <div> عينات الأطباء</div>, key: "9",

        },

        {
            label: <div>الأطباء</div>, key: "11",

        },
        {
            label: <div>الصيادلة</div>, key: "12",

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