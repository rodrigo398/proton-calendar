import React, { useMemo } from 'react';
import { classnames, Icon } from 'react-components';

import { useReadCalendarEvent, useReadEvent } from './useReadCalendarEvent';
import { getConstrastingColor } from '../../helpers/color';

const PartDayEvent = ({
    style,
    formatTime,
    event: { start, end, data: { Calendar } = {}, data: targetEventData, tmpData, isAllDay },
    isSelected,
    isBeforeNow,
    eventRef
}) => {
    const [value, loading, error] = useReadCalendarEvent(targetEventData);
    const model = useReadEvent(value);
    const calendarColor = Calendar.Color;
    const eventStyle = useMemo(() => {
        const background = calendarColor;
        return {
            ...style,
            background,
            color: getConstrastingColor(background)
        };
    }, [calendarColor, style, isAllDay, isSelected]);

    const titleString = (tmpData && tmpData.title) || (!loading && model.title) || '';

    const timeString = useMemo(() => {
        const timeStart = formatTime(start);
        const timeEnd = formatTime(end);
        return `${timeStart} - ${timeEnd}`;
    }, [start, end]);

    const isLessThanOneHour = end - start < 3600000;
    const shouldHideTime = isLessThanOneHour && titleString;

    const content = (() => {
        if (error) {
            return <Icon name="lock" className="fill-currentColor" />;
        }

        return (
            <>
                <div
                    className={classnames([
                        'ellipsis calendar-eventcell-title',
                        loading && 'calendar-skeleton-loading'
                    ])}
                >
                    {titleString}
                </div>
                <div className={classnames(['ellipsis calendar-eventcell-timestring', shouldHideTime && 'hidden'])}>
                    {timeString}
                </div>
            </>
        );
    })();

    const isBeforeNowClassModifier = isBeforeNow ? 'calendar-eventcell--isBefore' : '';

    return (
        <div
            style={eventStyle}
            className={classnames(['calendar-eventcell no-scroll pl0-5 pr0-5', isBeforeNowClassModifier])}
            ref={eventRef}
        >
            {content}
        </div>
    );
};

export default PartDayEvent;
