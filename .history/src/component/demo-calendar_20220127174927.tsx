import React, { useState } from 'react';
import { useRecords, useActiveViewId, useCloudStorage } from '@vikadata/widget-sdk';
import { Setting } from './setting';
import { Select } from '@vikadata/components';
import { ResponsiveCalendar } from '@nivo/calendar';
import dataJson from '../data.json'

export const DemoCalendar: React.FC = () => {

  interface Obj {
    value: number;
    day: string
  }


 
  const [data] = useCloudStorage<(string | undefined)[]>('setCalendarData')
  const [year] = useCloudStorage<(string | undefined)[]>('setYearData')

  let yearInfo = year.map((item) => {
    return {
      'label' : item,
      'value' : item,
    }

  })

  React.useEffect(() => {
    console.log("此时的data:",data) 
      
  },[data])



  const viewId = useActiveViewId();

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

  
  return  (
    <>
        <ResponsiveCalendar
          data={newArr}
          from="2022-01-01"
          to="2022-12-31"
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
        //   value={yearInfo[0].value}
        //   onSelected={(option) => {
        //     setFieldId(option.value)
        //   }}
        //   dropdownMatchSelectWidth={false}
        //   triggerStyle={{ width: 100 }}
        // /> 
    
    
    )
    
  };