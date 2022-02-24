import React from 'react';
import { useCloudStorage } from '@vikadata/widget-sdk';
import { Select } from '@vikadata/components';
import { ResponsiveCalendar } from '@nivo/calendar';
import dataJson from '../data.json'

export const DemoCalendar: React.FC = () => {

  interface NewArrObj {
    value: number;
    day: string
  }

  const [data] = useCloudStorage<(string)[]>('setCalendarData')
  const [year, setYear] = useCloudStorage<(any)[]>('setYearList')
  const [currentYear, setCurrentYear ] = useCloudStorage<String>('setCurrentSelectYear', '')
  const [value, setValue] = useCloudStorage<string>('setSelectValue', 'opt1');


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
  if(data.length !== 0){
    for (let i = 1; i < data.length; i++) {
      if(arr[data[i]]){
        arr[data[i]] ++ 
      }else{
        arr[data[i]] = 1
      }
    }
    console.log('arr', arr)
  }
  

  let newArr: NewArrObj[]  = []

  for(let i in arr) {
    newArr.push({
      "value": arr[i],
      "day": i
    })
  }

  /* for(let item of data){
    if(newArr.indexOf(item.day)){
      new
    }

   } */

  console.log('newArr', newArr)

  React.useEffect(() => {
    console.log("demo中的currentYear:",currentYear)  
  },[currentYear])

 
      return  newArr ? (
        <>
        <ResponsiveCalendar
          data={newArr}
          from={`${currentYear}-01-01`}
          to={`${currentYear}-12-31`}
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
         </>
    ) : null

  
    
  };