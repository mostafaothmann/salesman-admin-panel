"use client";


import { AutoComplete, Button, Dropdown, Input, Modal, notification, Skeleton, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { usePlacesStore } from "../../../../../../../stores/placesStore/data.store";
import dynamic from "next/dynamic";
import { ColumnsType } from "antd/es/table";
import { useMedicalStore } from "../../../../../../../stores/medicalStore/data.store";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";
import { apiDoctor, apiPharmacist } from "../../../../../../../stores/apis";


export default function DoctorPharmacists({ profile_id }: profileComponent) {
    const { getGovernoratesData, dataGovernorates, getCitiesData, dataCities, getAreasData, dataAreas, getStreetsData, dataStreets } = usePlacesStore();
    const { dataPharmacists, pharmacistD, getPharmacistData, deleteDoctorPharmacist, getPharmacistsData, editPharmacist, deletePharmacist, addPharmacist, addDoctorPharmacist } = useMedicalStore()

    const Map = dynamic(
        () => import("../../../maps/map/Map"),
        { ssr: false }
    );

    const [pageLoading, setPageLoading] = useState(true);
    const [pharmacists, setPharmacists] = useState([])
    //to get orders data for this type only

    const [searchText, setSearchText] = useState("");
    const [pharmacist_id, setPharmacistId] = useState(0);
    const [status_id, setStatusId] = useState(0);
    const [searchTextStatus, setSearchTextStatus] = useState("");

    const fetchDataPharmacists = async () => {
        try {
            const res = await apiDoctor.get(`/pharmacists/${profile_id}`);
            setPharmacists(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchDataPharmacists().finally(() => setPageLoading(false));
    }, [profile_id]);


    const [pharmacistsNames, setPharmacistsNames] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    res,
                ] = await Promise.all([
                    apiPharmacist.get('/fullname'),
                ]);
                setPharmacistsNames(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    const [optionsPharmacists, setOptionsPharmacists] = useState(pharmacistsNames?.map(e => { return { value: e.id, label: e.name } }));


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


    async function changeOpenModalAdd() {
        emptyFields();
        setOptionsPharmacists(pharmacistsNames?.map(e => { return { value: e.id, label:`${e.first_name} ${e.last_name}` } }))
        setOpen(true);
    }



    //addPharmacist Function
    async function handleAdd() {


        try {
            const res = await addDoctorPharmacist({
                doctor_id: profile_id,
                pharmacist_id: pharmacist_id
            })
            if (res?.status == 201) {
                notification.success({
                    message: "نجاح",
                    description: "تمت العملية بنجاح",
                    placement: 'bottomLeft'
                });
            } else if (res?.status == 500) {
                notification.error({
                    message: "خطأ",
                    description: "حدث خطأ في الاتصال بالسيرفر",
                    placement: 'bottomLeft'
                });
            }
            else {
                notification.error({
                    title: "فشل",
                    description: "فشل العملية",
                    placement: 'bottomLeft'
                });
            }
        } catch (error) {
            notification.error({
                message: "فشل",
                description: "فشل العملية",
                placement: 'bottomLeft'
            });
        }
        emptyFields();
        fetchDataPharmacists()
        setOpen(false)
    }


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
        const pharmacist = pharmacists?.find(e => e.id == id)
        setLan(Number(pharmacist?.lan));
        setLat(Number(pharmacist?.lat));
        setOpenLocationModal(true);
    }

    //deleteModal
    const OpenDeleteModal = (id: number) => {
        setDelitedID(id);
        setOpenDeleteModal(true);
    }
    //showModal 
    const OpenShowModal = (id: number) => {
        const Pharmacist = pharmacists?.find(
            item => item.id === id
        );
        getPharmacistData(Pharmacist?.pharmacist_id)
        setName(Pharmacist?.name)
        setSalesmanDescription(Pharmacist?.salesman_description)
        setAdminDescription(Pharmacist?.admin_description)
        setStreetId(Pharmacist?.street_id);
        setGovernorateId(Pharmacist?.governorate_id);
        setAreaId(Pharmacist?.area_id);
        setCityId(Pharmacist?.city_id)
        setPhoneNumber(Pharmacist?.phone_number)
        setTelephoneNumber(Pharmacist?.telephone_number)
        setOpenShowModal(true);
    }

    //delete Function
    async function handleDelete(id: number) {
        setLoading2(true);
        try {
            const res = await deleteDoctorPharmacist(id);
            if (res?.status == 200) {
                notification.success({
                    message: "نجاح",
                    description: "تمت العملية بنجاح",
                    placement: 'bottomLeft'
                });
            } else if (res?.status == 500) {
                notification.error({
                    message: "خطأ",
                    description: "فشل العملية",
                    placement: 'bottomLeft'
                });
            }
            else {
                notification.error({
                    title: "فشل",
                    description: "فشل العملية",
                    placement: 'bottomLeft'
                });
            }
        } catch (error) {
            notification.error({
                message: "فشل",
                description: "فشل العملية",
                placement: 'bottomLeft'
            });
        }
        fetchDataPharmacists();
        setLoading2(false);
        setOpenDeleteModal(false);
    }



    const optionsSex = [
        { value: 1, label: 'ذكر' },
        { value: 2, label: 'أنثى' }]
    const optionsLoyalty = [
        { value: 1, label: 'مخلص جدا' },
        { value: 2, label: 'مخلص' },
        { value: 3, label: 'عادي' },
        { value: 4, label: 'غير مخلص' },
        { value: 5, label: 'سيء جدا' }
    ]
    const optionsClassification = [
        { value: 1, label: 'مهم جدا' },
        { value: 2, label: 'مهم' },
        { value: 3, label: 'عادي' },
        { value: 4, label: 'سيء' },
        { value: 5, label: 'سيء جدا' }]

    const columns: ColumnsType<any> = [
        {
            title: "الرقم",
            dataIndex: "id",
            fixed: 'left',
            sorter: (a: any, b: any) => Number(a.id) - Number(b.id),
        },
        {
            title: "الاسم",
            dataIndex: "first_name",
            sorter: (a: any, b: any) => a.first_name.localeCompare(b.first_name),
        },
        {
            title: "اسم العائلة",
            dataIndex: "last_name",
            sorter: (a: any, b: any) => a.last_name.localeCompare(b.last_name),
        },
        {
            title: "التصنيف",
            dataIndex: "classification",
            sorter: (a: any, b: any) => Number(a.classification) - Number(b.classification),
            render: (value: number) => {
                return optionsClassification?.find(e => e.value == Number(value))?.label;
            }
        },
        {
            title: "الولاء",
            dataIndex: "loyalty",
            sorter: (a: any, b: any) => Number(a.loyalty) - Number(b.loyalty),
            render: (value: number) => {
                return optionsLoyalty?.find(e => e.value == Number(value))?.label;
            }
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
            title: "رقم الهاتف",
            dataIndex: "phone_number"
        },
        {

            title: "",
            render: (_: any, record: any) => (
                <Space size="middle">

                    <Button
                        type="default"
                        danger
                        onClick={() => { OpenDeleteModal(record.id); }}
                    >
                        حذف
                    </Button>
                    <Button
                        type="primary"
                        variant="outlined"
                        onClick={() => { OpenLocationModal(record.id); }}
                    >
                        موقع
                    </Button>
              
                </Space>
            ),
        }
        ,
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

        {/*Adding Modal*/}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#592C46]">
                    <span> إضافة صيدلية</span>
                </div>
            }
            open={open}
            onOk={() => handleAdd()}
            okButtonProps={{ variant: "outlined", color: "purple" }}
            onCancel={() => emptyFields()}
            mask={false}
        >
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 sm:col-span-6">
                    <h3>
                        الصيدلية :
                    </h3>
                    <AutoComplete
                        style={{ width: '100%' }}
                        options={optionsPharmacists}
                        placeholder="الصيدلية"
                        value={searchText}
                        onChange={(text) => {
                            setSearchText(text);
                            setPharmacistId(undefined);
                        }}
                        onSelect={(value, option) => {
                            setPharmacistId(option.value);
                            setSearchText(option?.label as string);
                        }}
                        filterOption={(inputValue, option) =>
                            (option?.label as string)
                                ?.toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />
                </div>
            </div>
        </Modal>

        {/* Show Modal */}
        <Modal
            title={
                <div className="flex items-center gap-2 text-lg font-semibold text-[#01B9B0]">
                    <span>تفاصيل الصيدلية</span>
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
                        اسم الصيدلية
                    </h3>
                    <Input
                        disabled
                        value={`${pharmacistD?.first_name} ${pharmacistD?.last_name}`}
                        placeholder="اسم الصيدلية"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        رقم الهاتف  :
                    </h3>
                    <Input
                        disabled
                        value={pharmacistD?.phone_number}
                        placeholder="رقم الهاتف"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        رقم الأرضي  :
                    </h3>
                    <Input
                        disabled
                        value={pharmacistD?.telephone_number}
                        placeholder="رقم الأرضي"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        المحافظة  :
                    </h3>
                    <Input
                        disabled
                        value={dataGovernorates?.find(e => e?.id == pharmacistD?.governorate_id)?.name}
                        placeholder="المحافظة"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        المدينة  :
                    </h3>
                    <Input
                        disabled
                        value={dataCities?.find(e => e?.id == pharmacistD?.city_id)?.name}
                        placeholder="المدينة"
                    />
                </div>


                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        المنطقة  :
                    </h3>
                    <Input
                        disabled
                        value={dataAreas?.find(e => e?.id == pharmacistD?.area_id)?.name}
                        placeholder="المنطقة"
                    />
                </div>

                <div className="col-span-6 xl:col-span-6">
                    <h3>
                        الشارع  :
                    </h3>
                    <Input
                        disabled
                        value={dataStreets?.find(e => e?.id == pharmacistD?.street_id)?.name}
                        placeholder="الشارع"
                    />
                </div>


                <div className="col-span-12">
                    <h3>
                        وصف الإدارة :
                    </h3>
                    <TextArea
                        disabled
                        value={pharmacistD?.admin_description}
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
                        value={pharmacistD?.salesman_description}
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

        {/*Delete Modal*/}
        <Modal
            title="تأكيد الحذف"
            open={openDeleteModal}
            onOk={() => handleDelete(delitedID)}
            onCancel={() => setOpenDeleteModal(false)}
            confirmLoading={loading2}
            mask={false}
            okType="danger"
            okButtonProps={{ type: "primary" }}
        >
        </Modal>

        <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
            <Button className="col-span-5" variant="solid" color="cyan" onClick={() => changeOpenModalAdd()}>
                إضافة
            </Button>
        </div>
        {
            (pageLoading) ? <Skeleton className="h-full w-full" paragraph={{ rows: 10 }} />
                :
                <Table
                    scroll={{ x: "max-content" }}
                    columns={columns} dataSource={pharmacists}
                    pagination={{
                        position: ["topRight"],
                    }} />
        }
    </div>
}
