import React, { Component } from 'react';

import Table from './Table';

class TableExhibition extends Component {
    constructor () {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (data) {
        console.log(data);
    };

    render () {
        const tableColumns = [{
                title: '空间大小',
                dataIndex: 'storageSize',
                key: 'storageSize',
            }, {
                title: '开始时间',
                dataIndex: 'modifyTime',
                key: 'modifyTime',
            }, {
                title: '结束时间',
                dataIndex: 'endTime',
                key: 'endTime',
            }, {
                title: '备注',
                dataIndex: 'desc',
                key: 'desc',
            }
        ];
        const dataSource = [{storageSize: '959', modifyTime: '2008-05-06', endTime: '2018-05-06', desc: 'yahdhf'},
            {storageSize: '666', modifyTime: '2008-05-06', endTime: '2018-05-06', desc: 'yahdhf'},
            {storageSize: '333', modifyTime: '2008-05-06', endTime: '2018-05-06', desc: 'yahdhf'}];

        const dataSource1 = [{storageSize: '959', modifyTime: '2008-05-06', endTime: '2018-05-06', desc: {
            type: 'show', lists: [{name: '232', onClick: this.handleClick}, {name: '===', onClick: this.handleClick}]
            }},
            {storageSize: '666', modifyTime: '2008-05-06', endTime: '2018-05-06', desc: {
                type: 'dropDown', label: 'more', lists: [{name: 'test1 for self', onClick: this.handleClick}, {name: 'adf', onClick: this.handleClick}]
            }},
            {storageSize: '777', modifyTime: '2008-05-06', endTime: '2018-05-06', desc: {
                type: 'dropDown', label: 'more', lists: [{name: 'test2 for self', onClick: this.handleClick}, {name: 'adf', onClick: this.handleClick}]
            }},
            {storageSize: '888', modifyTime: '2008-05-06', endTime: '2018-05-06', desc: {
                type: 'dropDown', label: 'more', lists: [{name: 'test3 for self', onClick: this.handleClick}, {name: 'adf', onClick: this.handleClick}]
            }},
            {storageSize: '33333333333333333333331324567890-1234567890', modifyTime: '2008-05-06', endTime: '2018-05-06', desc: '666' }];
        return <div>
            <p>default: </p>
            <Table
                headerData={tableColumns}
                dataSource={dataSource}
            />
            <p>增加可点击项：</p>
            <Table
                headerData={tableColumns}
                dataSource={dataSource1}
            />
        </div>
    }
}

export default TableExhibition;