import React from 'react';
import { TextArea } from 'react-components';
import { c } from 'ttag';

import { MAX_LENGTHS } from '../../../constants';

const DescriptionInput = ({ onChange, ...rest }) => {
    return (
        <TextArea
            autoGrow={true}
            placeholder={c('Placeholder').t`Add a description`}
            onChange={({ target }) => onChange(target.value)}
            maxLength={MAX_LENGTHS.DESCRIPTION}
            {...rest}
        />
    )
};

export default DescriptionInput;
