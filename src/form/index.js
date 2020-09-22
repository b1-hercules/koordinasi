import React, {useState, useEffect} from "react";
import {Card, Form, Input, Button, Select, notification} from "antd";
import Header from "../header";
import axios from "axios";
import history from "../history";

const {Option} = Select;

if (window.performance) {
    if ( performance.navigation.type === 1) {
            history.push('/')
    }
}

const FormComponent = props => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    const [dataDivision, setDataDivision] = useState([]);
    const [dataPosition, setDataPosition] = useState([]);
    const [countEmp, setCountEmp] = useState([]);
    // const [formType, setFormType] = useState('');
    // const [tempId, settempId] = useState('');
    // const [tempName, setTempName] = useState('');
    // const [tempNik, setTempNik] = useState('');
    // const [tempPos, setTempPos] = useState('');
    // const [tempDiv, setTempDiv] = useState('');

    const URL = `http://25.22.95.51:9010/main`; // API kang andi
    //const URL = `https://spring-boot-angular6.herokuapp.com/main`

    const getDataInit = () => {
        axios.get(`${URL}/positions`)
            .then(response => {
                setDataPosition(response.data)
            })

        axios.get(`${URL}/divisions`)
            .then(response => {
                setDataDivision(response.data)
            })

        axios.get(`${URL}/employees`)
            .then(response => {
                setCountEmp(response.data)
            })

    }

    const LOVdataPosition = dataPosition.map(values => {
        return {
            id: values.id,
            name: values.name,
        }
    })

    const LOVdataDivision = dataDivision.map(values => {
        return {
            id: values.id,
            name: values.name,
        }
    })

    const handleNik = () => {
        let watcherId = Math.max(...countEmp.map(s => s.id))
        form.setFieldsValue({
            nik: `EM000${watcherId + 1}`,
        });
    }

    const handleFormEdit = () => {
        form.setFieldsValue({
            nik: props.location.dataRecord.nik,
            name: props.location.dataRecord.name,
            division: props.location.dataRecord.division,
            position: props.location.dataRecord.position,
        });
    }

    // const initialProps = () => {
    //     setFormType(props.location.dataRecord.form)
    //     settempId()
    // }

    useEffect(() => {
        getDataInit();
        if (props.location.dataRecord.form === 'edit') {
            handleFormEdit();
        } else if (props.location.dataRecord.form === 'add'){
            handleNik();
        }
        forceUpdate({});
    }, [countEmp.length]);

    const onFinishAdd = (values) => {
        if (props.location.dataRecord.form !== 'edit') {
            const tempBody = {
                name: values.name,
                positionId: values.position,
                divisionId: values.division,
                lastPosition: null,
            }
            axios.post(`${URL}/employees`, tempBody)
                .then(res => {
                    if (res.status === 200) {
                        notification.success({
                            placement: 'TopRight',
                            message: 'Success',
                            description: "Save berhasil"
                        })
                        setTimeout(function () {
                            history.push('/')
                        }, 2000);
                    } else {
                        notification.error({
                            placement: 'TopRight',
                            message: 'Failed',
                            description: "Save gagal"
                        })
                    }
                })
        } else {
            const tempBody = {
                id: props.location.dataRecord.id,
                nik: values.nik,
                name: values.name,
                type: "PROMOTION",
                positionId: values.position,
                divisionId: values.division,
                lastPosition: props.location.dataRecord.position,
            }
            axios.put(`${URL}/employees/${props.location.dataRecord.id}`, tempBody)
                .then(res => {
                    if (res.status === 200) {
                        notification.success({
                            placement: 'TopRight',
                            message: 'Success',
                            description: "Edit berhasil"
                        })
                        setTimeout(function () {
                            history.push('/')
                        }, 2000);
                    } else {
                        notification.error({
                            placement: 'TopRight',
                            message: 'Failed',
                            description: "Edit gagal"
                        })
                    }
                })
        }
    };

    return (
        <div>
            <Header/>
            <Card style={{maxWidth: '80%', marginLeft: '10%', marginRight: '10%'}}>
                <h1>Employee Data</h1>
                <Form
                    form={form}
                    name="control-hooks"
                    onFinish={onFinishAdd}
                    layout="vertical"
                >
                    <Form.Item
                        name="nik"
                        label="NIK"
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="division"
                        label="Division"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option "
                            allowClear
                        >
                            {LOVdataDivision.map(res => {
                                return (
                                    <Option value={res.id}>{res.name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="position"
                        label="Position"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option "
                            allowClear
                        >
                            {LOVdataPosition.map(res => {
                                return (
                                    <Option value={res.id}>{res.name}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    !form.isFieldsTouched(['name', 'division', 'position'], true) ||
                                    form.getFieldsError().filter(({errors}) => errors.length).length
                                }
                            >
                                Save
                            </Button>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={() => history.push('/')}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default FormComponent;
