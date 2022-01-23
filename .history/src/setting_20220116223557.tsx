import React, { useState, useEffect } from 'react';
import { ViewPicker, FieldPicker, useSettingsButton, useCloudStorage } from '@vikadata/widget-sdk';


export const Setting: React.FC = () => {
  const [isSettingOpened] = useSettingsButton();
  const [viewId, setViewId] = useCloudStorage<string>('')
  const [fieldId, setFieldId] = useCloudStorage<string | undefined>('') 

  useEffect(() => {
    console.log(`viewId${viewId}`)
  }, [viewId])

  return isSettingOpened ? (
    <div style={{ flexShrink: 0, width: '300px', borderLeft: 'solid 1px gainsboro', paddingLeft: '16px' }}>

      this is settings <br />
      点击右上角的齿轮按钮，或者左侧 setting 属性的 toggle 按钮可以看到我的变化
    <ViewPicker viewId={viewId} onChange={option => setViewId(option.value)} />
    <FieldPicker viewId={viewId} fieldId={fieldId} onChange={option => setFieldId(option.value)} />
    </div>

  ) : null;
};
