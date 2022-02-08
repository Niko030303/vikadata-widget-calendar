import React, { useState } from 'react';
import { useRecords, useActiveViewId, useCloudStorage } from '@vikadata/widget-sdk';
import { Setting } from './setting';
import { ResponsiveCalendar } from '@nivo/calendar';
import dataJson from '../data.json'

export const DemoCalendar: React.FC = () => {

  interface Obj {
    value: number;
    day: string
  }


 
  const [data] = useCloudStorage<(string | undefined)[]>('setCalendarData')
  const [year] = useCloudStorage<(string | undefined)[]>('setYearData')


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
    <div></div>
    
    )
    
  };