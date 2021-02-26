// import { PageLoading } from '@ant-design/pro-layout'; // loading components from code split
// // https://umijs.org/plugin/umi-plugin-react.html#dynamicimport

// export default PageLoading;
import React from 'react'
import { Spin } from 'antd'

export default () => {
    return (
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Spin size="large"/>
      </div>
    )
}
