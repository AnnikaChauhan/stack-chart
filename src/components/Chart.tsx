import { Paper, Grid } from "@material-ui/core";
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { data } from "./data";
import { Plugin } from "@devexpress/dx-react-core";

import {
  Stack,
  EventTracker,
  // HoverState
} from "@devexpress/dx-react-chart";
import { useState } from "react";

const ChartComponent = () => {
  const [targetItem, setTargetItem] = useState(undefined);
  const transformData = data.time_series.map((item: any) => {
    const subEvents = item.most_accepted_sub_events.map(
      (subItem: any, index: number) => {
        return {
          [`most_accepted_sub_event_id_${index}`]: subItem.name,
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
    return <div {...props}>{`${event}: ${number}`}</div>;
  };

  const TooltipComponentV2 = (props: any) => {
    const bar = props.targetItem?.point;
    const events = transformData[bar]?.most_accepted_sub_events;
    return (
      <Grid {...props}>
        <Grid container>
          {events?.map((event: any) => {
            return (
              <>
                <Grid item lg={2} md={2} sm={2} xs={2}>
                  color
                </Grid>
                <Grid item lg={8} md={8} sm={8} xs={8}>
                  {event.name}
                </Grid>
                <Grid
                  item
                  lg={2}
                  md={2}
                  sm={2}
                  xs={2}
                  style={{ textAlign: "right" }}
                >
                  {event.n_accepted}
                </Grid>
              </>
            );
          })}
        </Grid>
      </Grid>
    );
  };

  const TooltipOverlay = (props: any) => {
    return (
      <Tooltip.Overlay {...props} style={{ width: "300px" }}>
        {props.children}
      </Tooltip.Overlay>
    );
  };

  const handleChangeTargetItem = (target: any) => {
    if (target) {
      return setTargetItem({ ...target, series: "Sub Event 4" });
    }
    return setTargetItem(undefined);
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
        <Tooltip
          targetItem={targetItem}
          onTargetItemChange={handleChangeTargetItem}
          contentComponent={TooltipComponentV2}
          overlayComponent={TooltipOverlay}
        />
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
        {/* <HoverState /> */}
      </Chart>
    </Paper>
  );
};

export default ChartComponent;
