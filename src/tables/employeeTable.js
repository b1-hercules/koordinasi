import React, {Component} from "react";
import Moment from "moment";
import './index.css'
import {Button, notification, Space, Table,} from "antd";
import Text from "antd/es/typography/Text";
import axios from 'axios'

class EmployeeTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: this.props.datum,
            data: [],
            loading: false,
            sortedInfo: null,
            total: 25,
        };
    }

    componentDidMount() {
        this.setState({
            posts: this.props.datum.map(res => {
                return {
                    key: res.id,
                    id: res.id,
                    nik: res.nik,
                    name: res.name,
                    division: res.divisionId,
                    position: res.positionId,
                    type: res.type,
                    lastPosition: res.lastPosition,
                    createDate: Moment(res.createDate).format('MMM DD, YYYY'),
                }
            })
        })
    }

    handleChange = (pagination, sorter) => {
        this.setState({
            sortedInfo: sorter,
        });
    };

    deleteData = (id) => {
        axios.delete(`https://spring-boot-angular6.herokuapp.com/main/employees/${id}`)
            .then(res => {
                if (res.status === 200) {
                    notification.success({
                        placement: 'TopRight',
                        message: 'Success',
                        description: "hapus berhasil"
                    })
                    setTimeout(function() {
                        window.location.reload(false);
                    }, 2000);
                } else {
                    notification.error({
                        placement: 'TopRight',
                        message: 'Failed',
                        description: "hapus gagal"
                    })
                }

                const posts = this.state.posts.filter(item => item.id !== this.props.datum.id);
                this.setState({ posts });
            })
    }

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                sorter: (a, b) => a.id - b.id,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'NIK',
                dataIndex: 'nik',
                key: 'nik',
                sorter: (a, b) => a.nik.length - b.nik.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Division',
                dataIndex: 'division',
                key: 'division',
                render: division => {
                    if (division === 1) {
                        return (
                            <Text>IT</Text>
                        )
                    } else if (division === 2) {
                        return (
                            <Text>HRD</Text>
                        )
                    } else if (division === 3) {
                        return (
                            <Text>Loading</Text>
                        )
                    } else {
                        return (
                            <Text>Ticketing</Text>
                        )
                    }
                }
            },
            {
                title: 'Position',
                dataIndex: 'position',
                key: 'position',
                render: position => {
                    if (position === 1) {
                        return (
                            <Text>Staff</Text>
                        )
                    } else if (position === 2) {
                        return (
                            <Text>Supervisor</Text>
                        )
                    } else if (position === 3) {
                        return (
                            <Text>Asisten Manager</Text>
                        )
                    } else {
                        return (
                            <Text>Manager</Text>
                        )
                    }
                }
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: 'Last Position',
                dataIndex: 'lastPosition',
                key: 'lastPosition',
            },
            {
                title: 'Create Date',
                dataIndex: 'createDate',
                key: 'createDate',
            },
            {
                title: '',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                    <Space size="middle">
                        <Button type="primary" onClick={() => console.log(record)}>Edit</Button>
                        <Button type="primary" onClick={() => {
                            if (window.confirm('Are you sure to delete this record?')) {
                                this.deleteData(record.id)
                            }
                        }} danger>Delete</Button>
                    </Space>
                ),
            },

        ];

        const dataSource = this.props.datum.map(res => {
            return {
                key: res.id,
                id: res.id,
                nik: res.nik,
                name: res.name,
                division: res.divisionId,
                position: res.positionId,
                type: res.type,
                lastPosition: res.lastPosition,
                createDate: Moment(res.createDate).format('MMM DD, YYYY'),
            }
        })

        return (
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    onChange={this.handleChange}
                    pagination={{pageSize: 5, position: ['bottomLeft']}}
                />
        )
    }
}

export default EmployeeTable;
