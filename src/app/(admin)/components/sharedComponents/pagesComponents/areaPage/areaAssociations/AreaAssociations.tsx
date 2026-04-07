"use client";


import { AutoComplete, Button, Dropdown, Input, Modal, notification, Skeleton, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { usePlacesStore } from "../../../../../../../stores/placesStore/data.store";
import dynamic from "next/dynamic";
import { ColumnsType } from "antd/es/table";
import { useMedicalStore } from "../../../../../../../stores/medicalStore/data.store";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";
import { apiDoctor, apiAssociation, apiArea } from "../../../../../../../stores/apis";


export default function AreaAssociations({ profile_id }: profileComponent) {
    const { getGovernoratesData, dataGovernorates, getCitiesData, dataCities, getAreasData, dataAreas, getStreetsData, dataStreets } = usePlacesStore();
    const { dataAssociations, associationD, getAssociationData, deleteAssociationDoctor, addAssociationDoctor } = useMedicalStore()

    const Map = dynamic(
        () => import("../../../maps/map/Map"),
        { ssr: false }
    );

    const [pageLoading, setPageLoading] = useState(true);
    const [associations, setAssociations] = useState([])
    //to get orders data for this type only

    const [searchText, setSearchText] = useState("");
    const [association_id, setAssociationId] = useState(0);
    const [status_id, setStatusId] = useState(0);
    const [searchTextStatus, setSearchTextStatus] = useState("");

    const fetchDataAssociations = async () => {
        try {
            const res = await apiArea.get(`/associations/${profile_id}`);
            setAssociations(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchDataAssociations().finally(() => setPageLoading(false));
    }, [profile_id]);


    const [associationsNames, setAssociationsNames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    res,
                ] = await Promise.all([
                    apiAssociation.get('/names'),
                ]);
                setAssociationsNames(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    const [optionsAssociations, setOptionsAssociations] = useState(associationsNames?.map(e => { return { value: e.id, label: e.name } }));


    //Add Modal
    const [name, setName] = useState("");
    const [lan, setLan] = useState(0);
    const [lat, setLat] = useState(0);
    const [openLocationModal, setOpenLocationModal] = useState(false);

    //Edit Modal
    const [open1, setOpenEditModal] = useState(false);
    const [editedId, setEditedId] = useState(0)
    const [loading, setLoading] = useState(false);

    //Delete Modal 
    const [delitedID, setDelitedID] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading2, setLoading2] = useState(false);

    //Show Modal 
    const [shownId, setShownId] = useState(0);
    const [openShowModal, setOpenShowModal] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [items, setItems] = useState([])



    //Add Modal
    const { TextArea } = Input;
    const [admin_description, setAdminDescription] = useState("");
    const [salesman_description, setSalesmanDescription] = useState("");

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [city_id, setCityId] = useState(1);
    const [governorate_id, setGovernorateId] = useState(1);
    const [area_id, setAreaId] = useState(1);
    const [street_id, setStreetId] = useState(1);
    const [phone_number, setPhoneNumber] = useState("");
    const [telephone_number, setTelephoneNumber] = useState("");

    //emptyFields function
    const emptyFields = () => {
        setName("");
        setTelephoneNumber("");
        setPhoneNumber("");
        setAdminDescription("");
        setSearchText("")
        setSalesmanDescription("")
        setOpen(false);
    }


    //location Function
    async function OpenLocationModal(id: number) {
        const association = associations?.find(e => e.id == id)
        setLan(Number(association?.lan));
        setLat(Number(association?.lat));
        setOpenLocationModal(true);
    }

    //showModal 
    const OpenShowModal = (id: number) => {
        const Association = associations?.find(
            item => item.id === id
        );
        getAssociationData(Association?.association_id)
        setName(Association?.name)
        setSalesmanDescription(Association?.salesman_description)
        setAdminDescription(Association?.admin_description)
        setStreetId(Association?.street_id);
        setGovernorateId(Association?.governorate_id);
        setAreaId(Association?.area_id);
        setCityId(Association?.city_id)
        setPhoneNumber(Association?.phone_number)
        setTelephoneNumber(Association?.telephone_number)
        setOpenShowModal(true);
    }

    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: 'left',
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "الجمعية",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },

        {
            title: "المدينة",
            dataIndex: "city_id",
            sorter: (a: any, b: any) => Number(a.city_id) - Number(b.city_id),
            render: (value: number) => {
                return dataCities?.find(e => e.id == Number(value))?.name;
            }
        },

        {
            title: "المنطقة",
            dataIndex: "area_id",
            sorter: (a: any, b: any) => Number(a.area_id) - Number(b.area_id),
            render: (value: number) => {
                return dataAreas?.find(e => e.id == Number(value))?.name;
            }
        },
        {
            title: "الشارع",
            dataIndex: "street_id",
            sorter: (a: any, b: any) => Number(a.street_id) - Number(b.street_id),
            render: (value: number) => {
                return dataStreets?.find(e => e.id == Number(value))?.name;
            }
        },
        {
            title: "تاريخ الإضافة",
            dataIndex: "created_at",
            sorter: (a: any, b: any) => a.created_at.localeCompare(b.created_at),
            render: (value: string) => { return value.slice(0, 10) }

        },
        {

            title: "",
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button
                        color="blue"
                        variant="outlined"
                        onClick={() => { OpenLocationModal(record.id); }}
                    >
                        موقع
                    </Button>
                </Space>
            ),
        },
        {
            title: "",
            fixed: 'right',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Button
                        variant="solid"
                        color="cyan"
                        onClick={() => OpenShowModal(record.id)}
                    >
                        عرض
                    </Button>
                </Space>
            ),
        }
    ];

    return <div>
        {/* Show Modal */}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>تفاصيل الجمعية</span>
                </div>
            }
            open={openShowModal}
            onOk={() => emptyFields()}
            okButtonProps={{ variant: "outlined", color: "cyan" }}

            onCancel={() => { setOpenShowModal(false); emptyFields() }}
            confirmLoading={loading}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        اسم الجمعية
                    </h3>
                    <Input
                        disabled
                        value={associationD?.name}
                        placeholder="اسم الجمعية"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        رقم الهاتف  :
                    </h3>
                    <Input
                        disabled
                        value={associationD?.phone_number}
                        placeholder="رقم الهاتف"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        رقم الأرضي  :
                    </h3>
                    <Input
                        disabled
                        value={associationD?.telephone_number}
                        placeholder="رقم الأرضي"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        المحافظة  :
                    </h3>
                    <Input
                        disabled
                        value={dataGovernorates?.find(e => e?.id == associationD?.governorate_id)?.name}
                        placeholder="المحافظة"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        المدينة  :
                    </h3>
                    <Input
                        disabled
                        value={dataCities?.find(e => e?.id == associationD?.city_id)?.name}
                        placeholder="المدينة"
                    />
                </div>


                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        المنطقة  :
                    </h3>
                    <Input
                        disabled
                        value={dataAreas?.find(e => e?.id == associationD?.area_id)?.name}
                        placeholder="المنطقة"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        الشارع  :
                    </h3>
                    <Input
                        disabled
                        value={dataStreets?.find(e => e?.id == associationD?.street_id)?.name}
                        placeholder="الشارع"
                    />
                </div>


                <div className="col-span-12">
                    <h3>
                        وصف الإدارة :
                    </h3>
                    <TextArea
                        disabled
                        value={associationD?.admin_description}
                        onChange={(e) => setAdminDescription(e.target.value)}
                        placeholder="وصف الإدارة"
                    />
                </div>

                <div className="col-span-12">
                    <h3>
                        وصف المندوبين :
                    </h3>
                    <TextArea
                        disabled
                        value={associationD?.salesman_description}
                        onChange={(e) => setSalesmanDescription(e.target.value)}
                        placeholder="وصف المندوبين"
                    />
                </div>

            </div>
        </Modal>

        {/*Location Modal*/}
        <Modal
            title="الموقع"
            open={openLocationModal}
            onOk={() => setOpenLocationModal(false)}
            onCancel={() => setOpenLocationModal(false)}
            // confirmLoading={loading4}
            mask={false}
            okButtonProps={{ type: "primary", variant: "outlined" }}
        >
            <div className="w-full h-[400]">
                <Map lan={lan} lat={lat}></Map>

            </div>
        </Modal>

        {
            (pageLoading) ? <Skeleton className="h-full w-full" paragraph={{ rows: 10 }} />
                :
                <Table
                    scroll={{ x: "max-content" }}
                    columns={columns} dataSource={associations}
                    pagination={{
                        position: ["topRight"],
                    }} />
        }
    </div>
}
