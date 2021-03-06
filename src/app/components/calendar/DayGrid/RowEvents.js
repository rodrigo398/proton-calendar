import React from 'react';
import { endOfDay, isSameDay } from 'proton-shared/lib/date-fns-utc';
import { getEvent } from '../DayGrid';
import { TYPE } from '../interactions/constants';

const RowEvents = ({
    FullDayEvent,
    MoreFullDayEvent,

    eventsInRowStyles,
    eventsInRowSummary,
    eventsInRow,
    events,

    formatTime,
    days,
    now,
    row,

    targetMoreData,
    targetMoreRef,

    targetEventRef,
    targetEventData
}) => {
    return eventsInRowStyles.map(({ idx, type, style }) => {
        if (type === 'more') {
            const isSelected = targetMoreData && idx === targetMoreData.idx && row === targetMoreData.row;
            const eventRef = isSelected ? targetMoreRef : undefined;
            return (
                <MoreFullDayEvent
                    key={`more${idx}`}
                    style={style}
                    more={eventsInRowSummary[idx].more}
                    eventRef={eventRef}
                    isSelected={isSelected}
                />
            );
        }

        const event = getEvent(idx, eventsInRow, events);

        const isTemporary = event.id === 'tmp';
        const isSelected = targetEventData && event.id === targetEventData.id;
        const isThisSelected =
            (isSelected && isTemporary) ||
            (isSelected && targetEventData.idx === row && targetEventData.type === TYPE.DAYGRID);

        const eventRef = isThisSelected ? targetEventRef : undefined;

        const isBeforeNow = now > event.end && !isSameDay(now, event.end);

        return (
            <FullDayEvent
                event={event}
                style={style}
                key={event.id}
                eventRef={eventRef}
                formatTime={formatTime}
                isSelected={isSelected}
                isBeforeNow={isBeforeNow}
                isOutsideEnd={event.isAllDay && event.end > endOfDay(days[days.length - 1])}
                isOutsideStart={event.isAllDay && event.start < days[0]}
            />
        );
    });
};

export default RowEvents;
