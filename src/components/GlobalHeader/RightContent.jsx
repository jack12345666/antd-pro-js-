import React from 'react';
import { connect } from 'umi';
import Avatar from './AvatarDropdown';
import ChangeView from './ChangeView';
import styles from './index.less';
// import NoticeIconView from './NoticeIconView';

const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div
      className={className}
      style={{
        backgroundColor: '#001529',
        color: '#fff',
      }}
    >
      <ChangeView />
      {/* <NoticeIconView /> */}
      <Avatar />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
