"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { useMedicalStore } from "../../../../../stores/medicalStore/data.store";
import { TypeSpecializationsChart } from "../../../../../sharedComponents/pagesComponents/typeSpecializationsChart/TypeSpecializationsChart";
import { Button, Tabs } from "antd";
export default function TypesPage() {
    const params = useParams()
    const router = useRouter()

    const tabsItems = [{
        label: <div>الاختصاصات </div>, key: "0",
        children: <TypeSpecializationsChart id={Number(params.id)}></TypeSpecializationsChart>
    },/*
    {
        label: <div>زيارات الأطباء بالصنف</div>, key: "1",
        children: <div>
            {dataSpecializationForType?.map(e => {
                return <div> <div>doctor visits {e.id}</div>
                    {e.name}
                </div>
            })}</div>
    }, 
         {
             label: <div> زيارات الصيادلة بالصنف</div>, key: "2",
             children: <div>
                 {dataSpecializationForType?.map(e => {
                     return <div> <div>specialization {e.id}</div>
                         {e.name}
                     </div>
                 })}</div>
         }
             ,
         {
             label: <div>مكونات الصنف</div>, key: "3",
             // onclick:()=>getSpecializationForType,
             children: <div>
                 {[() => getSpecializationForType(Number(params.id))]?.map(e => {
                     return <div> <div>specialization {e.name}</div>
                         {e.name}
                     </div>
                 })}</div>
         } */
    ]
    return <div className="col-span-12">
        <Button onClick={() => router.back()}>
            رجوع
        </Button>
        <Tabs
            defaultActiveKey="1"
            tabPlacement={'top'}
            centered={true}
            style={{ height: '100%', maxWidth: '100%', alignContent: 'center', alignItems: 'center' }}
            items={tabsItems}
            //      indicator={{ size: (origin) => origin - 20, align: 'start' }}
            tabBarStyle={{ height: 200, maxWidth: 200 }}
        />
    </div>
}