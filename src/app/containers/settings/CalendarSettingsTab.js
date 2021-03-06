import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row, Label, Field, Select, Toggle, ColorPicker, Input, TextArea } from 'react-components';
import { c } from 'ttag';
import { MAX_LENGTHS } from '../../constants';

const CalendarSettingsTab = ({ isSubmitted, errors, model, setModel }) => {
    const addressText = useMemo(() => {
        const option = model.addressOptions.find(({ value: ID }) => ID === model.addressID);
        return (option && option.text) || '';
    }, [model.addressID, model.addressOptions]);

    return (
        <>
            <Row>
                <Label htmlFor="calendar-name-input">{c('Label').t`Name`}</Label>
                <Field>
                    <Input
                        id="calendar-name-input"
                        value={model.name}
                        error={errors.name}
                        isSubmitted={isSubmitted}
                        placeholder={c('Placeholder').t`Add a calendar name`}
                        onChange={({ target }) => setModel({ ...model, name: target.value })}
                        autoFocus={true}
                    />
                </Field>
            </Row>
            <Row>
                <span className="pm-label">{c('Label').t`Choose a color`}</span>
                <Field>
                    <ColorPicker color={model.color} onChange={({ hex: color }) => setModel({ ...model, color })} />
                </Field>
            </Row>
            <Row>
                <Label htmlFor="calendar-address-select">
                    <span className="mr0-5">{c('Label').t`Default email`}</span>
                </Label>
                <Field>
                    {model.calendarID ? (
                        <>
                            <span className="pt0-5 flex">{addressText}</span>
                        </>
                    ) : (
                        <Select
                            id="calendar-address-select"
                            value={model.addressID}
                            onChange={({ target }) => setModel({ ...model, addressID: target.value })}
                            options={model.addressOptions}
                        />
                    )}
                </Field>
            </Row>
            <Row>
                <Label htmlFor="calendar-display-toggle">{c('Label').t`Display`}</Label>
                <Field>
                    <Toggle
                        id="calendar-display-toggle"
                        checked={!!model.display}
                        onChange={({ target }) => setModel({ ...model, display: target.checked })}
                    />
                </Field>
            </Row>
            <Row>
                <Label htmlFor="calendar-description-textarea">{c('Label').t`Description`}</Label>
                <Field>
                    <TextArea
                        autoGrow={true}
                        id="calendar-description-textarea"
                        value={model.description}
                        placeholder={c('Placeholder').t`Add a calendar description`}
                        onChange={({ target }) => setModel({ ...model, description: target.value })}
                        maxLength={MAX_LENGTHS.DESCRIPTION}
                        error={errors.description}
                        isSubmitted={isSubmitted}
                    />
                </Field>
            </Row>
        </>
    );
};

CalendarSettingsTab.propTypes = {
    addresses: PropTypes.array,
    addressesKeysMap: PropTypes.object,
    calendar: PropTypes.object,
    model: PropTypes.object,
    errors: PropTypes.object,
    isSubmitted: PropTypes.bool,
    setModel: PropTypes.func,
    onClose: PropTypes.func
};

export default CalendarSettingsTab;
