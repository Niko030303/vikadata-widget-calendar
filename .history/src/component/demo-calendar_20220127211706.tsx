import React, { useState } from 'react';
import { useRecords, useActiveViewId, useCloudStorage } from '@vikadata/widget-sdk';
import { Setting } from './setting';
import { Select } from '@vikadata/components';
import { ResponsiveCalendar } from '@nivo/calendar';
import dataJson from '../data.json'

export const DemoCalendar: React.FC = () => {

  interface yearInfoObj {
    label: number;
    value: string
  }
  interface Obj {
    value: number;
    day: string
  }



  const [data] = useCloudStorage<(string | undefined)[]>('setCalendarData')
  const [year] = useCloudStorage<Set<string>>('setYearData')
  const [ fromToYear, setFromToYear, editable ] = useCloudStorage<String>('setFromToYear', '')
  const [value, setValue] = useCloudStorage<string>('setSelectValue', 'opt1');

  let yearInfo: string[] = []
  year.forEach((item, index) => {
    yearInfo.push({
      'label' : item,
      'value' : 'opt' + index,
    }) 

  })

  React.useEffect(() => {
    console.log("此时的data:",data) 
      
  },[data])

  React.useEffect(() => {
    console.log("此时的year:",fromToYear) 
      
  },[fromToYear])
  React.useEffect(() => {
    console.log("此时的value:",value) 
      
  },[value])





//  let demo = [{
//     "value": 5,
//     "day": '2022-01-11'
//   },{
//     "value": 10,
//     "day": '2022-01-12'
//   }]
  let arr = {}

  
  for (let i = 1; i < data.length; i++) {
      if(arr[data[i]]){
        arr[data[i]] ++ 
      }else{
        arr[data[i]] = 1
      }
    }
  console.log('arr', arr)

  let newArr = []
  for(let i in arr) {
    newArr.push({
      "value": arr[i],
      "day": i
    })
  }

  console.log('newArr', newArr)

  
  return  data ? (
        <>
        <ResponsiveCalendar
          data={newArr}
          from={`${fromToYear}-01-01`}
          to={`${fromToYear}-12-31`}
          emptyColor="#eeeeee"
          colors={['#DCD6FF', '#A697FB', '#7B67EE' , '#5342B4']}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'row',
                  translateY: 36,
                  itemCount: 4,
                  itemWidth: 42,
                  itemHeight: 36,
                  itemsSpacing: 14,
                  itemDirection: 'right-to-left'
              }
          ]}
        />
        <Select
            options={yearInfo}
           value={value}
           onSelected={(option) => {
             setValue(option.value)
             setFromToYear(option.label)
           }}
           dropdownMatchSelectWidth={false}
           triggerStyle={{ width: 100 }}
         /> </>
    ) : null
    
  };