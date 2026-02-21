"use client";

import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Table } from "antd"
import { useSalesmanDataStore } from "../../../../stores/salesmanStore/data.store"
import { useEffect, useState } from "react";


export default function FieldSalesmanPage() {
  //store
  const { getSalesmanData, dataSalesmans } = useSalesmanDataStore()

  //columns for field salesmans
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a: any, b: any) => a.id.localeCompare(b.id),
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      sorter: (a: any, b: any) => a.first_name.localeCompare(b.first_name),
    },
    {
      title: "Last Name ",
      dataIndex: "last_name",
      sorter: (a: any, b: any) => a.last_name.localeCompare(b.last_name),
    }
  ]

  const [open, setOpen] = useState(false);


  useEffect(() => { getSalesmanData(); }, []);
  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  //add Salesamn Function
  const addSalesman =()=>{
       
  }

  return <div>
    <Button type="primary" onClick={showDrawer} >
      مندوب جديد
    </Button>
    <div className="static top-300 ">
      <Drawer
        maskClosable={true}  // default is true, optional
        keyboard={true}
        title="Create a new account"
        onClose={onClose}
        width={700}
        open={open}
        closable
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form layout="vertical" requiredMark={false}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[{ required: true, message: 'Please enter url' }]}
              >
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[{ required: true, message: 'Please select an owner' }]}
              >
                <Select
                  placeholder="Please select an owner"
                  options={[
                    { label: 'Xiaoxiao Fu', value: 'xiao' },
                    { label: 'Maomao Zhou', value: 'mao' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please choose the type' }]}
              >
                <Select
                  placeholder="Please choose the type"
                  options={[
                    { label: 'private', value: 'private' },
                    { label: 'public', value: 'public' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[{ required: true, message: 'Please choose the approver' }]}
              >
                <Select
                  placeholder="Please choose the approver"
                  options={[
                    { label: 'Jack Ma', value: 'jack' },
                    { label: 'Tom Liu', value: 'tom' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[{ required: true, message: 'Please choose the dateTime' }]}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  getPopupContainer={trigger => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Button type="primary" onClick={addSalesman}>إضافة</Button>
      </Drawer>
    </div>

    <Table columns={columns} dataSource={dataSalesmans} />

  </div>
}