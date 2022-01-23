import React, { useState } from 'react';
import { ViewPicker, FieldPicker, useSettingsButton, useCloudStorage } from '@vikadata/widget-sdk';


export const Setting: React.FC = () => {
  const [isSettingOpened] = useSettingsButton();
  const [viewId, setViewId] = useCloudStorage('')
  const [fieldId, set] 



  return isSettingOpened ? (
    <div style={{ flexShrink: 0, width: '300px', borderLeft: 'solid 1px gainsboro', paddingLeft: '16px' }}>

      this is settings <br />
      点击右上角的齿轮按钮，或者左侧 setting 属性的 toggle 按钮可以看到我的变化
    <ViewPicker viewId={viewId} onChange={option => setViewId(option.value)} />
    </div>

  ) : null;
};
