import React, { useState, useEffect } from 'react';
import { ViewPicker, FieldPicker, useRecords, useFields, useSettingsButton, useCloudStorage } from '@vikadata/widget-sdk';
import { DateTime, Interval, Duration } from 'luxon'
import { Select } from '@vikadata/components';


export const Setting: React.FC = () => {
  const [isSettingOpened] = useSettingsButton();
  const [viewId, setViewId] = useCloudStorage<string>('')
  const [fieldId, setFieldId] = useState('');
  const [data, setData] = useCloudStorage<(string | undefined)[]>('setCalendarData')

  const fields = useFields(viewId);
  const records = useRecords(viewId)

  let fieldInfo = fields.map((field) => {
    return {
      'label' : field.name,
      'value' : field.id,
    }

  })

  // 视图/字段重新渲染时打印日志
  useEffect(() => {
    console.log(`viewId: ${viewId} changed`)
    console.log(`fieldId: ${fieldId}`)
  }, [viewId])


  useEffect(() => {
    console.log(`viewId: ${viewId}`)
    console.log(`fieldId: ${fieldId} changed`)

    // 这里记得加个日期格式的转换
  
    const newData = records.map((record) => {
      // return record.getCellValueString(fieldId)?.slice(0, 10)
      return Date.parse(new Date(record.getCellValueString(fieldId))
      // return DateTime.fromISO(record?.getCellValueString(fieldId) as string).toFormat('yyyy-MM-dd')
    })
    
    setData(newData)
  }, [fieldId])

  useEffect(() => {
    console.log('data:', data)  
  }, [data])



  return isSettingOpened ? (
    <div style={{ flexShrink: 0, width: '300px', borderLeft: 'solid 1px gainsboro', paddingLeft: '16px' }}>
    <br />
    <p>选择视图</p>
    <ViewPicker viewId={viewId} onChange={option => setViewId(option.value)} />
    <br />
    <p>选择日期字段</p> 
    {/* <FieldPicker viewId={viewId} fieldId={fieldId} onChange={option => setFieldId(option.value)} /> */}
    <Select
      options={fieldInfo}
      value={fieldId}
      onSelected={(option) => {
        setFieldId(option.value)
      }}
    />
    </div>

  ) : null;
};
