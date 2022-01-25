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


  // const [data, setData] = useState<any>()
  const [data] = useCloudStorage<string>('setCalendarData')
  // const data = dataJson

  React.useEffect(() => {
    console.log("此时的data:",data) 
      
  },[data])
  // console.log(data)


  const viewId = useActiveViewId();
  // const records = useRecords('viwSpVsG8KGw5');

  // const datetimeArr = records.map(record => record?.getCellValueString('fldVAMZ1enl9v'))

  // console.log(datetimeArr)

  let arr = new Object()

  // let demo = [{
  //   "value": 5,
  //   "day": '2022-01-11'
  // },{
  //   "value": 10,
  //   "day": '2022-01-12'
  // }]
  // console.log(arr)
  for (let i = 1; i < data.length; i++) {
      if(arr[data[i]]){
        arr[datetimeArr[i]] ++ 
      }else{
        arr[datetimeArr[i]] = 1
      }
    }
  // for (let i = 1; i < datetimeArr.length; i++) {
  //     if(arr[datetimeArr[i]]){
  //       arr[datetimeArr[i]] ++ 
  //     }else{
  //       arr[datetimeArr[i]] = 1
  //     }
  //   }
  // arr.forEach((item) => {
  let newArr = []
  for(let i in arr) {
    newArr.push({
      "value": arr[i],
      "day": i
    })
  }
  // })
  console.log(newArr)

      // console.log(datetimeArr[i])
      // const duibi = datetimeArr[i]
      // arr.forEach((item) => {
      //   // console.log(duibi)
      //   if(item['day'] === datetimeArr[i]) {
      //     item['value'] += 1
          
      //   }else{
      //     arr = [...arr, {
      //       'value': 1,
      //       'day': datetimeArr[i],
      //     }]
      //   }
      // }) 
    // }   
  //     // const find = arr.find((obj) => {obj['day'] === datetimeArr[i] })

  //     // if(find) {
  //     //   obj['value'] += 1
  //     // }else{
  //     //   arr.push({
  //     //     'day': datetimeArr[i],
  //     //     'value': 1,
  //     //   })
  //     // }
  // }

  return  (
    <ResponsiveCalendar
        data={newArr}
        from="2022-01-01"
        to="2022-12-31"
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
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
    )
    
  };