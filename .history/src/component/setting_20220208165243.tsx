import React, { useEffect } from 'react';
import { ViewPicker, useRecords, useFields, useSettingsButton, useCloudStorage } from '@vikadata/widget-sdk';
import { DateTime } from 'luxon'
import { Select } from '@vikadata/components';


export const Setting: React.FC = () => {


  interface YearInfoObj {
    label: string | undefined;
    value: string
  }

  const [isSettingOpened] = useSettingsButton();
  const [viewId, setViewId] = useCloudStorage<string>('') // 视图列表
  const [fieldId, setFieldId] = useCloudStorage<string>('setFieldIdData', '');  // 字段列表
  const [data, setData] = useCloudStorage<(string | undefined)[]>('setCalendarData') // 打卡数据
  const [year, setYear] = useCloudStorage<any>('setYearList') // 年份列表
  const [value, setValue] = useCloudStorage<string>('setSelectValue', 'opt1');


  const [currentYear, setCurrentYear ] = useCloudStorage<String>('setCurrentSelectYear') // 定位哪一年


  const fields = useFields(viewId);
  const records = useRecords(viewId)

  // 字段下拉框，筛选出日期类型的列

  let fieldInfo = fields.filter((field) => {
    return field.type === 'DateTime' || field.type === 'CreatedTime' || field.type === 'LastModifiedTime' 
  }).map((field) => {
    return {
        'label' : field.name,
        'value' : field.id,
      }
  })



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

  // 年份列表
  useEffect(() => {
    const yearNumber = data.map(item => {
      return item?.slice(0, 4)|| undefined
    }).sort((a: string | undefined, b: string | undefined) => {a-b}: number)
    const yearData = Array.from(new Set(yearNumber))
    let yearInfo: YearInfoObj[] = []
    yearData.forEach((item: string | undefined, index) => {
      yearInfo.push({
        'label' : item,
        'value' : 'opt' + index,
      }) 
  
    })
    setYear(yearInfo)
   
    
  }, [data])

  // 当年份列表渲染时，更新默认值
  useEffect(() => {
    console.log('year', year)
    setCurrentYear(year[0]['label'])
    }, [year])

  useEffect(() => {
    console.log('currentYear', currentYear)
    }, [currentYear])


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
    <br />
    <p>选择年份</p> 
    <Select
            options={year}
            value={value}
            onSelected={(option) => {
             setValue(option.value)
             setCurrentYear(option.label)
           }}
           dropdownMatchSelectWidth={false}
           triggerStyle={{ width: 100 }}
         />
    </div>

  ) : null;
};
