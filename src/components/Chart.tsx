import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  // Legend,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { data } from "./data";
import { Plugin } from "@devexpress/dx-react-core";

import { Stack, EventTracker } from "@devexpress/dx-react-chart";

const ChartComponent = () => {
  const transformData = data.time_series.map((item: any) => {
    const subEvents = item.most_accepted_sub_events.map(
      (subItem: any, index: number) => {
        return {
          [`most_accepted_sub_event_id_${index}`]: subItem.sub_event_id,
          [`most_accepted_sub_event_n_${index}`]: subItem.n_accepted,
        };
      }
    );
    return {
      ...item,
      ...subEvents[0],
      ...subEvents[1],
      ...subEvents[2],
      ...subEvents[3],
      ...subEvents[4],
      ...subEvents[5],
    };
  });

  const TooltipComponent = (props: any) => {
    const series = props.targetItem.series.split(" ")[2];
    const bar = props.targetItem.point;
    const event = transformData[bar][`most_accepted_sub_event_id_${series}`];
    const number = transformData[bar][`most_accepted_sub_event_n_${series}`];
    // return <div {...props}>{`${event} - ${props.text}`}</div>;
    return <div {...props}>{`${event} - ${number}`}</div>;
  };

  return (
    <Paper elevation={0}>
      <Chart data={transformData}>
        <ArgumentAxis />
        <ValueAxis />
        <Plugin>
          {[0, 1, 2, 3, 4].map((a) => {
            return (
              <BarSeries
                key={a}
                name={`Sub Event ${a}`}
                valueField={`most_accepted_sub_event_n_${a}`}
                argumentField="date"
              />
            );
          })}
        </Plugin>
        <EventTracker />
        <Tooltip contentComponent={TooltipComponent} />
        <Stack
          stacks={[
            {
              series: [
                "Sub Event 0",
                "Sub Event 1",
                "Sub Event 2",
                "Sub Event 3",
                "Sub Event 4",
              ],
            },
          ]}
        />
        {/* <Legend /> */}
      </Chart>
    </Paper>
  );
};

export default ChartComponent;
