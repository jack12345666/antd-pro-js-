import React, { useState } from 'react'
import { history  } from 'umi'
import styles from './index.less'

export default () => {
    const [text, setText] = useState(window.location.pathname === "/dashboard" ? "管理控制台" : "监控中心")

    const changeText = () => {
        if(window.location.pathname === "/dashboard") {
            history.push("/welcome")
            setText("管理控制台")
        }else {
            history.push("/dashboard")
            setText("监控中心")
        }
    }

    return (
        <div className={styles.changeText}>
            <div className={styles.text} onClick={changeText}>{text}</div>
            <div className={styles.fg}>|</div>
        </div>
    )
}