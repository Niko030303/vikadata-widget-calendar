import React, { useState, useEffect } from 'react';
import { ViewPicker, FieldPicker, useFields, useSettingsButton, useCloudStorage } from '@vikadata/widget-sdk';
import { Select } from '@vikadata/components';


export const Setting: React.FC = () => {
  const [isSettingOpened] = useSettingsButton();
  const [viewId, setViewId] = useCloudStorage<string>('')
  const [fieldId, setFieldId] = useCloudStorage<string | undefined>(viewId) 
  const fields = useFields(viewId);
  const fieldInfo = fields.map(field => field.name)

  // 视图/字段重新渲染时打印日志
  useEffect(() => {
    console.log(`viewId: ${viewId} changed`)
    console.log(`fieldId: ${fieldId}`)
  }, [viewId])

  useEffect(() => {
    console.log(`viewId: ${viewId}`)
    console.log(`fieldId: ${fieldId} changed`)
  }, [fieldId])

  return isSettingOpened ? (
    <div style={{ flexShrink: 0, width: '300px', borderLeft: 'solid 1px gainsboro', paddingLeft: '16px' }}>
    <br />
    <p>选择视图</p>
    <ViewPicker viewId={viewId} onChange={option => setViewId(option.value)} />
    <br />
    <p>选择日期字段</p> 
    <FieldPicker viewId={viewId} fieldId={fieldId} onChange={option => setFieldId(option.value)} />
    <Select
      options={fi}
      value={value}
      onSelected={(option) => {
        setValue(option.value)
      }}
    />
    </div>

  ) : null;
};
