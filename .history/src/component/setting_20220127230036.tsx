import React, { useState, useEffect } from 'react';
import { ViewPicker, FieldPicker, useRecords, useFields, useSettingsButton, useCloudStorage } from '@vikadata/widget-sdk';
import { DateTime, Interval, Duration } from 'luxon'
import { Select } from '@vikadata/components';


export const Setting: React.FC = () => {


  interface YearInfoObj {
    label: string;
    value: string
  }

  const [isSettingOpened] = useSettingsButton();
  const [viewId, setViewId] = useCloudStorage<string>('')
  const [fieldId, setFieldId] = useCloudStorage<string>('setFieldIdData', '');
  const [data, setData] = useCloudStorage<(string | undefined)[]>('setCalendarData')
  const [year, setYear] = useCloudStorage<(any)[]>('setYearData')

  const [fromToYear, setFromToYear ] = useCloudStorage<String>('setFromToYearData')


  const fields = useFields(viewId);
  const records = useRecords(viewId)

  // 下拉框
  let fieldInfo = fields.map((field) => {
    return {
      'label' : field.name,
      'value' : field.id,
    }

  })

  // 视图/字段重新渲染时打印日志
  // useEffect(() => {
  //   console.log(`viewId: ${viewId} changed`)
  //   console.log(`fieldId: ${fieldId}`)
  // }, [viewId])

  // useEffect(() => {
  //   console.log('year:', year )
  // }, [year])


  useEffect(() => {
    // console.log(`viewId: ${viewId}`)
    // console.log(`fieldId: ${fieldId} changed`)

    // 这里记得加个日期格式的转换
   let newData: string[] = []
    records.forEach((record) => {
      const result = DateTime.fromMillis(Date.parse(record.getCellValue(fieldId)?.slice(0, 10)) as number).toUTC() // 转格式
      if (result.toFormat('yyyy-MM-dd') !== 'Invalid DateTime') {
        newData.push(result.toFormat('yyyy-MM-dd'))
      }
      
    })
    
    setData(newData)
    
  }, [fieldId])

  useEffect(() => {
    const yearNumber = data.map(item => {
      return item?.slice(0, 4)
    })
    const yearData = Array.from(new Set(yearNumber))
    let yearInfo: YearInfoObj[] = []
    yearData.forEach((item, index) => {
      yearInfo.push({
        'label' : item,
        'value' : 'opt' + index,
      }) 
  
    })
    setYear(yearInfo)
    setFromToYear(year[0].label)
    
  }, [data])

  useEffect(() => {
    console.log('year', year)
    console.log('fromToYear', fromToYear)
    }, [year])
  useEffect(() => {
    console.log('fromToYear', fromToYear)
    }, [fromToYearear])


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
