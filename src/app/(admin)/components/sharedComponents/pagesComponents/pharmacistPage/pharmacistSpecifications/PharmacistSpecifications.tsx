"use client";

import { Type } from "../../../../../../../stores/types-store-interfaces";
import { useTypeStore } from "../../../../../../../stores/typesStore/data.store";
import { useEffect, useState } from "react";
import { AutoComplete, Button, ConfigProvider, DatePicker, Input, InputNumber, notification, Select, SelectProps, Skeleton, Tabs, TimePicker, TimePickerProps } from "antd";
import { profileComponent } from "../../../../../../../stores/other-store-interfaces";
import { apiPharmacist, apiType } from "../../../../../../../stores/apis";
import { useMedicalStore } from "../../../../../../../stores/medicalStore/data.store";
import dayjs from "dayjs";
import { usePlacesStore } from "../../../../../../../stores/placesStore/data.store";
import { SizeType } from "antd/es/config-provider/SizeContext";
export default function PharmacistSpecification({ profile_id }: profileComponent) {
    const { dataGovernorates, getGovernoratesData, getCitiesData, getAreasData, getStreetsData, dataCities, dataAreas, dataStreets } = usePlacesStore()

    const { editPharmacist } = useMedicalStore()
    const { TextArea } = Input;
    const { dataGroupTypes } = useTypeStore();
    const [pharmacistD, setPharmacistData] = useState(null)
    const [pageLoading, setPageLoading] = useState(true);
    const [typesNames, setTypesNames] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    pharmacistData,
                    typesRes
                ] = await Promise.all([
                    apiPharmacist.get(`/${profile_id}`),
                    apiType.get(`/names`)
                ]);
                setPharmacistData(pharmacistData.data);
                setTypesNames(typesRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData().finally(() => setPageLoading(false));
    }, []);

    useEffect(() => {
        setOptionsAdoptedTypes(typesNames.map(e => { return { label: e.name, value: e.name } }))
    }, [typesNames])


    // Basic Info
    const [id, setId] = useState<number | null>(null);
    const [first_name, setFirstName] = useState("");
    const [second_name, setSecondName] = useState("");
    const [last_name, setLastName] = useState("");
    const [gender, setGender] = useState<number | null>(null);
    const [loyalty_id, setLoyaltyId] = useState<number | null>(null);
    const [birth_date, setBirthDate] = useState(null);

    // Descriptions
    const [admin_description, setAdminDescription] = useState("");
    const [salesman_description, setSalesmanDescription] = useState("");

    // Contact
    const [phone_number, setPhoneNumber] = useState("");
    const [telephone_number, setTelephoneNumber] = useState("");
    const [email, setEmail] = useState("");

    // Location
    const [governorate_id, setGovernorateId] = useState<number | null>(null);
    const [city_id, setCityId] = useState<number | null>(null);
    const [area_id, setAreaId] = useState<number | null>(null);
    const [street_id, setStreetId] = useState<number | null>(null);
    const [lat, setLat] = useState("");
    const [lan, setLan] = useState("");
    const [full_place, setFullPlace] = useState("");
    const [close_place, setClosePlace] = useState("");
    const [close_locaiton, setclose_location] = useState("");

    // Professional
    const [classification_id, setClassificationId] = useState<number | null>(null);
    const [graduation_country, setGraduationCountry] = useState("");
    const [graduation_university, setGraduationUniversity] = useState("");
    const [size, setSize] = useState<SizeType>('middle');
    const handleChangeAdoptedTypes = (value: string[]) => {
        const result = value.join(',');
        setAdoptedTypes(result);
    };

    const handleChangPrefferedTreatmentTypes = (value: string[]) => {
        const result = value.join(',');
        setPrefferedTreatmentTypes(result);
    };

    const handleChangePrefferedDietaryTypes = (value: string[]) => {
        const result = value.join(',');
        setPrefferedDietaryTypes(result);
    };

    const handleChangePrefferedCompanies = (value: string[]) => {
        const result = value.join(',');
        setPrefferedCompanies(result);
    };

    const handleChangeCompetitiveTypes = (value: string[]) => {
        const result = value.join(',');
        setCompetitiveTypes(result);
    };

    const handleChangePersonalityStrengthens = (value: string[]) => {
        const result = value.join(',');
        setPersonalityStrengthens(result);
    };

    const handleChangeInterests = (value: string[]) => {
        const result = value.join(',');
        setInterestes(result);
    };

    const [optionsAdoptedTypes, setOptionsAdoptedTypes] = useState<SelectProps['options']>([]);


    const optionsPrefferedTreatmentTypes: SelectProps['options'] = [
        {
            label: <span>مسكنات وخافضات حرارة</span>,
            title: 'painkillers',
            options: [
                { label: <span>باراسيتامول</span>, value: 'paracetamol' },
                { label: <span>إيبوبروفين</span>, value: 'ibuprofen' },
                { label: <span>ديكلوفيناك</span>, value: 'diclofenac' },
                { label: <span>أسبرين</span>, value: 'aspirin' },
            ],
        },
        {
            label: <span>مضادات حيوية</span>,
            title: 'antibiotics',
            options: [
                { label: <span>أموكسيسيلين</span>, value: 'amoxicillin' },
                { label: <span>أوغمنتين</span>, value: 'augmentin' },
                { label: <span>أزيثروميسين</span>, value: 'azithromycin' },
                { label: <span>سيفيكسيم</span>, value: 'cefixime' },
            ],
        },
        {
            label: <span>أدوية المعدة</span>,
            title: 'stomach',
            options: [
                { label: <span>أوميبرازول</span>, value: 'omeprazole' },
                { label: <span>إيزوميبرازول</span>, value: 'esomeprazole' },
                { label: <span>فاموتيدين</span>, value: 'famotidine' },
                { label: <span>دومبيريدون</span>, value: 'domperidone' },
            ],
        },
        {
            label: <span>الحساسية والربو</span>,
            title: 'allergy',
            options: [
                { label: <span>لوراتادين</span>, value: 'loratadine' },
                { label: <span>سيتريزين</span>, value: 'cetirizine' },
                { label: <span>سالبوتامول بخاخ</span>, value: 'salbutamol' },
                { label: <span>بوديزونيد بخاخ</span>, value: 'budesonide' },
            ],
        },
        {
            label: <span>السكري والضغط</span>,
            title: 'chronic',
            options: [
                { label: <span>أنسولين</span>, value: 'insulin' },
                { label: <span>ميتفورمين</span>, value: 'metformin' },
                { label: <span>أملوديبين</span>, value: 'amlodipine' },
                { label: <span>لوسارتان</span>, value: 'losartan' },
            ],
        },
        {
            label: <span>فيتامينات ومكملات</span>,
            title: 'vitamins',
            options: [
                { label: <span>فيتامين C</span>, value: 'vitamin_c' },
                { label: <span>فيتامين D</span>, value: 'vitamin_d' },
                { label: <span>حديد</span>, value: 'iron' },
                { label: <span>زنك</span>, value: 'zinc' },
            ],
        },
        {
            label: <span>العناية بالجروح</span>,
            title: 'wound_care',
            options: [
                { label: <span>بيتادين</span>, value: 'betadine' },
                { label: <span>كحول طبي</span>, value: 'medical_alcohol' },
                { label: <span>شاش طبي</span>, value: 'gauze' },
                { label: <span>لاصق طبي</span>, value: 'bandage' },
            ],
        },
        {
            label: <span>أجهزة طبية</span>,
            title: 'devices',
            options: [
                { label: <span>جهاز قياس السكر</span>, value: 'glucometer' },
                { label: <span>جهاز ضغط الدم</span>, value: 'blood_pressure_monitor' },
                { label: <span>ميزان حرارة</span>, value: 'thermometer' },
                { label: <span>كمامات طبية</span>, value: 'medical_mask' },
            ],
        },
        {
            label: <span>أدوية الأطفال</span>,
            title: 'kids',
            options: [
                { label: <span>شراب سعال</span>, value: 'cough_syrup' },
                { label: <span>لبوس خافض حرارة</span>, value: 'suppository' },
                { label: <span>قطرة أنف</span>, value: 'nasal_drops' },
                { label: <span>فيتامين أطفال</span>, value: 'kids_vitamins' },
            ],
        }
    ]



    const optionsPrefferedDietaryTypes: SelectProps['options'] = [
        {
            label: <span>مولتي فيتامين</span>,
            title: 'multivitamins',
            options: [
                { label: <span>Centrum</span>, value: 'centrum' },
                { label: <span>One A Day</span>, value: 'one_a_day' },
                { label: <span>Vitrum</span>, value: 'vitrum' },
                { label: <span>Pharmaton</span>, value: 'pharmaton' },
            ],
        },
        {
            label: <span>أوميغا وزيوت</span>,
            title: 'omega',
            options: [
                { label: <span>Omega 3 Fish Oil</span>, value: 'omega_3' },
                { label: <span>Seven Seas Omega</span>, value: 'seven_seas' },
                { label: <span>Nature’s Bounty Fish Oil</span>, value: 'fish_oil_nb' },
                { label: <span>Moller’s Cod Liver Oil</span>, value: 'mollers_oil' },
            ],
        },
        {
            label: <span>مكملات طاقة</span>,
            title: 'energy',
            options: [
                { label: <span>Pharmaton Capsules</span>, value: 'pharmaton_caps' },
                { label: <span>Supradyn</span>, value: 'supradyn' },
                { label: <span>Berocca</span>, value: 'berocca' },
                { label: <span>Doppelherz Aktiv</span>, value: 'doppelherz' },
            ],
        },
        {
            label: <span>مكملات الشعر والبشرة</span>,
            title: 'beauty',
            options: [
                { label: <span>Priorin</span>, value: 'priorin' },
                { label: <span>Perfectil</span>, value: 'perfectil' },
                { label: <span>Hairburst</span>, value: 'hairburst' },
                { label: <span>Nutrafol</span>, value: 'nutrafol' },
            ],
        },
        {
            label: <span>مكملات رياضية</span>,
            title: 'sports',
            options: [
                { label: <span>Optimum Nutrition Whey Protein</span>, value: 'on_whey' },
                { label: <span>MyProtein Impact Whey</span>, value: 'mp_whey' },
                { label: <span>MuscleTech NitroTech</span>, value: 'nitrotech' },
                { label: <span>BSN Syntha-6</span>, value: 'syntha6' },
            ],
        },
        {
            label: <span>مكملات الهضم</span>,
            title: 'digestive',
            options: [
                { label: <span>Enterogermina</span>, value: 'enterogermina' },
                { label: <span>Prolife Probiotic</span>, value: 'prolife' },
                { label: <span>BioGaia</span>, value: 'biogaia' },
                { label: <span>Lacteol Fort</span>, value: 'lacteol' },
            ],
        },
        {
            label: <span>مكملات العظام</span>,
            title: 'bones',
            options: [
                { label: <span>Calcimax</span>, value: 'calcimax' },
                { label: <span>Caltrate</span>, value: 'caltrate' },
                { label: <span>Osteocare</span>, value: 'osteocare' },
                { label: <span>Bon-One</span>, value: 'bon_one' },
            ],
        },
        {
            label: <span>مكملات المناعة</span>,
            title: 'immunity',
            options: [
                { label: <span>Immulant</span>, value: 'immulant' },
                { label: <span>Immunace</span>, value: 'immunace' },
                { label: <span>Sambucol</span>, value: 'sambucol' },
                { label: <span>Wellman / Wellwoman</span>, value: 'wellman' },
            ],
        }
    ]

    const optionsPrefferedCompanies: SelectProps['options'] = [
        {
            label: <span>شركات محلية (سوريا)</span>,
            title: 'syrian_companies',
            options: [
                { label: <span>Riva Pharma</span>, value: 'riva_pharma' },
                { label: <span>Rama Pharma</span>, value: 'rama_pharma' },
                { label: <span>Ugarit Pharma</span>, value: 'ugarit_pharma' },
                { label: <span>Human Pharma</span>, value: 'human_pharma' },
                { label: <span>Al Fares Pharma</span>, value: 'al_fares' },
                { label: <span>Unipharma</span>, value: 'unipharma' },
                { label: <span>Technopharm</span>, value: 'technopharm' },
                { label: <span>Triaq Pharma</span>, value: 'triaq' },
                { label: <span>Miamed Pharma</span>, value: 'miamed' },
                { label: <span>Pharmasyr</span>, value: 'pharmasyr' },
                { label: <span>BioMed Pharma</span>, value: 'biomed' },
            ],
        },
        {
            label: <span>شركات مكملات عالمية (موجودة في سوريا)</span>,
            title: 'global_brands',
            options: [
                { label: <span>Doppelherz</span>, value: 'doppelherz' },
                { label: <span>Centrum</span>, value: 'centrum' },
                { label: <span>Nature’s Bounty</span>, value: 'natures_bounty' },
                { label: <span>Solgar</span>, value: 'solgar' },
                { label: <span>NOW Foods</span>, value: 'now_foods' },
                { label: <span>Vitabiotics</span>, value: 'vitabiotics' },
                { label: <span>Jamieson</span>, value: 'jamieson' },
                { label: <span>GNC</span>, value: 'gnc' },
            ],
        },
    ]

    const optionsCompetitveTypes: SelectProps['options'] = [
        {
            label: <span>Doppelherz (ألمانيا)</span>,
            title: 'doppelherz',
            options: [
                { label: <span>Omega 3 Extra 1000mg</span>, value: 'doppelherz_omega3_1000' },
                { label: <span>Omega 3 Premium 1500</span>, value: 'doppelherz_omega3_1500' },
                { label: <span>Omega 3-6-9 Capsules</span>, value: 'doppelherz_369' },
                { label: <span>Visual Total Aktiv</span>, value: 'doppelherz_vision' },
            ],
        },
        {
            label: <span>Centrum</span>,
            title: 'centrum',
            options: [
                { label: <span>Centrum Omega-3 Capsules</span>, value: 'centrum_omega3' },
                { label: <span>Centrum Advance</span>, value: 'centrum_advance' },
                { label: <span>Centrum Silver</span>, value: 'centrum_silver' },
            ],
        },
        {
            label: <span>Vitabiotics</span>,
            title: 'vitabiotics',
            options: [
                { label: <span>Perfectil</span>, value: 'perfectil' },
                { label: <span>Wellman Original</span>, value: 'wellman' },
                { label: <span>Wellwoman Original</span>, value: 'wellwoman' },
                { label: <span>Osteocare</span>, value: 'osteocare' },
            ],
        },
        {
            label: <span>Nature’s Bounty</span>,
            title: 'natures_bounty',
            options: [
                { label: <span>Fish Oil 1200mg</span>, value: 'nb_fish_oil' },
                { label: <span>Hair Skin & Nails</span>, value: 'nb_hair_skin' },
                { label: <span>Vitamin D3</span>, value: 'nb_d3' },
            ],
        },
        {
            label: <span>Solgar</span>,
            title: 'solgar',
            options: [
                { label: <span>Solgar Omega 3</span>, value: 'solgar_omega3' },
                { label: <span>Solgar Skin Nails Hair</span>, value: 'solgar_skin' },
                { label: <span>Solgar Gentle Iron</span>, value: 'solgar_iron' },
            ],
        },
        {
            label: <span>NOW Foods</span>,
            title: 'now_foods',
            options: [
                { label: <span>NOW Omega 3</span>, value: 'now_omega3' },
                { label: <span>NOW Zinc</span>, value: 'now_zinc' },
                { label: <span>NOW Magnesium</span>, value: 'now_magnesium' },
            ],
        },
        {
            label: <span>GNC</span>,
            title: 'gnc',
            options: [
                { label: <span>GNC Mega Men</span>, value: 'gnc_mega_men' },
                { label: <span>GNC Women’s Ultra Mega</span>, value: 'gnc_women' },
                { label: <span>GNC Fish Oil</span>, value: 'gnc_fish_oil' },
            ],
        },
        {
            label: <span>شركات قريبة من السوق السوري</span>,
            title: 'regional',
            options: [
                { label: <span>Doppelherz Omega 3 System</span>, value: 'doppelherz_system' },
                { label: <span>Seven Seas Fish Oil</span>, value: 'seven_seas' },
                { label: <span>Jamieson Omega 3</span>, value: 'jamieson_omega3' },
                { label: <span>Pharmaton Capsules</span>, value: 'pharmaton_caps' },
            ],
        }
    ]

    const optionsPersonalityStrengthens = [
        { label: 'قوي الشخصية', value: 'strong_personality' },
        { label: 'واثق بالنفس', value: 'confident' },
        { label: 'قيادي', value: 'leader' },
        { label: 'اجتماعي', value: 'social' },
        { label: 'هادئ', value: 'calm' },
        { label: 'صبور', value: 'patient' },
        { label: 'طموح', value: 'ambitious' },
        { label: 'منظم', value: 'organized' },
        { label: 'مبدع', value: 'creative' },
        { label: 'ذكي', value: 'smart' },
        { label: 'متعاون', value: 'cooperative' },
        { label: 'محترم', value: 'respectful' },
        { label: 'شجاع', value: 'brave' },
        { label: 'متحمل للمسؤولية', value: 'responsible' },
        { label: 'صادق', value: 'honest' },
        { label: 'وفيّ', value: 'loyal' },
        { label: 'مرن', value: 'flexible' },
        { label: 'مبادر', value: 'proactive' },
        { label: 'حساس', value: 'sensitive' },
        { label: 'متفائل', value: 'optimistic' },
        { label: 'واقعي', value: 'realistic' },
        { label: 'منطقي', value: 'logical' },
        { label: 'محفّز للآخرين', value: 'motivator' },
        { label: 'كريم', value: 'generous' },
        { label: 'منضبط', value: 'disciplined' },
        { label: 'مستمع جيد', value: 'good_listener' },
        { label: 'ذو شخصية قوية تحت الضغط', value: 'pressure_resistant' },
        { label: 'سريع التعلم', value: 'fast_learner' },
        { label: 'دقيق', value: 'precise' },
        { label: 'مغامر', value: 'adventurous' },
    ]

    const optionsInterests = [
        { label: 'الرياضة', value: 'sports' },
        { label: 'كرة القدم', value: 'football' },
        { label: 'كرة السلة', value: 'basketball' },
        { label: 'اللياقة البدنية', value: 'fitness' },
        { label: 'التغذية الصحية', value: 'healthy_nutrition' },
        { label: 'الطب والصحة', value: 'health_medicine' },
        { label: 'التكنولوجيا', value: 'technology' },
        { label: 'البرمجة', value: 'programming' },
        { label: 'الذكاء الاصطناعي', value: 'ai' },
        { label: 'الأعمال وريادة الأعمال', value: 'business' },
        { label: 'التسويق', value: 'marketing' },
        { label: 'التصميم', value: 'design' },
        { label: 'التصوير', value: 'photography' },
        { label: 'السفر', value: 'travel' },
        { label: 'الطعام', value: 'food' },
        { label: 'الموسيقى', value: 'music' },
        { label: 'الأفلام والمسلسلات', value: 'movies_series' },
        { label: 'القراءة', value: 'reading' },
        { label: 'التطوير الذاتي', value: 'self_development' },
        { label: 'علم النفس', value: 'psychology' },
        { label: 'الألعاب', value: 'gaming' },
        { label: 'الأزياء', value: 'fashion' },
        { label: 'الجمال والعناية بالبشرة', value: 'beauty_skincare' },
        { label: 'السيارات', value: 'cars' },
        { label: 'الاستثمار', value: 'investment' },
        { label: 'العمل الحر', value: 'freelancing' },
        { label: 'التعليم', value: 'education' },
        { label: 'العلوم', value: 'science' },
        { label: 'الفضاء', value: 'space' },
        { label: 'الطبيعة', value: 'nature' },
    ]


    // Drug / Preferences
    const [adopted_types, setAdoptedTypes] = useState<string | null>("");
    const [preffered_dietary_types, setPrefferedDietaryTypes] = useState<string | null>("");
    const [preffered_treatment_types, setPrefferedTreatmentTypes] = useState<string | null>("");
    const [preffered_companies, setPrefferedCompanies] = useState<string | null>("");
    const [competitive_types, setCompetitiveTypes] = useState<string | null>("");
    const [stance_on_dietary_supp, setStanceOnDietarySupp] = useState<string | null>("");

    // Personality / Relationship
    const [personality_strengthens, setPersonalityStrengthens] = useState<string | null>("");
    const [interestes, setInterestes] = useState<string | null>("");
    const [personality_type, setPersonalityType] = useState<string | null>(null);
    const [social_pattern, setSocialPattern] = useState<string | null>(null);
    const [salesman_relationship, setSalesmanRelationship] = useState<string | null>(null);

    // System / Extra
    const [photo, setPhoto] = useState("");
    const [lastVisitNote, setLastVisitNote] = useState("");
    const [lastVisitDate, setLastVisitDate] = useState<Date | null>(null);
    const [isAddedByAdmin, setIsAddedByAdmin] = useState<boolean>(false);

    //for Auto Complete
    const [searchTextSpecilization, setSearchTextSpecilization] = useState("");
    const [searchTextClassification, setSearchTextClassification] = useState("");
    const [searchTextLoyalty, setSearchTextLoyalty] = useState("");
    const [searchTextSex, setSearchTextSex] = useState("");
    const [searchTextGovernorate, setSearchTextGovernorate] = useState("");
    const [searchTextCity, setSearchTextCity] = useState("");
    const [searchTextArea, setSearchTextArea] = useState("");
    const [searchTextStreet, setSearchTextStreet] = useState("");
    const [searchTextPersonalityType, setSearchTextPersonalityType] = useState("");
    const [searchTextSocialPattern, setSearchTextSocialPattern] = useState("");
    const [searchTextSalesmanRelationship, setSearchTextSalesmanRelationship] = useState("");
    const [searchTextWaitingTime, setSearchTextWaitingTime] = useState("");



    //for AddingModal 
    const [optionsGovernorates, setOptionsGovernorates] = useState(dataGovernorates?.map(e => { return { value: e.id, label: e.name } }) || []);
    const [optionsCities, setOptionsCities] = useState([])
    const [optionsAreas, setOptionsAreas] = useState([])
    const area = dataAreas?.find(
        item => item.id === area_id)
    const [optionsStreets, setOptionsStreets] = useState([])

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

    const optionsPersonality = [
        { value: 'analytical', label: 'تحليلي' },
        { value: 'creative', label: 'إبداعي' },
        { value: 'leader', label: 'قيادي' },
        { value: 'social', label: 'اجتماعي' },
        { value: 'practical', label: 'عملي' }
    ];

    const optionsSocialPatterns = [
        { value: 'introvert', label: 'انطوائي' },
        { value: 'extrovert', label: 'منفتح' },
        { value: 'ambivert', label: 'متوازن اجتماعياً' },
        { value: 'leader', label: 'قيادي اجتماعياً' },
        { value: 'observer', label: 'مراقب' }
    ];

    const optionsSalesmanRelationships = [
        { value: 'strong', label: 'علاقة قوية' },
        { value: 'good', label: 'علاقة جيدة' },
        { value: 'neutral', label: 'علاقة عادية' },
        { value: 'weak', label: 'علاقة ضعيفة' },
        { value: 'none', label: 'لا توجد علاقة' }
    ];

    const optionsWaitingTime = [
        { value: 'fiveMinutes', label: 'خمس دقائق' },
        { value: 'QuarterHour', label: 'ربع ساعة' },
        { value: 'halfHour', label: 'نصف ساعة' },
        { value: 'hour', label: 'ساعة' },
        { value: 'unspecified', label: 'غير محدد' }
    ];


    // Work & Routine
    const firstStartTime = dayjs('12:08:23', 'HH:mm:ss');
    const firstEndTime = dayjs('12:08:23', 'HH:mm:ss');
    const secondStartTime = dayjs('12:08:23', 'HH:mm:ss');
    const secondEndTime = dayjs('12:08:23', 'HH:mm:ss');
    const favouriteStartTime = dayjs('12:08:23', 'HH:mm:ss');
    const favouriteEndTime = dayjs('12:08:23', 'HH:mm:ss');

    const [waiting_time, setWaitingTime] = useState<string | null>(null);
    const [first_work_time_opening, setFirstWorkTimeOpening] = useState<string | null>("");
    const [first_work_time_closing, setFirstWorkTimeClosing] = useState<string | null>("");
    const [second_work_time_opening, setSecondWorkTimeOpening] = useState<string | null>("");
    const [second_work_time_closing, setSecondWorkTimeClosing] = useState<string | null>("");
    const [favourite_time_opening, setFavouriteTimeOpening] = useState<string | null>("");
    const [favourite_time_closing, setFavouriteTimeClosing] = useState<string | null>("");
    const [average_patients_per_day, setAveragePatientsPerDay] = useState<number | null>(null);

    const onChangeFirstTimeOpening: TimePickerProps['onChange'] = (time, timeString) => {
        setFirstWorkTimeOpening(timeString)
    };
    const onChangeFirstTimeClosing: TimePickerProps['onChange'] = (time, timeString) => {
        setFirstWorkTimeClosing(timeString)
    };
    const onChangeSecondTimeOpening: TimePickerProps['onChange'] = (time, timeString) => {
        setSecondWorkTimeOpening(timeString)
    };
    const onChangeSecondTimeClosing: TimePickerProps['onChange'] = (time, timeString) => {
        setSecondWorkTimeClosing(timeString)
    };
    const onChangeFavouriteTimeOpening: TimePickerProps['onChange'] = (time, timeString) => {
        setFavouriteTimeOpening(timeString)
    };
    const onChangeFavouriteTimeClosing: TimePickerProps['onChange'] = (time, timeString) => {
        setFavouriteTimeClosing(timeString)
    };


    useEffect(() => {
        if (!pharmacistD) return;
        setId(pharmacistD.id);

        setFirstName(pharmacistD.first_name || "");
        setSecondName(pharmacistD.second_name || "");
        setLastName(pharmacistD.last_name || "");
        setGender(pharmacistD.gender ?? null);
        setLoyaltyId(pharmacistD.loyalty_id ?? null);
        setBirthDate(dayjs(pharmacistD.birth_date));
        setAdminDescription(pharmacistD.admin_description || "");
        setSalesmanDescription(pharmacistD.salesman_description || "");

        setPhoneNumber(pharmacistD.phone_number || "");
        setTelephoneNumber(pharmacistD.telephone_number || "");
        setEmail(pharmacistD.email || "");

        setGovernorateId(pharmacistD.governorate_id ?? null);
        setCityId(pharmacistD.city_id ?? null);
        setAreaId(pharmacistD.area_id ?? null);
        setStreetId(pharmacistD.street_id ?? null);
        setLat(pharmacistD.lat || "");
        setLan(pharmacistD.lan || "");
        setFullPlace(pharmacistD.full_place || "");
        setClosePlace(pharmacistD.close_place || "");
        setclose_location(pharmacistD.close_location || "");

        setClassificationId(pharmacistD.classification_id || "");
        setLoyaltyId(pharmacistD?.loyalty_id || "")
        setGraduationCountry(pharmacistD.graduation_country || "");
        setGraduationUniversity(pharmacistD.graduation_university || "");

        setWaitingTime(pharmacistD.waiting_time ?? null);
        setFirstWorkTimeOpening(pharmacistD.first_work_time_opening || "");
        setFirstWorkTimeClosing(pharmacistD.first_work_time_closing || "");
        setSecondWorkTimeOpening(pharmacistD.second_work_time_opening || "");
        setSecondWorkTimeClosing(pharmacistD.second_work_time_closing || "");
        setFavouriteTimeOpening(pharmacistD.favourite_time_opening || "");
        setFavouriteTimeClosing(pharmacistD.favourite_time_closing || "");
        setAveragePatientsPerDay(pharmacistD.average_patients_per_day ?? null);

        setAdoptedTypes(pharmacistD.adopted_types || "");
        setPrefferedDietaryTypes(pharmacistD.preffered_dietary_types || "");
        setPrefferedTreatmentTypes(pharmacistD.preffered_treatment_types || "");
        setPrefferedCompanies(pharmacistD.preffered_companies || "");
        setCompetitiveTypes(pharmacistD.competitive_types || "");
        setStanceOnDietarySupp(pharmacistD.stance_on_dietary_supp || "");

        setPersonalityStrengthens(pharmacistD.personality_strengthens || "");
        setInterestes(pharmacistD.interestes || "");
        setPersonalityType(pharmacistD.personality_type ?? null);
        setSocialPattern(pharmacistD.social_pattern ?? null);
        setSalesmanRelationship(pharmacistD.salesman_relationship ?? null);

        setPhoto(pharmacistD.photo || "");
        setLastVisitNote(pharmacistD.last_visit_note || "");
        setLastVisitDate(pharmacistD.last_visit_date ? new Date(pharmacistD.last_visit_date) : null);
        setIsAddedByAdmin(pharmacistD.is_added_by_admin ?? false);
    }, [pharmacistD]);
    useEffect(() => {
        setSearchTextLoyalty(
            optionsLoyalty?.find(e => e.value == loyalty_id)?.label || ""
        )
    }, [loyalty_id])
    useEffect(() => {

        setSearchTextClassification(
            optionsClassification?.find(e => e.value == classification_id)?.label || ""
        )
    }, [classification_id])
    useEffect(() => {
        setSearchTextGovernorate(
            dataGovernorates?.find(e => e.id == governorate_id)?.name || ""
        )
    }, [governorate_id])
    useEffect(() => {
        setSearchTextCity(
            dataCities?.find(e => e.id == city_id)?.name || ""
        )
    }, [city_id])
    useEffect(() => {
        setSearchTextArea(
            dataAreas?.find(e => e.id == area_id)?.name || ""
        )
    }, [area_id])
    useEffect(() => {
        setSearchTextStreet(
            dataStreets?.find(e => e.id == street_id)?.name || ""
        )
    }, [street_id])
    useEffect(() => {
        setSearchTextPersonalityType(optionsPersonality.find(e => e.value == pharmacistD?.personality_type)?.label)
    }, [pharmacistD])

    useEffect(() => {
        setSearchTextSocialPattern(optionsSocialPatterns.find(e => e.value == pharmacistD?.social_pattern)?.label)
    }, [pharmacistD])

    useEffect(() => {
        setSearchTextSalesmanRelationship(optionsSalesmanRelationships.find(e => e.value == pharmacistD?.salesman_relationship)?.label)
    }, [pharmacistD])
    useEffect(() => {
        setSearchTextWaitingTime(optionsWaitingTime.find(e => e.value == pharmacistD?.waiting_time)?.label)
    }, [pharmacistD])
    //Edit Modal
    const [open1, setOpenEditModal] = useState(false);
    const [editedId, setEditedId] = useState(0)
    const [loading, setLoading] = useState(false);






    //handleEdit
    async function handleEdit() {
        setLoading(true);
        try {
            const res = await editPharmacist(profile_id, {
                governorate_id,
                city_id,
                area_id,
                street_id,
                first_name,
                last_name,
                classification_id,
                loyalty_id,
                birth_date,
                admin_description,
                salesman_description,
                favourite_time_opening,
                favourite_time_closing,
                first_work_time_opening,
                first_work_time_closing,
                second_work_time_opening,
                second_work_time_closing,
                graduation_country,
                phone_number,
                telephone_number,
                graduation_university,
                gender,
                /*  wife_husband_first_name: string;
                 wife_husband_last_name: string; */
                //added recently
                full_place,
                close_place,
                email,
                second_name,
                waiting_time,
                stance_on_dietary_supp,
                /*    childs_under_12: number;
                   childs_above_18: number;
                   childs_between_12_18: number;
                */
                adopted_types,
                preffered_dietary_types,
                preffered_treatment_types,
                preffered_companies,
                competitive_types,
                average_patients_per_day,
                personality_strengthens,
                interestes,
                personality_type,
                social_pattern,
                salesman_relationship,
            });
            if (res?.status == 200 || res?.status == 204) {
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

        setLoading(false);
        setOpenEditModal(false);
    }





    const [activeKey, setActiveKey] = useState("1");
    const renderContent = () => {
        switch (activeKey) {
            case "1":
                return <div className="grid grid-cols-12 gap-4">
                    {/* CARD */}
                    <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white p-5 shadow-md border border-gray-100">

                        {/* TEXT FIELDS */}
                        {[
                            { label: "الاسم الأول", value: first_name, set: setFirstName },
                            { label: "اسم الأب", value: second_name, set: setSecondName },
                            { label: "اسم العائلة", value: last_name, set: setLastName },
                            { label: "رقم الموبايل", value: phone_number, set: setPhoneNumber },
                            { label: "رقم الهاتف", value: telephone_number, set: setTelephoneNumber },
                            { label: "بلد التخرج", value: graduation_country, set: setGraduationCountry },
                            { label: "جامعة التخرج", value: graduation_university, set: setGraduationUniversity },

                        ].map((field, i) => (
                            <div key={i} className="col-span-12 md:col-span-4 sm:col-span-6">
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                    {field.label}
                                </h3>
                                <Input
                                    value={field.value}
                                    onChange={(e) => field.set(e.target.value)}
                                    className="bg-gray-50 border border-gray-200 text-gray-700"
                                />
                            </div>
                        ))}

                        {/*Loyalty*/}
                        <div className="col-span-12 md:col-span-4 sm:col-span-6">
                            <div>
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                    الولاء
                                </h3>
                            </div>
                            <AutoComplete
                                style={{ width: '100%' }}
                                options={optionsLoyalty}
                                placeholder="الولاء"
                                value={searchTextLoyalty}

                                onChange={(text) => {
                                    setSearchTextLoyalty(text);
                                    setLoyaltyId(undefined);
                                }}
                                onSelect={(value, option) => {
                                    setLoyaltyId(option.value);
                                    setSearchTextLoyalty(option?.label as string);
                                }}
                                filterOption={(inputValue, option) =>
                                    (option?.label as string)
                                        ?.toLowerCase()
                                        .includes(inputValue.toLowerCase())
                                }
                            />
                        </div>


                        {/*Classification*/}
                        <div className="col-span-12 md:col-span-4 sm:col-span-6">
                            <div>
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                    التصنيف
                                </h3>
                            </div>
                            <AutoComplete
                                style={{ width: '100%' }}
                                options={optionsClassification}
                                placeholder="التصنيف"
                                value={searchTextClassification}

                                onChange={(text) => {
                                    setSearchTextClassification(text);
                                    setClassificationId(undefined);
                                }}
                                onSelect={(value, option) => {
                                    setClassificationId(option.value);
                                    setSearchTextClassification(option?.label as string);

                                }}
                                filterOption={(inputValue, option) =>
                                    (option?.label as string)
                                        ?.toLowerCase()
                                        .includes(inputValue.toLowerCase())
                                }
                            />
                        </div>





                        {/* DATE */}
                        <div className="col-span-12 md:col-span-4 sm:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1 w-full">
                                تاريخ الميلاد
                            </h3>
                            <DatePicker className="w-full"
                                value={birth_date}
                                onChange={(e) => setBirthDate(e)}
                                placeholder="تاريخ الولادة " />
                        </div>
                        {/* Gmail */}
                        <div className="col-span-12 md:col-span-4 sm:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                البريد الإلكتروني
                            </h3>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>
                        {/* ADMIN DESCRIPTION */}
                        <div className="col-span-12 sm:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                وصف الإدارة
                            </h3>
                            <TextArea
                                rows={4}
                                value={admin_description}
                                onChange={(e) => setAdminDescription(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* SALESMAN DESCRIPTION */}
                        <div className="col-span-12 sm:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                وصف المندوب
                            </h3>
                            <TextArea
                                rows={4}
                                value={salesman_description}
                                onChange={(e) => setSalesmanDescription(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <Button
                                type="default"
                                onClick={() => handleEdit()}
                            >
                                تعديل
                            </Button>
                        </div>

                    </div>
                </div>

            case "2":
                return <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white p-5 shadow-md border border-gray-100">

                        {/* GOVERNORATE */}
                        <div className="col-span-6 xl:col-span-3">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                المحافظة
                            </h3>
                            <AutoComplete
                                style={{ width: '100%' }}
                                options={optionsGovernorates}
                                placeholder="المحافظة"
                                value={searchTextGovernorate}

                                onChange={(text) => {
                                    getCitiesData()
                                    setSearchTextGovernorate(text);
                                    setSearchTextCity("");
                                    setSearchTextArea("");
                                    setSearchTextStreet("");
                                    setGovernorateId(undefined);
                                    setCityId(undefined);
                                    setAreaId(undefined);
                                    setStreetId(undefined);
                                    const governorate = dataGovernorates?.find(
                                        item => item.id === governorate_id)
                                    setOptionsCities(governorate?.cities?.map(e => { return { value: e.id, label: e.name } }) || [])
                                }}
                                onSelect={(value, option) => {
                                    getCitiesData()
                                    setGovernorateId(option.value);
                                    setSearchTextGovernorate(option?.label as string);
                                    const governorate = dataGovernorates?.find(
                                        item => item.id === governorate_id)
                                    setOptionsCities(governorate?.cities?.map(e => { return { value: e.id, label: e.name } }) || [])
                                }}
                                filterOption={(inputValue, option) =>
                                    (option?.label as string)
                                        ?.toLowerCase()
                                        .includes(inputValue.toLowerCase())
                                }
                            />
                        </div>

                        {/* CITY */}
                        <div className="col-span-6 xl:col-span-3">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                المدينة
                            </h3>
                            <AutoComplete
                                style={{ width: '100%' }}
                                options={optionsCities}
                                placeholder="المدينة"
                                value={searchTextCity}

                                onChange={(text) => {
                                    getAreasData()
                                    setSearchTextCity(text);
                                    setSearchTextArea("");
                                    setSearchTextStreet("");
                                    setCityId(undefined);
                                    setAreaId(undefined);
                                    setStreetId(undefined);
                                    const city = dataCities?.find(
                                        item => item.id === city_id)
                                    setOptionsAreas(city?.areas?.map(e => { return { value: e.id, label: e.name } }) || [])
                                }}
                                onSelect={(value, option) => {
                                    getAreasData()
                                    setCityId(option.value);
                                    setSearchTextCity(option?.label as string);
                                    const city = dataCities?.find(
                                        item => item.id === city_id)
                                    setOptionsAreas(city?.areas?.map(e => { return { value: e.id, label: e.name } }) || [])

                                }}
                                filterOption={(inputValue, option) =>
                                    (option?.label as string)
                                        ?.toLowerCase()
                                        .includes(inputValue.toLowerCase())
                                }
                            />
                        </div>

                        {/* AREA */}
                        <div className="col-span-6 xl:col-span-3">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                المنطقة
                            </h3>
                            <AutoComplete
                                style={{ width: '100%' }}
                                options={optionsAreas}
                                placeholder="المنطقة"
                                value={searchTextArea}

                                onChange={(text) => {
                                    getStreetsData()
                                    setSearchTextArea(text);
                                    setSearchTextStreet("");
                                    setAreaId(undefined);
                                    setStreetId(undefined);
                                    const area = dataAreas?.find(
                                        item => item.id === area_id)
                                    setOptionsStreets(area?.streets?.map(e => { return { value: e.id, label: e.name } }) || [])

                                }}
                                onSelect={(value, option) => {
                                    getStreetsData()
                                    setAreaId(option.value);
                                    setSearchTextArea(option?.label as string);
                                    const area = dataAreas?.find(
                                        item => item.id === area_id)
                                    setOptionsStreets(area?.streets?.map(e => { return { value: e.id, label: e.name } }) || [])

                                }}
                                filterOption={(inputValue, option) =>
                                    (option?.label as string)
                                        ?.toLowerCase()
                                        .includes(inputValue.toLowerCase())
                                }
                            />
                        </div>

                        {/* STREET */}
                        <div className="col-span-6 xl:col-span-3">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                الشارع
                            </h3>
                            <AutoComplete
                                style={{ width: '100%' }}
                                options={optionsStreets}
                                placeholder="الشارع"
                                value={searchTextStreet}

                                onChange={(text) => {
                                    setSearchTextStreet(text);
                                    setStreetId(undefined);
                                }}
                                onSelect={(value, option) => {
                                    setStreetId(option.value);
                                    setSearchTextStreet(option?.label as string);
                                }}
                                filterOption={(inputValue, option) =>
                                    (option?.label as string)
                                        ?.toLowerCase()
                                        .includes(inputValue.toLowerCase())
                                }
                            />
                        </div>


                        {/* FULL PLACE */}
                        <div className="col-span-12">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                العنوان بالكامل
                            </h3>
                            <TextArea
                                rows={3}
                                value={full_place}
                                onChange={(e) => setFullPlace(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        {/* CLOSE PLACE */}
                        <div className="col-span-12">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                أقرب مكان
                            </h3>
                            <TextArea
                                value={close_place}
                                onChange={(e) => setClosePlace(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <Button
                                type="default"
                                onClick={() => handleEdit()}
                            >
                                تعديل
                            </Button>
                        </div>
                    </div>
                </div>
            case "3":
                return <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white p-5 shadow-md border border-gray-100">

                        {/* WAITING TIME */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                مدة الانتظار
                            </h3>
                            <AutoComplete
                                style={{ width: '100%' }}
                                options={optionsWaitingTime}
                                placeholder="مدة الانتظار"
                                value={searchTextWaitingTime}

                                onChange={(text) => {
                                    setSearchTextWaitingTime(text);
                                    setWaitingTime(undefined);
                                }}
                                onSelect={(value, option) => {
                                    setWaitingTime(option.value);
                                    setSearchTextWaitingTime(option?.label as string);
                                }}
                                filterOption={(inputValue, option) =>
                                    (option?.label as string)
                                        ?.toLowerCase()
                                        .includes(inputValue.toLowerCase())
                                }
                            />
                        </div>

                        {/* AVERAGE PATIENTS */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                عدد المرضى يومياً
                            </h3>
                            <Input
                                value={average_patients_per_day ?? ""}
                                onChange={(e) => setAveragePatientsPerDay(Number(e.target.value))}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>

                        <div className="grid grid-cols-12 gap-2 col-span-12 xl:col-span-12">
                            <div className="col-span-12">
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1 w-full">
                                    موعد الدوام  الأول
                                </h3>
                            </div>
                            <div className="col-span-6 xl:col-span-6">
                                <h3>من</h3>
                                <TimePicker value={dayjs(first_work_time_opening, 'HH:mm a')} className="w-full" use12Hours format="h:mm a" onChange={onChangeFirstTimeOpening} />
                            </div>

                            <div className="col-span-6 xl:col-span-6">
                                <h3>إلى</h3>
                                <TimePicker value={dayjs(first_work_time_closing, 'HH:mm a')} className="w-full" use12Hours format="h:mm a" onChange={onChangeFirstTimeClosing} />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 col-span-12 xl:col-span-12">
                            <div className="col-span-12">
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1 w-full">
                                    موعد الدوام  الثاني
                                </h3>
                            </div>
                            <div className="col-span-6 xl:col-span-6">
                                <h3>من</h3>
                                <TimePicker value={dayjs(second_work_time_opening, 'HH:mm a')} className="w-full" use12Hours format="h:mm a" onChange={onChangeSecondTimeOpening} />
                            </div>
                            <div className="col-span-6 xl:col-span-6">
                                <h3>إلى</h3>
                                <TimePicker value={dayjs(second_work_time_closing, 'HH:mm a')} className="w-full" use12Hours format="h:mm a" onChange={onChangeSecondTimeClosing} />
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-2 col-span-12 xl:col-span-12">
                            <div className="col-span-12">
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1 w-full">
                                    موعد الزيارة المفضل
                                </h3>
                            </div>
                            <div className="col-span-6 xl:col-span-6">
                                <h3>من</h3>
                                <TimePicker value={dayjs(favourite_time_opening, 'HH:mm a')} className="w-full" use12Hours format="h:mm a" onChange={onChangeFavouriteTimeOpening} />
                            </div>
                            <div className="col-span-6 xl:col-span-6">
                                <h3>إلى</h3>
                                <TimePicker value={dayjs(favourite_time_closing, 'HH:mm a')} className="w-full" use12Hours format="h:mm a" onChange={onChangeFavouriteTimeClosing} />
                            </div>
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <Button
                                type="default"
                                onClick={() => handleEdit()}
                            >
                                تعديل
                            </Button>
                        </div>
                    </div>
                </div>
            case "4":
                return <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white p-5 shadow-md border border-gray-100">

                        {/* PERSONALITY STRENGTHS */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                نقاط القوة في الشخصية
                            </h3>
                            <Select
                                mode="tags"
                                size={size}
                                placeholder="الرجاء الاختيار"
                                value={personality_strengthens?.split(',')}
                                onChange={handleChangePersonalityStrengthens}
                                style={{ width: '100%' }}
                                options={optionsPersonalityStrengthens}
                            />
                        </div>

                        {/* INTERESTS */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                الاهتمامات
                            </h3>
                            <Select
                                mode="tags"
                                size={size}
                                placeholder="الرجاء الاختيار"
                                value={interestes?.split(',')}
                                onChange={handleChangeInterests}
                                style={{ width: '100%' }}
                                options={optionsInterests}
                            />
                        </div>

                        {/* PERSONALITY TYPE */}
                        <div className="col-span-6 xl:col-span-4">
                            <div>
                                <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                    نوع الشخصية
                                </h3>
                            </div>
                            <AutoComplete
                                style={{ width: '100%' }}
                                options={optionsPersonality}
                                placeholder="نوع الشخصية"
                                value={searchTextPersonalityType}

                                onChange={(text) => {
                                    setSearchTextPersonalityType(text);
                                    setPersonalityType(undefined);
                                }}
                                onSelect={(value, option) => {
                                    setPersonalityType(option.value);
                                    setSearchTextPersonalityType(option?.label as string);
                                }}
                                filterOption={(inputValue, option) =>
                                    (option?.label as string)
                                        ?.toLowerCase()
                                        .includes(inputValue.toLowerCase())
                                }
                            />
                        </div>

                        {/* SOCIAL PATTERN */}
                        <div className="col-span-12 md:col-span-4">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                النمط الاجتماعي
                            </h3>
                            <AutoComplete
                                style={{ width: '100%' }}
                                options={optionsSocialPatterns}
                                placeholder="النمط الاجتماعي"
                                value={searchTextSocialPattern}

                                onChange={(text) => {
                                    setSearchTextSocialPattern(text);
                                    setSocialPattern(undefined);
                                }}
                                onSelect={(value, option) => {
                                    setSocialPattern(option.value);
                                    setSearchTextSocialPattern(option?.label as string);
                                }}

                            />
                        </div>

                        {/* SALESMAN RELATIONSHIP */}
                        <div className="col-span-12 md:col-span-4">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                علاقته بالمندوب
                            </h3>
                            <AutoComplete
                                style={{ width: '100%' }}
                                options={optionsSalesmanRelationships}
                                placeholder="علاقته بالمندوب"
                                value={searchTextSalesmanRelationship}

                                onChange={(text) => {
                                    setSearchTextSalesmanRelationship(text);
                                    setSalesmanRelationship(undefined);
                                }}
                                onSelect={(value, option) => {
                                    setSalesmanRelationship(value);
                                    setSearchTextSalesmanRelationship(option.label as string);
                                }}

                            />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                            <Button
                                type="default"
                                onClick={() => handleEdit()}
                            >
                                تعديل
                            </Button>
                        </div>

                    </div>
                </div>
            case "5":
                return <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 grid grid-cols-12 gap-4 rounded-xl bg-white p-5 shadow-md border border-gray-100">



                        {/* ADOPTED TYPES */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                الأنواع المعتمدة
                            </h3>
                            <Select
                                mode="tags"
                                size={size}
                                placeholder="الرجاء الاختيار"
                                value={adopted_types?.split(',')}
                                onChange={handleChangeAdoptedTypes}
                                style={{ width: '100%' }}
                                options={optionsAdoptedTypes}
                            />
                        </div>

                        {/* PREFERRED TREATMENT TYPES */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                الأنواع العلاجية المفضلة
                            </h3>
                            <Select
                                mode="tags"
                                size={size}
                                placeholder="الرجاء الاختيار"
                                value={preffered_treatment_types?.split(',')}
                                onChange={handleChangPrefferedTreatmentTypes}
                                style={{ width: '100%' }}
                                options={optionsPrefferedTreatmentTypes}
                            />
                        </div>

                        {/* PREFERRED DIETARY TYPES */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                أنواع المكملات المفضلة
                            </h3>
                            <Select
                                mode="tags"
                                size={size}
                                placeholder="الرجاء الاختيار"
                                value={preffered_dietary_types?.split(',')}
                                onChange={handleChangePrefferedDietaryTypes}
                                style={{ width: '100%' }}
                                options={optionsPrefferedDietaryTypes}
                            />
                        </div>

                        {/* PREFERRED COMPANIES */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                الشركات المفضلة
                            </h3>
                            <Select
                                mode="tags"
                                size={size}
                                placeholder="الرجاء الاختيار"
                                value={preffered_companies?.split(',')}
                                onChange={handleChangePrefferedCompanies}
                                style={{ width: '100%' }}
                                options={optionsPrefferedCompanies}
                            />
                        </div>

                        {/* COMPETITIVE TYPES */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                الأنواع المنافسة
                            </h3>
                            <Select
                                mode="tags"
                                size={size}
                                placeholder="الرجاء الاختيار"
                                value={competitive_types?.split(',')}
                                onChange={handleChangeCompetitiveTypes}
                                style={{ width: '100%' }}
                                options={optionsCompetitveTypes}
                            />
                        </div>

                        {/* STANCE ON DIETARY SUPPLEMENTS */}
                        <div className="col-span-12 md:col-span-6">
                            <h3 className="text-sm font-semibold text-[#01B9B0] mb-1">
                                موقفه من المكملات الغذائية
                            </h3>
                            <TextArea
                                rows={3}
                                value={stance_on_dietary_supp}
                                onChange={(e) => setStanceOnDietarySupp(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700"
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <Button
                                type="default"
                                onClick={() => handleEdit()}
                            >
                                تعديل
                            </Button>
                        </div>
                    </div>
                </div >
            default:
                return null;
        }
    };
    const tabsItems = [
        {
            label: <div>معلومات شخصية</div>, key: "1",
        },
        {
            label: <div>معلومات العيادة</div>, key: "2",
        },
        {
            label: <div>مواعيد الدوام</div>, key: "3",
        },
        {
            label: <div>العلاقة والتفاعل</div>, key: "4",
        },
        {
            label: <div>البصمة الدوائية</div>, key: "5",
        }
    ]

    return (
        <div className="col-span-12">
            <ConfigProvider direction="rtl" >
                <div className="col-span-12 sm:col-span-6">
                    <Button
                        type="default"
                        onClick={() => handleEdit()}
                    >
                        تعديل
                    </Button>
                </div>
                <Tabs
                    defaultActiveKey="1"
                    tabPlacement="top"
                    onChange={setActiveKey}
                    style={{ borderColor: "#592C46" }}
                    items={tabsItems}
                    tabBarStyle={{ height: 50, maxWidth: "100%", marginRight: 0 }}
                />
            </ConfigProvider>

            {pageLoading ? (
                <Skeleton className="h-full w-full" paragraph={{ rows: 10 }} />
            ) : (
                <div style={{ padding: 20, maxHeight: 200, maxWidth: "100%" }}>
                    {renderContent()}
                </div>
            )}
        </div>
    );


}